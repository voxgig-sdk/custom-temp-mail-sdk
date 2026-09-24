

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


describe('MenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOM_TEMP_MAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomTempMailSDK.test()
    const ent = testsdk.Men()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'men.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"api_inbox_count":{"a":true,"h":"Api Inbox Count","n":"api_inbox_count","r":false,"t":"`$INTEGER`","key$":"api_inbox_count","index$":0},"api_inboxes":{"a":true,"h":"Api Inboxes","n":"api_inboxes","r":false,"t":"`$ARRAY`","key$":"api_inboxes","index$":1},"app_inbox_count":{"a":true,"h":"App Inbox Count","n":"app_inbox_count","r":false,"t":"`$INTEGER`","key$":"app_inbox_count","index$":2},"app_inboxes":{"a":true,"h":"App Inboxes","n":"app_inboxes","r":false,"t":"`$ARRAY`","key$":"app_inboxes","index$":3},"credits":{"a":true,"h":"Credits","n":"credits","r":false,"t":"`$INTEGER`","key$":"credits","index$":4},"custom_domain_count":{"a":true,"h":"Custom Domain Count","n":"custom_domain_count","r":false,"t":"`$INTEGER`","key$":"custom_domain_count","index$":5},"custom_domains":{"a":true,"h":"Custom Domains","n":"custom_domains","r":false,"t":"`$ARRAY`","key$":"custom_domains","index$":6},"features":{"a":true,"h":"Features","n":"features","r":false,"t":"`$OBJECT`","key$":"features","index$":7},"plan":{"a":true,"h":"Plan","n":"plan","r":false,"t":"`$STRING`","key$":"plan","index$":8},"rate_limits":{"a":true,"h":"Rate Limits","n":"rate_limits","r":false,"t":"`$OBJECT`","key$":"rate_limits","index$":9}},"name":"men","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/me","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/me","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"me"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"men","name__orig":"men","Name":"Men","name_":"men","name-":"men","NAME":"MEN","index$":5}, {"active":true,"entity":"men","key$":"BasicMenFlow","kind":"basic","name":"BasicMenFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"men_ref01","srcdatavar":"men_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-men_ref01"}}],"index$":0}]}, 'Men', {"GET /v1/me":{"protocol":"http","operationId":"getMe","responses":{"200":{"description":"Success","headers":{"X-API-Plan":{"schema":{"type":"string","example":"startup"}},"X-RateLimit-Limit-Second":{"schema":{"type":"integer","example":25}},"X-RateLimit-Remaining-Second":{"schema":{"type":"integer","example":24}},"X-RateLimit-Limit-Month":{"schema":{"type":"integer","example":250000}},"X-RateLimit-Remaining-Month":{"schema":{"type":"integer","example":248770}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"example":true,"key$":"success","type":"boolean"},"data":{"key$":"data","properties":{"api_inbox_count":{"type":"integer","key$":"api_inbox_count"},"api_inboxes":{"items":{"type":"string"},"type":"array","key$":"api_inboxes"},"app_inbox_count":{"type":"integer","key$":"app_inbox_count"},"app_inboxes":{"items":{"type":"string"},"type":"array","key$":"app_inboxes"},"credits":{"example":25000,"type":"integer","key$":"credits"},"custom_domain_count":{"type":"integer","key$":"custom_domain_count"},"custom_domains":{"items":{"description":"A custom domain added to your account.","properties":{"added_at":{"description":"ISO 8601 timestamp when the domain was added.","example":"2026-01-15T10:00:00.000Z","format":"date-time","nullable":true,"type":"string"},"domain":{"description":"Bare domain name (no leading @).","example":"mail.acme.com","type":"string"},"mx_record":{"description":"The MX record value to add at your registrar.","example":"mx.freecustom.email","type":"string"},"txt_record":{"description":"The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.","example":"freecustomemail-verification=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4","type":"string"},"verified":{"description":"`true` — MX and TXT records confirmed. Inboxes can be registered.\n`false` — DNS records not yet verified. Call the verify endpoint.\n","example":true,"type":"boolean"}},"required":["domain","verified","mx_record","txt_record"],"type":"object","x-ref":"#/components/schemas/CustomDomainEntry"},"type":"array","key$":"custom_domains"},"features":{"properties":{"attachments":{"type":"boolean"},"custom_domains":{"type":"boolean"},"max_attachment_size_mb":{"type":"integer"},"max_ws_connections":{"type":"integer"},"otp_extraction":{"type":"boolean"},"websocket":{"type":"boolean"}},"type":"object","key$":"features"},"plan":{"example":"startup","type":"string","key$":"plan"},"rate_limits":{"properties":{"requests_per_month":{"type":"integer"},"requests_per_second":{"type":"integer"}},"type":"object","key$":"rate_limits"}},"type":"object","index$":0}},"x-ref":"#/components/schemas/MeResponse"}}}},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["unauthorized","key_revoked"]},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error401"}}}},"429":{"description":"Rate limit exceeded","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["rate_limit_exceeded","monthly_quota_exceeded"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true},"credits_url":{"type":"string","format":"uri","nullable":true},"hint":{"type":"string","nullable":true}},"x-ref":"#/components/schemas/Error429"}}}}},"parameters":[],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key","description":"API key as query parameter (alternative to Bearer header)"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let men_ref01_data = Object.values(setup.data.existing.men)[0] as any

    // LOAD
    const men_ref01_ent = client.Men()
    const men_ref01_match_dt0: any = {}
    const men_ref01_data_dt0 = (await men_ref01_ent.load(men_ref01_match_dt0)).data()
    assert(null != men_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/men/MenTestData.json')

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
    ['men01','men02','men03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOM_TEMP_MAIL_TEST_MEN_ENTID': idmap,
    'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
    'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
    'CUSTOM_TEMP_MAIL_APIKEY': '',
  })

  idmap = env['CUSTOM_TEMP_MAIL_TEST_MEN_ENTID']

  const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_MEN_ENTID']
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
  
