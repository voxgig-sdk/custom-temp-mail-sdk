# PublicV1Inbox entity test

require "minitest/autorun"
require "json"
require_relative "../CustomTempMail_sdk"
require_relative "runner"

class PublicV1InboxEntityTest < Minitest::Test
  def test_create_instance
    testsdk = CustomTempMailSDK.test(nil, nil)
    ent = testsdk.PublicV1Inbox(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = public_v1_inbox_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "public_v1_inbox." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_INBOX_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    public_v1_inbox_ref01_ent = client.PublicV1Inbox(nil)
    public_v1_inbox_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.public_v1_inbox"), "public_v1_inbox_ref01"))

    public_v1_inbox_ref01_data_result = public_v1_inbox_ref01_ent.create(public_v1_inbox_ref01_data, nil)
    public_v1_inbox_ref01_data = Helpers.to_map(public_v1_inbox_ref01_data_result.respond_to?(:data_get) ? public_v1_inbox_ref01_data_result.data_get : public_v1_inbox_ref01_data_result)
    assert !public_v1_inbox_ref01_data.nil?
    assert !public_v1_inbox_ref01_data["id"].nil?

    # REMOVE
    public_v1_inbox_ref01_match_rm0 = {
      "id" => public_v1_inbox_ref01_data["id"],
    }
    public_v1_inbox_ref01_ent.remove(public_v1_inbox_ref01_match_rm0, nil)

  end
end

def public_v1_inbox_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "public_v1_inbox", "PublicV1InboxTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CustomTempMailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["public_v1_inbox01", "public_v1_inbox02", "public_v1_inbox03", "inbox01", "inbox02", "inbox03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_INBOX_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_INBOX_ENTID" => idmap,
    "CUSTOM_TEMP_MAIL_TEST_LIVE" => "FALSE",
    "CUSTOM_TEMP_MAIL_TEST_EXPLAIN" => "FALSE",
    "CUSTOM_TEMP_MAIL_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_INBOX_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CUSTOM_TEMP_MAIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["CUSTOM_TEMP_MAIL_APIKEY"],
      },
      extra || {},
    ])
    client = CustomTempMailSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["CUSTOM_TEMP_MAIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["CUSTOM_TEMP_MAIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
