

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


describe('CustomDomainVerifyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOM_TEMP_MAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomTempMailSDK.test()
    const ent = testsdk.CustomDomainVerify()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'custom_domain_verify.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"added_at":{"a":true,"fo":"date-time","h":"Added At","n":"added_at","r":false,"sh":"ISO 8601 timestamp when the domain was added.","t":"`$STRING`","key$":"added_at","index$":0},"domain":{"a":true,"h":"Domain","n":"domain","r":true,"sh":"Bare domain name (no leading @).","t":"`$STRING`","key$":"domain","index$":1},"mx_record":{"a":true,"h":"Mx Record","n":"mx_record","r":true,"sh":"The MX record value to add at your registrar.","t":"`$STRING`","key$":"mx_record","index$":2},"txt_record":{"a":true,"h":"Txt Record","n":"txt_record","r":true,"sh":"The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.","t":"`$STRING`","key$":"txt_record","index$":3},"verified":{"a":true,"h":"Verified","n":"verified","r":true,"sh":"`true` — MX and TXT records confirmed.","t":"`$BOOLEAN`","key$":"verified","index$":4}},"name":"custom_domain_verify","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/custom-domains/{domain}/verify","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"mail.acme.com","k":"param","n":"domain","or":"domain","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/custom-domains/{domain}/verify","q":{"exist":["domain"]},"r":{},"s":[{"lit":"v1"},{"lit":"custom-domains"},{"var":"domain"},{"lit":"verify"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.custom_domain"]]},"key$":"custom_domain_verify","name__orig":"custom_domain_verify","Name":"CustomDomainVerify","name_":"custom_domain_verify","name-":"custom-domain-verify","NAME":"CUSTOM_DOMAIN_VERIFY","index$":1}, {"active":true,"entity":"custom_domain_verify","key$":"BasicCustomDomainVerifyFlow","kind":"basic","name":"BasicCustomDomainVerifyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"custom_domain_verify_ref01"},"m":{"domain":"domain01"},"o":"create","s":[],"v":[],"index$":0}]}, 'CustomDomainVerify', {"POST /v1/custom-domains/{domain}/verify":{"protocol":"http","operationId":"verifyCustomDomain","responses":{"200":{"description":"Verification succeeded (or domain was already verified)","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":true},"verified":{"type":"boolean","example":true},"message":{"type":"string","example":"Domain \"mail.acme.com\" verified successfully. You can now register inboxes at @mail.acme.com."},"data":{"type":"object","required":["domain","verified","mx_record","txt_record"],"description":"A custom domain added to your account.","properties":{"domain":{"description":"Bare domain name (no leading @).","example":"mail.acme.com","type":"string","key$":"domain"},"verified":{"description":"`true` — MX and TXT records confirmed. Inboxes can be registered.\n`false` — DNS records not yet verified. Call the verify endpoint.\n","example":true,"type":"boolean","key$":"verified"},"mx_record":{"description":"The MX record value to add at your registrar.","example":"mx.freecustom.email","type":"string","key$":"mx_record"},"txt_record":{"description":"The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.","example":"freecustomemail-verification=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4","type":"string","key$":"txt_record"},"added_at":{"description":"ISO 8601 timestamp when the domain was added.","example":"2026-01-15T10:00:00.000Z","format":"date-time","nullable":true,"type":"string","key$":"added_at"}},"x-ref":"#/components/schemas/CustomDomainEntry","index$":0}},"x-ref":"#/components/schemas/CustomDomainVerifyResponse"},"examples":{"verified":{"summary":"Verification succeeded","value":{"success":true,"verified":true,"message":"Domain \"mail.acme.com\" verified successfully. You can now register inboxes at @mail.acme.com.","data":{"domain":"mail.acme.com","verified":true,"mx_record":"mx.freecustom.email","txt_record":"freecustomemail-verification=a1b2c3d4e5f6..."}}},"already_verified":{"summary":"Already verified","value":{"success":true,"verified":true,"message":"Domain is already verified."}}}}}},"401":{"description":"Missing or invalid API key","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["unauthorized","key_revoked"]},"message":{"type":"string"}},"x-ref":"#/components/schemas/Error401"}}},"x-ref":"#/components/responses/Unauthorized"},"403":{"description":"Plan too low","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["plan_required","plan_restriction","domain_not_verified","domain_not_found"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true}},"x-ref":"#/components/schemas/Error403Plan"}}}},"404":{"description":"Domain not found — add it first via POST /v1/custom-domains","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","example":"domain_not_found"},"message":{"type":"string","example":"\"mail.acme.com\" not found. Add it first via POST /v1/custom-domains."}}}}}},"422":{"description":"Verification failed — DNS records not yet found or not propagated","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"verified":{"type":"boolean","example":false},"error":{"type":"string","example":"verification_failed"},"message":{"type":"string","description":"Which specific record was not found.","example":"TXT record \"freecustomemail-verification=...\" not found."},"hint":{"type":"string","example":"DNS propagation can take up to 48 hours."},"dns_records_needed":{"type":"array","description":"The records that must be present for verification to pass.","items":{"type":"object","required":["type","hostname","value","ttl"],"description":"A DNS record to add at your registrar.","properties":{"type":{"type":"string","enum":["MX","TXT"],"example":"MX"},"hostname":{"type":"string","description":"The DNS hostname / host field. `@` means the root of the domain.","example":"@"},"value":{"type":"string","description":"The record value to enter in your DNS panel.","example":"mx.freecustom.email"},"priority":{"type":"string","description":"MX priority. Only present for MX records.","example":"10","nullable":true},"ttl":{"type":"string","description":"Recommended TTL setting.","example":"Auto"}},"x-ref":"#/components/schemas/DnsRecord"}}},"x-ref":"#/components/schemas/CustomDomainVerifyFailedResponse"},"examples":{"missing_txt":{"summary":"TXT record not found","value":{"success":false,"verified":false,"error":"verification_failed","message":"TXT record \"freecustomemail-verification=a1b2c3d4e5f6...\" not found.","hint":"DNS propagation can take up to 48 hours.","dns_records_needed":[{"type":"MX","hostname":"@","value":"mx.freecustom.email","priority":"10"},{"type":"TXT","hostname":"@","value":"freecustomemail-verification=a1b2c3d4e5f6..."}]}},"missing_both":{"summary":"Both records not found","value":{"success":false,"verified":false,"error":"verification_failed","message":"MX \"mx.freecustom.email\" and TXT \"freecustomemail-verification=a1b2c3d4e5f6...\" not found.","hint":"DNS propagation can take up to 48 hours.","dns_records_needed":[{"type":"MX","hostname":"@","value":"mx.freecustom.email","priority":"10"},{"type":"TXT","hostname":"@","value":"freecustomemail-verification=a1b2c3d4e5f6..."}]}}}}}},"429":{"description":"Rate limit exceeded (per-second or monthly quota)","headers":{"Retry-After":{"schema":{"type":"integer","description":"Seconds to wait before retrying"}}},"content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","enum":["rate_limit_exceeded","monthly_quota_exceeded"]},"message":{"type":"string"},"upgrade_url":{"type":"string","format":"uri","nullable":true},"credits_url":{"type":"string","format":"uri","nullable":true},"hint":{"type":"string","nullable":true}},"x-ref":"#/components/schemas/Error429"}}},"x-ref":"#/components/responses/RateLimited"}},"parameters":[{"name":"domain","in":"path","required":true,"description":"The bare domain name to verify (e.g. `mail.acme.com`).","schema":{"type":"string","example":"mail.acme.com"},"index$":0}],"security":[{"BearerAuth":[]}],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key","description":"API key as query parameter (alternative to Bearer header)"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const custom_domain_verify_ref01_ent = client.CustomDomainVerify()
    let custom_domain_verify_ref01_data = setup.data.new.custom_domain_verify['custom_domain_verify_ref01']
    custom_domain_verify_ref01_data['domain'] = setup.idmap['domain01']

    custom_domain_verify_ref01_data = (await custom_domain_verify_ref01_ent.create(custom_domain_verify_ref01_data)).data()
    assert(null != custom_domain_verify_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/custom_domain_verify/CustomDomainVerifyTestData.json')

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
    ['custom_domain_verify01','custom_domain_verify02','custom_domain_verify03','custom_domain01','custom_domain02','custom_domain03','domain01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID': idmap,
    'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
    'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
    'CUSTOM_TEMP_MAIL_APIKEY': '',
  })

  idmap = env['CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID']

  const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID']
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
  
