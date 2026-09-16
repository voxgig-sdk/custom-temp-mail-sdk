

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


describe('DomainsAllEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOM_TEMP_MAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomTempMailSDK.test()
    const ent = testsdk.DomainsAll()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'domains_all.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"domain","req":true,"short":"Bare domain name (no leading @).","type":"`$STRING`","index$":0},{"active":true,"name":"expired","req":true,"short":"True when the domain has already passed its expiry date.","type":"`$BOOLEAN`","index$":1},{"active":true,"format":"date","name":"expires_at","op":{"list":{"req":true,"type":"`$STRING`"}},"req":false,"short":"ISO 8601 date when the domain registration expires at the registrar.","type":"`$STRING`","index$":2},{"active":true,"name":"expires_in_days","op":{"list":{"req":true,"type":"`$INTEGER`"}},"req":false,"short":"Days remaining until expiry.","type":"`$INTEGER`","index$":3},{"active":true,"name":"expiring_soon","op":{"list":{"req":true,"type":"`$BOOLEAN`"}},"req":false,"short":"True when the domain expires within 30 days.","type":"`$BOOLEAN`","index$":4},{"active":true,"name":"tags","req":true,"short":"`new` — recently added, shown for ~30 days.","type":"`$ARRAY`","index$":5},{"active":true,"name":"tier","req":true,"short":"`free` — available on all plans.","type":"`$STRING`","index$":6}],"name":"domains_all","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /v1/domains/all","json":"{\"operationId\":\"listDomainsAll\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"count\":10,\"data\":[{\"domain\":\"ditube.info\",\"expired\":false,\"expires_at\":\"2026-08-01\",\"expires_in_days\":147,\"expiring_soon\":false,\"tags\":[\"popular\"],\"tier\":\"free\"},{\"domain\":\"ditmail.pro\",\"expired\":false,\"expires_at\":\"2026-09-05\",\"expires_in_days\":178,\"expiring_soon\":false,\"tags\":[\"new\",\"featured\"],\"tier\":\"pro\"}],\"success\":true},\"schema\":{\"properties\":{\"count\":{\"example\":10,\"type\":\"integer\"},\"data\":{\"items\":{\"allOf\":[{\"properties\":{\"domain\":{\"description\":\"Bare domain name (no leading @).\",\"example\":\"ditube.info\",\"type\":\"string\"},\"expires_at\":{\"description\":\"ISO 8601 date when the domain registration expires at the registrar.\\nOnly present when `expiring_soon` is true (within 30 days).\\n\",\"example\":\"2026-04-01\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"expires_in_days\":{\"description\":\"Days remaining until expiry. Only present when `expiring_soon` is true.\",\"example\":25,\"nullable\":true,\"type\":\"integer\"},\"expiring_soon\":{\"description\":\"True when the domain expires within 30 days. Omitted entirely for\\nhealthy domains to keep the payload lean. When true, migrate inboxes\\nto a different domain or your own custom domain.\\n\",\"example\":true,\"nullable\":true,\"type\":\"boolean\"},\"tags\":{\"description\":\"`new` — recently added, shown for ~30 days.\\n`popular` — high-traffic domain.\\n`featured` — pinned at top of domain picker.\\n\",\"example\":[\"popular\"],\"items\":{\"enum\":[\"new\",\"popular\",\"featured\"],\"type\":\"string\"},\"type\":\"array\"},\"tier\":{\"description\":\"`free` — available on all plans.\\n`pro` — requires Growth or Enterprise plan.\\n\",\"enum\":[\"free\",\"pro\"],\"type\":\"string\"}},\"required\":[\"domain\",\"tier\",\"tags\"],\"type\":\"object\"},{\"properties\":{\"expired\":{\"description\":\"True when the domain has already passed its expiry date.\",\"example\":false,\"type\":\"boolean\"},\"expires_at\":{\"description\":\"ISO 8601 registrar expiry date. Always present on this endpoint.\",\"example\":\"2026-08-01\",\"format\":\"date\",\"type\":\"string\"},\"expires_in_days\":{\"description\":\"Days remaining until expiry. Always present on this endpoint.\",\"example\":147,\"type\":\"integer\"},\"expiring_soon\":{\"description\":\"True when expiry is within 30 days. Always present on this endpoint.\",\"example\":false,\"type\":\"boolean\"}},\"required\":[\"expires_at\",\"expires_in_days\",\"expiring_soon\",\"expired\"],\"type\":\"object\"}]},\"type\":\"array\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/domains/all","segments":[{"lit":"v1"},{"lit":"domains"},{"lit":"all"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"domains_all","name__orig":"domains_all","Name":"DomainsAll","name_":"domains_all","name-":"domains-all","NAME":"DOMAINS_ALL","index$":3}, {"active":true,"entity":"domains_all","key$":"BasicDomainsAllFlow","kind":"basic","name":"BasicDomainsAllFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"domains_all_ref01"}}],"index$":0}]}, 'DomainsAll')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let domains_all_ref01_data = Object.values(setup.data.existing.domains_all)[0] as any

    // LIST
    const domains_all_ref01_ent = client.DomainsAll()
    const domains_all_ref01_match: any = {}

    const domains_all_ref01_list = (await domains_all_ref01_ent.list(domains_all_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/domains_all/DomainsAllTestData.json')

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
    ['domains_all01','domains_all02','domains_all03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOM_TEMP_MAIL_TEST_DOMAINS_ALL_ENTID': idmap,
    'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
    'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
    'CUSTOM_TEMP_MAIL_APIKEY': '',
  })

  idmap = env['CUSTOM_TEMP_MAIL_TEST_DOMAINS_ALL_ENTID']

  const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_DOMAINS_ALL_ENTID']
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
  
