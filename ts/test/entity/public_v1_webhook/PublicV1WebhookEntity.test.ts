

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


describe('PublicV1WebhookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOM_TEMP_MAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomTempMailSDK.test()
    const ent = testsdk.PublicV1Webhook()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'public_v1_webhook.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"t":"`$STRING`","key$":"createdAt","index$":0},"failureCount":{"a":true,"h":"Failure Count","n":"failureCount","r":false,"t":"`$INTEGER`","key$":"failureCount","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"inbox":{"a":true,"fo":"email","h":"Inbox","n":"inbox","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The registered inbox to subscribe to.","t":"`$STRING`","key$":"inbox","index$":3},"url":{"a":true,"fo":"uri","h":"Url","n":"url","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The HTTPS URL to receive the POST request.","t":"`$STRING`","key$":"url","index$":4}},"id":{"field":"id","name":"id"},"name":"public_v1_webhook","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/webhooks","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/webhooks","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/webhooks","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/webhooks","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/webhooks/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v1/webhooks/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"v1"},{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"public_v1_webhook","name__orig":"public_v1_webhook","Name":"PublicV1Webhook","name_":"public_v1_webhook","name-":"public-v1-webhook","NAME":"PUBLIC_V1_WEBHOOK","index$":12}, {"active":true,"entity":"public_v1_webhook","key$":"BasicPublicV1WebhookFlow","kind":"basic","name":"BasicPublicV1WebhookFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"public_v1_webhook_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"public_v1_webhook_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"public_v1_webhook_ref01","suffix":"_rm0"},"m":{"id":"public_v1_webhook01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"public_v1_webhook_ref01"}}],"index$":3}]}, 'PublicV1Webhook', {"POST /v1/webhooks":{"protocol":"http","operationId":"createWebhook","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["url","inbox"],"properties":{"url":{"type":"string","format":"uri","description":"The HTTPS URL to receive the POST request.","example":"https://your-server.com/callback","key$":"url"},"inbox":{"type":"string","format":"email","description":"The registered inbox to subscribe to.","example":"target@domain.com","key$":"inbox"}},"index$":1}}}},"responses":{"201":{"description":"Webhook registered","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":true},"id":{"type":"string"},"inbox":{"type":"string"},"url":{"type":"string"}}}}}},"400":{"description":"Missing fields"},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["unauthorized","key_revoked"]},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error401"}}},"x-ref":"#/components/responses/Unauthorized"},"403":{"description":"Inbox not owned or plan too low","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["plan_required","plan_restriction","domain_not_verified","domain_not_found"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true}},"x-ref":"#/components/schemas/Error403Plan"}}}},"429":{"description":"Rate limit exceeded (per-second or monthly quota)","headers":{"Retry-After":{"schema":{"type":"integer","description":"Seconds to wait before retrying"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["rate_limit_exceeded","monthly_quota_exceeded"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true},"credits_url":{"type":"string","format":"uri","nullable":true},"hint":{"type":"string","nullable":true}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key","description":"API key as query parameter (alternative to Bearer header)"}}},"GET /v1/webhooks":{"protocol":"http","operationId":"listWebhooks","responses":{"200":{"description":"Success","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"example":true,"key$":"success","type":"boolean"},"count":{"example":1,"key$":"count","type":"integer"},"data":{"items":{"properties":{"_id":{"type":"string","key$":"_id"},"createdAt":{"format":"date-time","type":"string","key$":"createdAt"},"failureCount":{"type":"integer","key$":"failureCount"},"inbox":{"type":"string","key$":"inbox"},"url":{"type":"string","key$":"url"}},"type":"object","index$":0},"key$":"data","type":"array"}}}}}},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["unauthorized","key_revoked"]},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error401"}}},"x-ref":"#/components/responses/Unauthorized"},"403":{"description":"Plan too low","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["plan_required","plan_restriction","domain_not_verified","domain_not_found"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true}},"x-ref":"#/components/schemas/Error403Plan"}}}},"429":{"description":"Rate limit exceeded (per-second or monthly quota)","headers":{"Retry-After":{"schema":{"type":"integer","description":"Seconds to wait before retrying"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["rate_limit_exceeded","monthly_quota_exceeded"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true},"credits_url":{"type":"string","format":"uri","nullable":true},"hint":{"type":"string","nullable":true}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key","description":"API key as query parameter (alternative to Bearer header)"}}},"DELETE /v1/webhooks/{id}":{"protocol":"http","operationId":"deleteWebhook","responses":{"200":{"description":"Webhook unregistered","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":true},"message":{"type":"string"}}}}}},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["unauthorized","key_revoked"]},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error401"}}},"x-ref":"#/components/responses/Unauthorized"},"403":{"description":"Plan too low","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["plan_required","plan_restriction","domain_not_verified","domain_not_found"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true}},"x-ref":"#/components/schemas/Error403Plan"}}}},"404":{"description":"Webhook not found"},"429":{"description":"Rate limit exceeded (per-second or monthly quota)","headers":{"Retry-After":{"schema":{"type":"integer","description":"Seconds to wait before retrying"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["rate_limit_exceeded","monthly_quota_exceeded"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true},"credits_url":{"type":"string","format":"uri","nullable":true},"hint":{"type":"string","nullable":true}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":0}],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key","description":"API key as query parameter (alternative to Bearer header)"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const public_v1_webhook_ref01_ent = client.PublicV1Webhook()
    let public_v1_webhook_ref01_data = setup.data.new.public_v1_webhook['public_v1_webhook_ref01']

    public_v1_webhook_ref01_data = (await public_v1_webhook_ref01_ent.create(public_v1_webhook_ref01_data)).data()
    assert(null != public_v1_webhook_ref01_data.id)


    // LIST
    const public_v1_webhook_ref01_match: any = {}

    const public_v1_webhook_ref01_list = (await public_v1_webhook_ref01_ent.list(public_v1_webhook_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(public_v1_webhook_ref01_list, { id: public_v1_webhook_ref01_data.id })))


    // REMOVE
    const public_v1_webhook_ref01_match_rm0: any = { id: public_v1_webhook_ref01_data.id }
    await public_v1_webhook_ref01_ent.remove(public_v1_webhook_ref01_match_rm0)
  

    // LIST
    const public_v1_webhook_ref01_match_rt0: any = {}

    const public_v1_webhook_ref01_list_rt0 = (await public_v1_webhook_ref01_ent.list(public_v1_webhook_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(public_v1_webhook_ref01_list_rt0, { id: public_v1_webhook_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/public_v1_webhook/PublicV1WebhookTestData.json')

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
    ['public_v1_webhook01','public_v1_webhook02','public_v1_webhook03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID': idmap,
    'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
    'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
    'CUSTOM_TEMP_MAIL_APIKEY': '',
  })

  idmap = env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID']

  const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID']
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
  
