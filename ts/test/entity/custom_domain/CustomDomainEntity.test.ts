

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


describe('CustomDomainEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOM_TEMP_MAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomTempMailSDK.test()
    const ent = testsdk.CustomDomain()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'custom_domain.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"added_at","req":false,"short":"ISO 8601 timestamp when the domain was added.","type":"`$STRING`","index$":0},{"active":true,"name":"domain","req":true,"short":"Bare domain name (no leading @).","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"mx_record","req":true,"short":"The MX record value to add at your registrar.","type":"`$STRING`","index$":3},{"active":true,"name":"txt_record","req":true,"short":"The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.","type":"`$STRING`","index$":4},{"active":true,"name":"verified","req":true,"short":"`true` — MX and TXT records confirmed.","type":"`$BOOLEAN`","index$":5}],"id":{"field":"id","name":"id"},"name":"custom_domain","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /v1/custom-domains","json":"{\"operationId\":\"addCustomDomain\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"example\":{\"domain\":\"mail.acme.com\"},\"schema\":{\"properties\":{\"domain\":{\"description\":\"The bare domain name to add (no leading `@`, no protocol).\",\"example\":\"mail.acme.com\",\"type\":\"string\"}},\"required\":[\"domain\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"description\":\"A custom domain added to your account.\",\"properties\":{\"added_at\":{\"description\":\"ISO 8601 timestamp when the domain was added.\",\"example\":\"2026-01-15T10:00:00.000Z\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"domain\":{\"description\":\"Bare domain name (no leading @).\",\"example\":\"mail.acme.com\",\"type\":\"string\"},\"mx_record\":{\"description\":\"The MX record value to add at your registrar.\",\"example\":\"mx.freecustom.email\",\"type\":\"string\"},\"txt_record\":{\"description\":\"The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.\",\"example\":\"freecustomemail-verification=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4\",\"type\":\"string\"},\"verified\":{\"description\":\"`true` — MX and TXT records confirmed. Inboxes can be registered.\\n`false` — DNS records not yet verified. Call the verify endpoint.\\n\",\"example\":true,\"type\":\"boolean\"}},\"required\":[\"domain\",\"verified\",\"mx_record\",\"txt_record\"],\"type\":\"object\"},\"message\":{\"example\":\"Domain already added.\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Domain was already added (idempotent)\"},\"201\":{\"content\":{\"application/json\":{\"example\":{\"data\":{\"added_at\":\"2026-03-11T12:00:00.000Z\",\"dns_records\":[{\"hostname\":\"@\",\"priority\":\"10\",\"ttl\":\"Auto\",\"type\":\"MX\",\"value\":\"mx.freecustom.email\"},{\"hostname\":\"@\",\"ttl\":\"Auto\",\"type\":\"TXT\",\"value\":\"freecustomemail-verification=a1b2c3d4e5f6...\"}],\"domain\":\"mail.acme.com\",\"mx_record\":\"mx.freecustom.email\",\"next_step\":\"POST /v1/custom-domains/mail.acme.com/verify\",\"txt_record\":\"freecustomemail-verification=a1b2c3d4e5f6...\",\"verified\":false},\"message\":\"Domain added. Configure the DNS records below, then call the verify endpoint.\",\"success\":true},\"schema\":{\"properties\":{\"data\":{\"allOf\":[{\"description\":\"A custom domain added to your account.\",\"properties\":{\"added_at\":{\"description\":\"ISO 8601 timestamp when the domain was added.\",\"example\":\"2026-01-15T10:00:00.000Z\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"domain\":{\"description\":\"Bare domain name (no leading @).\",\"example\":\"mail.acme.com\",\"type\":\"string\"},\"mx_record\":{\"description\":\"The MX record value to add at your registrar.\",\"example\":\"mx.freecustom.email\",\"type\":\"string\"},\"txt_record\":{\"description\":\"The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.\",\"example\":\"freecustomemail-verification=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4\",\"type\":\"string\"},\"verified\":{\"description\":\"`true` — MX and TXT records confirmed. Inboxes can be registered.\\n`false` — DNS records not yet verified. Call the verify endpoint.\\n\",\"example\":true,\"type\":\"boolean\"}},\"required\":[\"domain\",\"verified\",\"mx_record\",\"txt_record\"],\"type\":\"object\"}],\"properties\":{\"dns_records\":{\"description\":\"The two DNS records to add at your registrar (MX + TXT).\",\"items\":{\"description\":\"A DNS record to add at your registrar.\",\"properties\":{\"hostname\":{\"description\":\"The DNS hostname / host field. `@` means the root of the domain.\",\"example\":\"@\",\"type\":\"string\"},\"priority\":{\"description\":\"MX priority. Only present for MX records.\",\"example\":\"10\",\"nullable\":true,\"type\":\"string\"},\"ttl\":{\"description\":\"Recommended TTL setting.\",\"example\":\"Auto\",\"type\":\"string\"},\"type\":{\"enum\":[\"MX\",\"TXT\"],\"example\":\"MX\",\"type\":\"string\"},\"value\":{\"description\":\"The record value to enter in your DNS panel.\",\"example\":\"mx.freecustom.email\",\"type\":\"string\"}},\"required\":[\"type\",\"hostname\",\"value\",\"ttl\"],\"type\":\"object\"},\"type\":\"array\"},\"next_step\":{\"description\":\"The API path to call once DNS records are live.\",\"example\":\"POST /v1/custom-domains/mail.acme.com/verify\",\"type\":\"string\"}},\"type\":\"object\"},\"message\":{\"example\":\"Domain added. Configure the DNS records below, then call the verify endpoint.\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Domain added — configure the DNS records and then call the verify endpoint\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"invalid_domain\":{\"value\":{\"error\":\"invalid_domain\",\"message\":\"Must be a valid domain name (e.g. \\\"mail.yourdomain.com\\\").\",\"success\":false}},\"limit_reached\":{\"value\":{\"error\":\"limit_reached\",\"message\":\"Maximum of 10 custom domains reached.\",\"success\":false}},\"missing_field\":{\"value\":{\"error\":\"missing_field\",\"message\":\"`domain` is required (e.g. \\\"mail.yourdomain.com\\\").\",\"success\":false}}},\"schema\":{\"properties\":{\"error\":{\"enum\":[\"missing_field\",\"invalid_domain\",\"limit_reached\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid domain name\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"plan_required\",\"plan_restriction\",\"domain_not_verified\",\"domain_not_found\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Plan too low — Growth or Enterprise required\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/v1/custom-domains","segments":[{"lit":"v1"},{"lit":"custom-domains"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /v1/custom-domains","json":"{\"operationId\":\"listCustomDomains\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"count\":2,\"data\":[{\"added_at\":\"2026-01-15T10:00:00.000Z\",\"domain\":\"mail.acme.com\",\"mx_record\":\"mx.freecustom.email\",\"txt_record\":\"freecustomemail-verification=a1b2c3d4e5f6...\",\"verified\":true},{\"added_at\":\"2026-03-10T08:30:00.000Z\",\"domain\":\"staging.acme.com\",\"mx_record\":\"mx.freecustom.email\",\"txt_record\":\"freecustomemail-verification=9z8y7x6w5v4u...\",\"verified\":false}],\"success\":true},\"schema\":{\"properties\":{\"count\":{\"description\":\"Number of custom domains in your account.\",\"example\":2,\"type\":\"integer\"},\"data\":{\"items\":{\"description\":\"A custom domain added to your account.\",\"properties\":{\"added_at\":{\"description\":\"ISO 8601 timestamp when the domain was added.\",\"example\":\"2026-01-15T10:00:00.000Z\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"domain\":{\"description\":\"Bare domain name (no leading @).\",\"example\":\"mail.acme.com\",\"type\":\"string\"},\"mx_record\":{\"description\":\"The MX record value to add at your registrar.\",\"example\":\"mx.freecustom.email\",\"type\":\"string\"},\"txt_record\":{\"description\":\"The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.\",\"example\":\"freecustomemail-verification=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4\",\"type\":\"string\"},\"verified\":{\"description\":\"`true` — MX and TXT records confirmed. Inboxes can be registered.\\n`false` — DNS records not yet verified. Call the verify endpoint.\\n\",\"example\":true,\"type\":\"boolean\"}},\"required\":[\"domain\",\"verified\",\"mx_record\",\"txt_record\"],\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Success\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"plan_required\",\"plan_restriction\",\"domain_not_verified\",\"domain_not_found\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Plan too low — Growth or Enterprise required\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/custom-domains","segments":[{"lit":"v1"},{"lit":"custom-domains"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"example":"mail.acme.com","kind":"param","name":"id","orig":"domain","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /v1/custom-domains/{domain}","json":"{\"operationId\":\"deleteCustomDomain\",\"parameters\":[{\"description\":\"The bare domain name to remove (e.g. `mail.acme.com`).\",\"in\":\"path\",\"name\":\"domain\",\"required\":true,\"schema\":{\"example\":\"mail.acme.com\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"inboxes_removed\":[\"support@mail.acme.com\",\"noreply@mail.acme.com\"],\"message\":\"\\\"mail.acme.com\\\" removed.\",\"success\":true},\"schema\":{\"properties\":{\"inboxes_removed\":{\"description\":\"API inboxes that were automatically unregistered because they used\\nthis domain. May be an empty array.\\n\",\"example\":[\"support@mail.acme.com\",\"noreply@mail.acme.com\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"message\":{\"example\":\"\\\"mail.acme.com\\\" removed.\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Domain removed\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"plan_required\",\"plan_restriction\",\"domain_not_verified\",\"domain_not_found\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Plan too low\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"domain_not_found\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Domain not found in your account\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/v1/custom-domains/{domain}","rename":{"param":{"domain":"id"}},"segments":[{"lit":"v1"},{"lit":"custom-domains"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"custom_domain","name__orig":"custom_domain","Name":"CustomDomain","name_":"custom_domain","name-":"custom-domain","NAME":"CUSTOM_DOMAIN","index$":0}, {"active":true,"entity":"custom_domain","key$":"BasicCustomDomainFlow","kind":"basic","name":"BasicCustomDomainFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"custom_domain_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"custom_domain_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"custom_domain_ref01","suffix":"_rm0"},"match":{"id":"custom_domain01"},"op":"remove","spec":[],"valid":[],"index$":2},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"custom_domain_ref01"}}],"index$":3}]}, 'CustomDomain')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const custom_domain_ref01_ent = client.CustomDomain()
    let custom_domain_ref01_data = setup.data.new.custom_domain['custom_domain_ref01']

    custom_domain_ref01_data = (await custom_domain_ref01_ent.create(custom_domain_ref01_data)).data()
    assert(null != custom_domain_ref01_data.id)


    // LIST
    const custom_domain_ref01_match: any = {}

    const custom_domain_ref01_list = (await custom_domain_ref01_ent.list(custom_domain_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(custom_domain_ref01_list, { id: custom_domain_ref01_data.id })))


    // REMOVE
    const custom_domain_ref01_match_rm0: any = { id: custom_domain_ref01_data.id }
    await custom_domain_ref01_ent.remove(custom_domain_ref01_match_rm0)
  

    // LIST
    const custom_domain_ref01_match_rt0: any = {}

    const custom_domain_ref01_list_rt0 = (await custom_domain_ref01_ent.list(custom_domain_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(custom_domain_ref01_list_rt0, { id: custom_domain_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/custom_domain/CustomDomainTestData.json')

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
    ['custom_domain01','custom_domain02','custom_domain03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_ENTID': idmap,
    'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
    'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
    'CUSTOM_TEMP_MAIL_APIKEY': '',
  })

  idmap = env['CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_ENTID']

  const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_ENTID']
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
  
