# CustomDomainVerify entity test

require "minitest/autorun"
require "json"
require_relative "../CustomTempMail_sdk"
require_relative "runner"

class CustomDomainVerifyEntityTest < Minitest::Test
  def test_create_instance
    testsdk = CustomTempMailSDK.test(nil, nil)
    ent = testsdk.CustomDomainVerify(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = custom_domain_verify_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "custom_domain_verify." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CUSTOMTEMPMAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    custom_domain_verify_ref01_ent = client.CustomDomainVerify(nil)
    custom_domain_verify_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.custom_domain_verify"), "custom_domain_verify_ref01"))
    custom_domain_verify_ref01_data["domain"] = setup[:idmap]["domain01"]

    custom_domain_verify_ref01_data_result = custom_domain_verify_ref01_ent.create(custom_domain_verify_ref01_data, nil)
    custom_domain_verify_ref01_data = Helpers.to_map(custom_domain_verify_ref01_data_result)
    assert !custom_domain_verify_ref01_data.nil?

  end
end

def custom_domain_verify_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "custom_domain_verify", "CustomDomainVerifyTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = CustomTempMailSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["custom_domain_verify01", "custom_domain_verify02", "custom_domain_verify03", "custom_domain01", "custom_domain02", "custom_domain03", "domain01"],
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
  entid_env_raw = ENV["CUSTOMTEMPMAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CUSTOMTEMPMAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID" => idmap,
    "CUSTOMTEMPMAIL_TEST_LIVE" => "FALSE",
    "CUSTOMTEMPMAIL_TEST_EXPLAIN" => "FALSE",
    "CUSTOMTEMPMAIL_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["CUSTOMTEMPMAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CUSTOMTEMPMAIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["CUSTOMTEMPMAIL_APIKEY"],
      },
      extra || {},
    ])
    client = CustomTempMailSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["CUSTOMTEMPMAIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["CUSTOMTEMPMAIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
