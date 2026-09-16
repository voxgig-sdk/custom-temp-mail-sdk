

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { CustomTempMailSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PublicV1InboxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOM_TEMP_MAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomTempMailSDK.test()
    const ent = testsdk.PublicV1Inbox()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE
    for (const op of ['create', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'public_v1_inbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"count","req":false,"short":"Number of inboxes to generate (1–500 depending on plan).","type":"`$INTEGER`","index$":0},{"active":true,"name":"custom_firstnames","req":false,"short":"Custom first-name pool for `firstname.surname` style.","type":"`$ARRAY`","index$":1},{"active":true,"name":"custom_surnames","req":false,"short":"Custom surname pool for `firstname.surname` style.","type":"`$ARRAY`","index$":2},{"active":true,"name":"daily_limit","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"daily_remaining","req":false,"type":"`$INTEGER`","index$":4},{"active":true,"name":"daily_used","req":false,"type":"`$INTEGER`","index$":5},{"active":true,"name":"domain_mode","req":false,"short":"Which domain pool to use.","type":"`$STRING`","index$":6},{"active":true,"name":"domains","req":false,"short":"Required when `domain_mode` is `specific`.","type":"`$ARRAY`","index$":7},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":8},{"active":true,"name":"inbox","req":false,"type":"`$STRING`","index$":9},{"active":true,"name":"inboxes","req":false,"type":"`$ARRAY`","index$":10},{"active":true,"name":"output_format","req":false,"short":"Template string for each line of output.","type":"`$STRING`","index$":11},{"active":true,"name":"parseCode","req":false,"short":"When `true` (default), embeds `?parseCode=true` in every OTP URL.","type":"`$BOOLEAN`","index$":12},{"active":true,"name":"since","req":false,"short":"Unix timestamp in milliseconds.","type":"`$INTEGER`","index$":13},{"active":true,"format":"date-time","name":"started_at","req":false,"type":"`$STRING`","index$":14},{"active":true,"name":"success","req":false,"type":"`$BOOLEAN`","index$":15},{"active":true,"name":"test_id","req":false,"short":"Optional custom test ID.","type":"`$STRING`","index$":16},{"active":true,"name":"username_style","req":false,"short":"Username generation style.","type":"`$STRING`","index$":17}],"id":{"field":"id","name":"id"},"name":"public_v1_inbox","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"example":"test@ditube.info","kind":"param","name":"inbox_id","orig":"inbox","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /v1/inboxes/{inbox}/tests","json":"{\"operationId\":\"startTestRun\",\"parameters\":[{\"description\":\"The inbox to start a test for.\",\"in\":\"path\",\"name\":\"inbox\",\"required\":true,\"schema\":{\"example\":\"test@ditube.info\",\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"test_id\":{\"description\":\"Optional custom test ID. If omitted, one will be generated.\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"inbox\":{\"example\":\"test@ditube.info\",\"type\":\"string\"},\"started_at\":{\"example\":\"2026-03-04T10:00:00.000Z\",\"format\":\"date-time\",\"type\":\"string\"},\"test_id\":{\"example\":\"signup-test-1\",\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Test started\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/v1/inboxes/{inbox}/tests","rename":{"param":{"inbox":"inbox_id"}},"segments":[{"lit":"v1"},{"lit":"inboxes"},{"var":"inbox_id"},{"lit":"tests"}],"select":{"exist":["inbox_id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /v1/inboxes/generate","json":"{\"operationId\":\"generateInboxes\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"default\":1,\"description\":\"Number of inboxes to generate (1–500 depending on plan).\",\"minimum\":1,\"type\":\"integer\"},\"custom_firstnames\":{\"description\":\"Custom first-name pool for `firstname.surname` style.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"custom_surnames\":{\"description\":\"Custom surname pool for `firstname.surname` style.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"domain_mode\":{\"default\":\"any\",\"description\":\"Which domain pool to use. One of: `any` (default), `free_only`, `pro_only`, `custom_only`, `specific`.\\n\",\"type\":\"string\"},\"domains\":{\"description\":\"Required when `domain_mode` is `specific`. List of domains to use.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"output_format\":{\"default\":\"{email}----{otp_url}\",\"description\":\"Template string for each line of output. Variables: `{email}`, `{username}`, `{domain}`, `{otp_url}`, `{token}`, `{api_key}`.\\n\",\"type\":\"string\"},\"parseCode\":{\"default\":true,\"description\":\"When `true` (default), embeds `?parseCode=true` in every OTP URL. This enables on-demand OTP extraction at poll time rather than at SMTP delivery — required for API inboxes since they use the fast-save path.\\n\",\"type\":\"boolean\"},\"since\":{\"description\":\"Unix timestamp in milliseconds. When provided, it is embedded as `?since=` in every OTP URL so stale codes from previous sessions are ignored.\\n\",\"type\":\"integer\"},\"username_style\":{\"default\":\"random_chars\",\"description\":\"Username generation style. One of: `random_chars` (default), `digits_only`, `letters_only`, `name`, `noun_digits`, `firstname.surname`.\\n\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"example\":5,\"type\":\"integer\"},\"daily_limit\":{\"nullable\":true,\"type\":\"integer\"},\"daily_remaining\":{\"nullable\":true,\"type\":\"integer\"},\"daily_used\":{\"nullable\":true,\"type\":\"integer\"},\"inboxes\":{\"items\":{\"properties\":{\"domain\":{\"example\":\"addmy.space\",\"type\":\"string\"},\"email\":{\"example\":\"jade.quasar21@addmy.space\",\"type\":\"string\"},\"formatted\":{\"example\":\"jade.quasar21@addmy.space----https://api2.freecustom.email/v1/otp/public?token=fceotp_…\",\"type\":\"string\"},\"otp_url\":{\"example\":\"https://api2.freecustom.email/v1/otp/public?token=fceotp_…&since=1716900000000&parseCode=true\",\"type\":\"string\"},\"token\":{\"example\":\"fceotp_24f1add500d18150a02c62e4…\",\"type\":\"string\"},\"username\":{\"example\":\"jade.quasar21\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Inboxes generated\"},\"400\":{\"description\":\"Invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"plan_required\",\"plan_restriction\",\"domain_not_verified\",\"domain_not_found\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Plan too low or daily/batch limit exceeded\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/v1/inboxes/generate","segments":[{"lit":"v1"},{"lit":"inboxes"},{"lit":"generate"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"inbox","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /v1/inboxes/{inbox}","json":"{\"operationId\":\"deleteInbox\",\"parameters\":[{\"description\":\"URL-encoded email address (e.g. test%40ditube.info)\",\"in\":\"path\",\"name\":\"inbox\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Unregistered\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"not_found\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Inbox not registered\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/v1/inboxes/{inbox}","rename":{"param":{"inbox":"id"}},"segments":[{"lit":"v1"},{"lit":"inboxes"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["inbox"]]},"key$":"public_v1_inbox","name__orig":"public_v1_inbox","Name":"PublicV1Inbox","name_":"public_v1_inbox","name-":"public-v1-inbox","NAME":"PUBLIC_V1_INBOX","index$":10}, {"active":true,"entity":"public_v1_inbox","key$":"BasicPublicV1InboxFlow","kind":"basic","name":"BasicPublicV1InboxFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"public_v1_inbox_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"public_v1_inbox_ref01","suffix":"_rm0"},"match":{"id":"public_v1_inbox01"},"op":"remove","spec":[],"valid":[],"index$":1}]}, 'PublicV1Inbox')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const public_v1_inbox_ref01_ent = client.PublicV1Inbox()
    let public_v1_inbox_ref01_data = setup.data.new.public_v1_inbox['public_v1_inbox_ref01']

    public_v1_inbox_ref01_data = (await public_v1_inbox_ref01_ent.create(public_v1_inbox_ref01_data)).data()
    assert(null != public_v1_inbox_ref01_data.id)


    // REMOVE
    const public_v1_inbox_ref01_match_rm0: any = { id: public_v1_inbox_ref01_data.id }
    await public_v1_inbox_ref01_ent.remove(public_v1_inbox_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/public_v1_inbox/PublicV1InboxTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = CustomTempMailSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['public_v1_inbox01','public_v1_inbox02','public_v1_inbox03','inbox01','inbox02','inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_INBOX_ENTID': idmap,
    'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
    'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
    'CUSTOM_TEMP_MAIL_APIKEY': '',
  })

  idmap = env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_INBOX_ENTID']

  const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_INBOX_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new CustomTempMailSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.CUSTOM_TEMP_MAIL_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
