

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


describe('PlanEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('CUSTOM_TEMP_MAIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = CustomTempMailSDK.test()
    const ent = testsdk.Plan()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'plan.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"credit_packages":{"a":true,"h":"Credit Packages","n":"credit_packages","r":false,"t":"`$ARRAY`","key$":"credit_packages","index$":0},"plans":{"a":true,"h":"Plans","n":"plans","r":false,"t":"`$ARRAY`","key$":"plans","index$":1}},"name":"plan","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/plans","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/plans","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"plans"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"plan","name__orig":"plan","Name":"Plan","name_":"plan","name-":"plan","NAME":"PLAN","index$":8}, {"active":true,"entity":"plan","key$":"BasicPlanFlow","kind":"basic","name":"BasicPlanFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"plan_ref01","srcdatavar":"plan_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-plan_ref01"}}],"index$":0}]}, 'Plan', {"GET /v1/plans":{"protocol":"http","operationId":"getPlans","responses":{"200":{"description":"Success","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"example":true,"key$":"success","type":"boolean"},"data":{"key$":"data","properties":{"credit_packages":{"items":{"properties":{"label":{"type":"string"},"price_usd":{"type":"integer"},"requests":{"type":"integer"}},"type":"object"},"type":"array","key$":"credit_packages"},"plans":{"items":{"properties":{"features":{"properties":{"attachments":{"type":"boolean"},"custom_domains":{"type":"boolean"},"max_attachment_size_mb":{"type":"integer"},"max_ws_connections":{"type":"integer"},"otp_extraction":{"type":"boolean"},"websocket":{"type":"boolean"}},"type":"object","x-ref":"#/components/schemas/PlanFeatures"},"label":{"type":"string"},"name":{"type":"string"},"price_usd":{"type":"integer"},"requests_per_month":{"type":"integer"},"requests_per_second":{"type":"integer"}},"type":"object"},"type":"array","key$":"plans"}},"type":"object","index$":0}},"x-ref":"#/components/schemas/PlansResponse"}}}}},"parameters":[],"security":[],"securitySource":"operation","securitySchemes":{"BearerAuth":{"type":"http","scheme":"bearer","bearerFormat":"JWT","description":"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)"},"ApiKeyQuery":{"type":"apiKey","in":"query","name":"api_key","description":"API key as query parameter (alternative to Bearer header)"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let plan_ref01_data = Object.values(setup.data.existing.plan)[0] as any

    // LOAD
    const plan_ref01_ent = client.Plan()
    const plan_ref01_match_dt0: any = {}
    const plan_ref01_data_dt0 = (await plan_ref01_ent.load(plan_ref01_match_dt0)).data()
    assert(null != plan_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/plan/PlanTestData.json')

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
    ['plan01','plan02','plan03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CUSTOM_TEMP_MAIL_TEST_PLAN_ENTID': idmap,
    'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
    'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
    'CUSTOM_TEMP_MAIL_APIKEY': '',
  })

  idmap = env['CUSTOM_TEMP_MAIL_TEST_PLAN_ENTID']

  const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_PLAN_ENTID']
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
  
