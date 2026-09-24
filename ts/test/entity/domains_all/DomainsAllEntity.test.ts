

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"domain":{"a":true,"h":"Domain","n":"domain","r":true,"sh":"Bare domain name (no leading @).","t":"`$STRING`","key$":"domain","index$":0},"expired":{"a":true,"h":"Expired","n":"expired","r":true,"sh":"True when the domain has already passed its expiry date.","t":"`$BOOLEAN`","key$":"expired","index$":1},"expires_at":{"a":true,"fo":"date","h":"Expires At","n":"expires_at","op":{"list":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"ISO 8601 date when the domain registration expires at the registrar.","t":"`$STRING`","key$":"expires_at","index$":2},"expires_in_days":{"a":true,"h":"Expires In Days","n":"expires_in_days","op":{"list":{"req":true,"type":"`$INTEGER`"}},"r":false,"sh":"Days remaining until expiry.","t":"`$INTEGER`","key$":"expires_in_days","index$":3},"expiring_soon":{"a":true,"h":"Expiring Soon","n":"expiring_soon","op":{"list":{"req":true,"type":"`$BOOLEAN`"}},"r":false,"sh":"True when the domain expires within 30 days.","t":"`$BOOLEAN`","key$":"expiring_soon","index$":4},"tags":{"a":true,"h":"Tags","n":"tags","r":true,"sh":"`new` — recently added, shown for ~30 days.","t":"`$ARRAY`","key$":"tags","index$":5},"tier":{"a":true,"h":"Tier","n":"tier","r":true,"sh":"`free` — available on all plans.","t":"`$STRING`","key$":"tier","index$":6}},"name":"domains_all","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/domains/all","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/domains/all","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"domains"},{"lit":"all"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"domains_all","name__orig":"domains_all","Name":"DomainsAll","name_":"domains_all","name-":"domains-all","NAME":"DOMAINS_ALL","index$":3}, {"active":true,"entity":"domains_all","key$":"BasicDomainsAllFlow","kind":"basic","name":"BasicDomainsAllFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"domains_all_ref01"}}],"index$":0}]}, 'DomainsAll', {"GET /v1/domains/all":{"protocol":"http","operationId":"listDomainsAll","responses":{"200":{"description":"Success","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"example":true,"key$":"success","type":"boolean"},"count":{"example":10,"key$":"count","type":"integer"},"data":{"items":{"allOf":[{"properties":{"domain":{"description":"Bare domain name (no leading @).","example":"ditube.info","type":"string","key$":"domain"},"expires_at":{"description":"ISO 8601 date when the domain registration expires at the registrar.\nOnly present when `expiring_soon` is true (within 30 days).\n","example":"2026-04-01","format":"date","nullable":true,"type":"string","key$":"expires_at"},"expires_in_days":{"description":"Days remaining until expiry. Only present when `expiring_soon` is true.","example":25,"nullable":true,"type":"integer","key$":"expires_in_days"},"expiring_soon":{"description":"True when the domain expires within 30 days. Omitted entirely for\nhealthy domains to keep the payload lean. When true, migrate inboxes\nto a different domain or your own custom domain.\n","example":true,"nullable":true,"type":"boolean","key$":"expiring_soon"},"tags":{"description":"`new` — recently added, shown for ~30 days.\n`popular` — high-traffic domain.\n`featured` — pinned at top of domain picker.\n","example":["popular"],"items":{"enum":["new","popular","featured"],"type":"string"},"type":"array","key$":"tags"},"tier":{"description":"`free` — available on all plans.\n`pro` — requires Growth or Enterprise plan.\n","enum":["free","pro"],"type":"string","key$":"tier"}},"required":["domain","tier","tags"],"type":"object","x-ref":"#/components/schemas/DomainEntry","index$":0},{"properties":{"expired":{"description":"True when the domain has already passed its expiry date.","example":false,"type":"boolean","key$":"expired"},"expires_at":{"description":"ISO 8601 registrar expiry date. Always present on this endpoint.","example":"2026-08-01","format":"date","type":"string","key$":"expires_at"},"expires_in_days":{"description":"Days remaining until expiry. Always present on this endpoint.","example":147,"type":"integer","key$":"expires_in_days"},"expiring_soon":{"description":"True when expiry is within 30 days. Always present on this endpoint.","example":false,"type":"boolean","key$":"expiring_soon"}},"required":["expires_at","expires_in_days","expiring_soon","expired"],"type":"object","index$":1}],"x-ref":"#/components/schemas/DomainEntryFull"},"key$":"data","type":"array"}},"x-ref":"#/components/schemas/DomainsAllResponse"},"example":{"success":true,"count":10,"data":[{"domain":"ditube.info","tier":"free","tags":["popular"],"expires_at":"2026-08-01","expires_in_days":147,"expiring_soon":false,"expired":false},{"domain":"ditmail.pro","tier":"pro","tags":["new","featured"],"expires_at":"2026-09-05","expires_in_days":178,"expiring_soon":false,"expired":false}]}}}},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["unauthorized","key_revoked"]},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error401"}}},"x-ref":"#/components/responses/Unauthorized"},"429":{"description":"Rate limit exceeded (per-second or monthly quota)","headers":{"Retry-After":{"schema":{"type":"integer","description":"Seconds to wait before retrying"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["rate_limit_exceeded","monthly_quota_exceeded"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true},"credits_url":{"type":"string","format":"uri","nullable":true},"hint":{"type":"string","nullable":true}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key","description":"API key as query parameter (alternative to Bearer header)"}}}})
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
  
