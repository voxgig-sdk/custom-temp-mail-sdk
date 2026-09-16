

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


describe('PublicV1DashboardAnalyticsEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOM_TEMP_MAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomTempMailSDK.test()
    const ent = testsdk.PublicV1DashboardAnalytics()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'public_v1_dashboard_analytics.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"analyzed_at","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"duration_hours","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"event_count","req":false,"type":"`$INTEGER`","index$":2},{"active":true,"name":"events","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"inbox","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"insights","req":false,"type":"`$ARRAY`","index$":5}],"name":"public_v1_dashboard_analytics","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"test@ditube.info","kind":"param","name":"inbox_id","orig":"inbox","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"test_id","orig":"test_id","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v1/inboxes/{inbox}/timeline","json":"{\"operationId\":\"getTimeline\",\"parameters\":[{\"description\":\"The inbox to get timeline for (e.g. `test@ditube.info`).\",\"example\":\"test@ditube.info\",\"in\":\"path\",\"name\":\"inbox\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Optional test ID to filter the timeline events by a specific test run.\",\"in\":\"query\",\"name\":\"test_id\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"duration_hours\":{\"type\":\"integer\"},\"event_count\":{\"type\":\"integer\"},\"events\":{\"items\":{\"properties\":{\"id\":{\"type\":\"string\"},\"inbox\":{\"type\":\"string\"},\"latency_ms\":{\"type\":\"integer\"},\"metadata\":{\"properties\":{\"error\":{\"type\":\"string\"},\"from\":{\"type\":\"string\"},\"message_id\":{\"type\":\"string\"},\"otp\":{\"type\":\"string\"},\"raw_snippet\":{\"type\":\"string\"},\"score\":{\"type\":\"number\"},\"subject\":{\"type\":\"string\"},\"verification_link\":{\"type\":\"string\"}},\"type\":\"object\"},\"test_run_id\":{\"type\":\"string\"},\"timestamp\":{\"type\":\"integer\"},\"type\":{\"enum\":[\"inbox_created\",\"test_started\",\"smtp_rcpt_received\",\"email_received\",\"email_parsed\",\"otp_extracted\",\"webhook_sent\",\"websocket_sent\",\"error\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"inbox\":{\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"missing_field\",\"invalid_inbox\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing inbox parameter\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"plan_required\",\"plan_restriction\",\"domain_not_verified\",\"domain_not_found\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Plan too low — Growth or Enterprise required\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/inboxes/{inbox}/timeline","rename":{"param":{"inbox":"inbox_id"}},"segments":[{"lit":"v1"},{"lit":"inboxes"},{"var":"inbox_id"},{"lit":"timeline"}],"select":{"exist":["inbox_id","test_id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"example":"test@ditube.info","kind":"param","name":"inbox_id","orig":"inbox","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v1/inboxes/{inbox}/insights","json":"{\"operationId\":\"getInsights\",\"parameters\":[{\"description\":\"The inbox to get insights for (e.g. `test@ditube.info`).\",\"example\":\"test@ditube.info\",\"in\":\"path\",\"name\":\"inbox\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"analyzed_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"inbox\":{\"type\":\"string\"},\"insights\":{\"items\":{\"properties\":{\"message\":{\"example\":\"Email took >3s\",\"type\":\"string\"},\"type\":{\"example\":\"slow_delivery\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"missing_field\",\"invalid_inbox\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing inbox parameter\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"plan_required\",\"plan_restriction\",\"domain_not_verified\",\"domain_not_found\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Plan too low — Growth or Enterprise required\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/inboxes/{inbox}/insights","rename":{"param":{"inbox":"inbox_id"}},"segments":[{"lit":"v1"},{"lit":"inboxes"},{"var":"inbox_id"},{"lit":"insights"}],"select":{"exist":["inbox_id"]},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["inbox"]]},"key$":"public_v1_dashboard_analytics","name__orig":"public_v1_dashboard_analytics","Name":"PublicV1DashboardAnalytics","name_":"public_v1_dashboard_analytics","name-":"public-v1-dashboard-analytics","NAME":"PUBLIC_V1_DASHBOARD_ANALYTICS","index$":9}, {"active":true,"entity":"public_v1_dashboard_analytics","key$":"BasicPublicV1DashboardAnalyticsFlow","kind":"basic","name":"BasicPublicV1DashboardAnalyticsFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"public_v1_dashboard_analytics_ref01","srcdatavar":"public_v1_dashboard_analytics_ref01_data","suffix":"_dt0"},"match":{"id":"public_v1_dashboard_analytics01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-public_v1_dashboard_analytics_ref01"}}],"index$":0}]}, 'PublicV1DashboardAnalytics')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let public_v1_dashboard_analytics_ref01_data = Object.values(setup.data.existing.public_v1_dashboard_analytics)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const public_v1_dashboard_analytics_ref01_ent = client.PublicV1DashboardAnalytics()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/public_v1_dashboard_analytics/PublicV1DashboardAnalyticsTestData.json')

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
    ['public_v1_dashboard_analytics01','public_v1_dashboard_analytics02','public_v1_dashboard_analytics03','inbox01','inbox02','inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_DASHBOARD_ANALYTICS_ENTID': idmap,
    'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
    'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
    'CUSTOM_TEMP_MAIL_APIKEY': '',
  })

  idmap = env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_DASHBOARD_ANALYTICS_ENTID']

  const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_DASHBOARD_ANALYTICS_ENTID']
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
  
