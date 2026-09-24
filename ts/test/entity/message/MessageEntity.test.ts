

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


describe('MessageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOM_TEMP_MAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomTempMailSDK.test()
    const ent = testsdk.Message()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'message.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"attachments":{"a":true,"h":"Attachments","n":"attachments","r":false,"t":"`$ARRAY`","key$":"attachments","index$":0},"count":{"a":true,"h":"Count","n":"count","r":false,"t":"`$INTEGER`","key$":"count","index$":1},"date":{"a":true,"fo":"date-time","h":"Date","n":"date","r":false,"t":"`$STRING`","key$":"date","index$":2},"from":{"a":true,"h":"From","n":"from","r":false,"t":"`$STRING`","key$":"from","index$":3},"has_attachment":{"a":true,"h":"Has Attachment","n":"has_attachment","r":false,"t":"`$BOOLEAN`","key$":"has_attachment","index$":4},"has_more":{"a":true,"h":"Has More","n":"has_more","r":false,"t":"`$BOOLEAN`","key$":"has_more","index$":5},"html":{"a":true,"h":"Html","n":"html","r":false,"t":"`$STRING`","key$":"html","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":7},"inbox":{"a":true,"h":"Inbox","n":"inbox","r":false,"t":"`$STRING`","key$":"inbox","index$":8},"messages":{"a":true,"h":"Messages","n":"messages","r":false,"t":"`$ARRAY`","key$":"messages","index$":9},"otp":{"a":true,"h":"Otp","n":"otp","r":false,"t":"`$STRING`","key$":"otp","index$":10},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"t":"`$STRING`","key$":"subject","index$":11},"text":{"a":true,"h":"Text","n":"text","r":false,"t":"`$STRING`","key$":"text","index$":12},"to":{"a":true,"h":"To","n":"to","r":false,"t":"`$STRING`","key$":"to","index$":13},"verification_link":{"a":true,"h":"Verification Link","n":"verification_link","r":false,"t":"`$STRING`","key$":"verification_link","index$":14}},"id":{"field":"id","name":"id"},"name":"message","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/inboxes/{inbox}/messages","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"inbox_id","or":"inbox","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"before","or":"before","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v1/inboxes/{inbox}/messages","q":{"exist":["before","inbox_id","limit"]},"r":{"param":{"inbox":"inbox_id"}},"s":[{"lit":"v1"},{"lit":"inboxes"},{"var":"inbox_id"},{"lit":"messages"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /v1/inboxes/{inbox}/messages/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"inbox_id","or":"inbox","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/inboxes/{inbox}/messages/{id}","q":{"exist":["id","inbox_id"]},"r":{"param":{"inbox":"inbox_id"}},"s":[{"lit":"v1"},{"lit":"inboxes"},{"var":"inbox_id"},{"lit":"messages"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.inbox"]]},"key$":"message","name__orig":"message","Name":"Message","name_":"message","name-":"message","NAME":"MESSAGE","index$":6}, {"active":true,"entity":"message","key$":"BasicMessageFlow","kind":"basic","name":"BasicMessageFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"message_ref01","srcdatavar":"message_ref01_data","suffix":"_dt0"},"m":{"id":"message01","inbox_id":"inbox01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-message_ref01"}}],"index$":0}]}, 'Message', {"GET /v1/inboxes/{inbox}/messages":{"protocol":"http","operationId":"listMessages","responses":{"200":{"description":"Success","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"example":true,"key$":"success","type":"boolean"},"data":{"key$":"data","properties":{"count":{"type":"integer","key$":"count"},"has_more":{"type":"boolean","key$":"has_more"},"inbox":{"type":"string","key$":"inbox"},"messages":{"items":{"properties":{"date":{"format":"date-time","type":"string"},"from":{"type":"string"},"has_attachment":{"type":"boolean"},"id":{"type":"string"},"otp":{"description":"The extracted OTP code, or `__DETECTED__` on plans below Growth\n(upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value).\n","nullable":true,"type":"string"},"subject":{"type":"string"},"verification_link":{"nullable":true,"type":"string"}},"type":"object","x-ref":"#/components/schemas/MessageSummary"},"type":"array","key$":"messages"}},"type":"object","index$":0}},"x-ref":"#/components/schemas/MessagesListResponse"}}}},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["unauthorized","key_revoked"]},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error401"}}},"x-ref":"#/components/responses/Unauthorized"},"403":{"description":"Inbox not registered to this account","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","example":"forbidden"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error403Forbidden"}}}},"429":{"description":"Rate limit exceeded (per-second or monthly quota)","headers":{"Retry-After":{"schema":{"type":"integer","description":"Seconds to wait before retrying"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["rate_limit_exceeded","monthly_quota_exceeded"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true},"credits_url":{"type":"string","format":"uri","nullable":true},"hint":{"type":"string","nullable":true}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"inbox","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","schema":{"type":"integer","default":20,"maximum":100},"index$":1},{"name":"before","in":"query","description":"Message ID — returns messages older than this","schema":{"type":"string"},"index$":2}],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key","description":"API key as query parameter (alternative to Bearer header)"}}},"GET /v1/inboxes/{inbox}/messages/{id}":{"protocol":"http","operationId":"getMessage","responses":{"200":{"description":"Success","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":true},"data":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"from":{"type":"string","key$":"from"},"to":{"type":"string","key$":"to"},"subject":{"type":"string","key$":"subject"},"date":{"type":"string","format":"date-time","key$":"date"},"html":{"type":"string","nullable":true,"key$":"html"},"text":{"type":"string","nullable":true,"key$":"text"},"otp":{"type":"string","nullable":true,"key$":"otp"},"verification_link":{"type":"string","nullable":true,"key$":"verification_link"},"has_attachment":{"type":"boolean","key$":"has_attachment"},"attachments":{"type":"array","items":{"type":"object","properties":{"filename":{"type":"string"},"content_type":{"type":"string"},"size_bytes":{"type":"integer"}}},"key$":"attachments"}},"index$":0}},"x-ref":"#/components/schemas/MessageDetailResponse"}}}},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["unauthorized","key_revoked"]},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error401"}}},"x-ref":"#/components/responses/Unauthorized"},"403":{"description":"Forbidden (e.g. inbox not owned by this account)","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","example":"forbidden"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error403Forbidden"}}},"x-ref":"#/components/responses/Forbidden"},"404":{"description":"Message not found","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","example":"not_found"},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error404"}}}},"429":{"description":"Rate limit exceeded (per-second or monthly quota)","headers":{"Retry-After":{"schema":{"type":"integer","description":"Seconds to wait before retrying"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["rate_limit_exceeded","monthly_quota_exceeded"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true},"credits_url":{"type":"string","format":"uri","nullable":true},"hint":{"type":"string","nullable":true}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"inbox","in":"path","required":true,"schema":{"type":"string"},"index$":0},{"name":"id","in":"path","required":true,"schema":{"type":"string"},"index$":1}],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key","description":"API key as query parameter (alternative to Bearer header)"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let message_ref01_data = Object.values(setup.data.existing.message)[0] as any

    // LOAD
    const message_ref01_ent = client.Message()
    const message_ref01_match_dt0: any = {}
    message_ref01_match_dt0.id = message_ref01_data.id
    const message_ref01_data_dt0 = (await message_ref01_ent.load(message_ref01_match_dt0)).data()
    assert(message_ref01_data_dt0.id === message_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/message/MessageTestData.json')

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
    ['message01','message02','message03','inbox01','inbox02','inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOM_TEMP_MAIL_TEST_MESSAGE_ENTID': idmap,
    'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
    'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
    'CUSTOM_TEMP_MAIL_APIKEY': '',
  })

  idmap = env['CUSTOM_TEMP_MAIL_TEST_MESSAGE_ENTID']

  const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_MESSAGE_ENTID']
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
  
