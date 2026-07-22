# CustomTempMail SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'CustomTempMail_types'


class CustomTempMailSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = CustomTempMailUtility.new
    @_utility = utility

    config = CustomTempMailConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features in the resolved order (make_options puts an explicit array
    # order first, else defaults to test-first). Ordering matters: the `test`
    # feature installs the base mock transport and the transport features
    # (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
    # must be added before them to sit at the base of the chain.
    feature_opts = CustomTempMailHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      featureorder = VoxgigStruct.getpath(@options, "__derived__.featureorder")
      if featureorder.is_a?(Array)
        featureorder.each do |fname|
          fopts = CustomTempMailHelpers.to_map(feature_opts[fname])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, CustomTempMailFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    CustomTempMailUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = CustomTempMailHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = CustomTempMailHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = CustomTempMailHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = CustomTempMailSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue CustomTempMailError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = CustomTempMailHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = CustomTempMailHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Canonical facade: client.CustomDomain.list / client.CustomDomain.load({ "id" => ... })
  def CustomDomain(data = nil)
    require_relative 'entity/custom_domain_entity'
    CustomDomainEntity.new(self, data)
  end


  # Canonical facade: client.CustomDomainVerify.list / client.CustomDomainVerify.load({ "id" => ... })
  def CustomDomainVerify(data = nil)
    require_relative 'entity/custom_domain_verify_entity'
    CustomDomainVerifyEntity.new(self, data)
  end


  # Canonical facade: client.Domain.list / client.Domain.load({ "id" => ... })
  def Domain(data = nil)
    require_relative 'entity/domain_entity'
    DomainEntity.new(self, data)
  end


  # Canonical facade: client.DomainsAll.list / client.DomainsAll.load({ "id" => ... })
  def DomainsAll(data = nil)
    require_relative 'entity/domains_all_entity'
    DomainsAllEntity.new(self, data)
  end


  # Canonical facade: client.Inbox.list / client.Inbox.load({ "id" => ... })
  def Inbox(data = nil)
    require_relative 'entity/inbox_entity'
    InboxEntity.new(self, data)
  end


  # Canonical facade: client.Men.list / client.Men.load({ "id" => ... })
  def Men(data = nil)
    require_relative 'entity/men_entity'
    MenEntity.new(self, data)
  end


  # Canonical facade: client.Message.list / client.Message.load({ "id" => ... })
  def Message(data = nil)
    require_relative 'entity/message_entity'
    MessageEntity.new(self, data)
  end


  # Canonical facade: client.Otp.list / client.Otp.load({ "id" => ... })
  def Otp(data = nil)
    require_relative 'entity/otp_entity'
    OtpEntity.new(self, data)
  end


  # Canonical facade: client.Plan.list / client.Plan.load({ "id" => ... })
  def Plan(data = nil)
    require_relative 'entity/plan_entity'
    PlanEntity.new(self, data)
  end


  # Canonical facade: client.PublicV1DashboardAnalytics.list / client.PublicV1DashboardAnalytics.load({ "id" => ... })
  def PublicV1DashboardAnalytics(data = nil)
    require_relative 'entity/public_v1_dashboard_analytics_entity'
    PublicV1DashboardAnalyticsEntity.new(self, data)
  end


  # Canonical facade: client.PublicV1Inbox.list / client.PublicV1Inbox.load({ "id" => ... })
  def PublicV1Inbox(data = nil)
    require_relative 'entity/public_v1_inbox_entity'
    PublicV1InboxEntity.new(self, data)
  end


  # Canonical facade: client.PublicV1Message.list / client.PublicV1Message.load({ "id" => ... })
  def PublicV1Message(data = nil)
    require_relative 'entity/public_v1_message_entity'
    PublicV1MessageEntity.new(self, data)
  end


  # Canonical facade: client.PublicV1Webhook.list / client.PublicV1Webhook.load({ "id" => ... })
  def PublicV1Webhook(data = nil)
    require_relative 'entity/public_v1_webhook_entity'
    PublicV1WebhookEntity.new(self, data)
  end


  # Canonical facade: client.Usage.list / client.Usage.load({ "id" => ... })
  def Usage(data = nil)
    require_relative 'entity/usage_entity'
    UsageEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = CustomTempMailSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
