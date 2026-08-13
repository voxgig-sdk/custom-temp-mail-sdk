-- CustomDomainVerify entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("custom-temp-mail_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("CustomDomainVerifyEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CustomDomainVerify(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = custom_domain_verify_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "custom_domain_verify." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local custom_domain_verify_ref01_ent = client:CustomDomainVerify(nil)
    local custom_domain_verify_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.custom_domain_verify"), "custom_domain_verify_ref01"))
    custom_domain_verify_ref01_data["domain"] = setup.idmap["domain01"]

    local custom_domain_verify_ref01_data_result, err = custom_domain_verify_ref01_ent:create(custom_domain_verify_ref01_data, nil)
    assert.is_nil(err)
    custom_domain_verify_ref01_data = helpers.to_map(type(custom_domain_verify_ref01_data_result) == 'table' and custom_domain_verify_ref01_data_result.data_get and custom_domain_verify_ref01_data_result:data_get() or custom_domain_verify_ref01_data_result)
    assert.is_not_nil(custom_domain_verify_ref01_data)

  end)
end)

function custom_domain_verify_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/custom_domain_verify/CustomDomainVerifyTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read custom_domain_verify test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "custom_domain_verify01", "custom_domain_verify02", "custom_domain_verify03", "custom_domain01", "custom_domain02", "custom_domain03", "domain01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID"] = idmap,
    ["CUSTOM_TEMP_MAIL_TEST_LIVE"] = "FALSE",
    ["CUSTOM_TEMP_MAIL_TEST_EXPLAIN"] = "FALSE",
    ["CUSTOM_TEMP_MAIL_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["CUSTOM_TEMP_MAIL_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["CUSTOM_TEMP_MAIL_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["CUSTOM_TEMP_MAIL_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["CUSTOM_TEMP_MAIL_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
