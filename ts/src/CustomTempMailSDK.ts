// CustomTempMail Ts SDK

import { CustomDomainEntity } from './entity/CustomDomainEntity'
import { CustomDomainVerifyEntity } from './entity/CustomDomainVerifyEntity'
import { DomainEntity } from './entity/DomainEntity'
import { DomainsAllEntity } from './entity/DomainsAllEntity'
import { InboxEntity } from './entity/InboxEntity'
import { MenEntity } from './entity/MenEntity'
import { MessageEntity } from './entity/MessageEntity'
import { OtpEntity } from './entity/OtpEntity'
import { PlanEntity } from './entity/PlanEntity'
import { PublicV1DashboardAnalyticsEntity } from './entity/PublicV1DashboardAnalyticsEntity'
import { PublicV1InboxEntity } from './entity/PublicV1InboxEntity'
import { PublicV1MessageEntity } from './entity/PublicV1MessageEntity'
import { PublicV1WebhookEntity } from './entity/PublicV1WebhookEntity'
import { UsageEntity } from './entity/UsageEntity'

export type * from './CustomTempMailTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { CustomTempMailEntityBase } from './CustomTempMailEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class CustomTempMailSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  // Entity access: `client.CustomDomain().list()` / `client.CustomDomain().load({ id })`.
  CustomDomain(data?: any) {
    const self = this
    return new CustomDomainEntity(self,data)
  }


  // Entity access: `client.CustomDomainVerify().list()` / `client.CustomDomainVerify().load({ id })`.
  CustomDomainVerify(data?: any) {
    const self = this
    return new CustomDomainVerifyEntity(self,data)
  }


  // Entity access: `client.Domain().list()` / `client.Domain().load({ id })`.
  Domain(data?: any) {
    const self = this
    return new DomainEntity(self,data)
  }


  // Entity access: `client.DomainsAll().list()` / `client.DomainsAll().load({ id })`.
  DomainsAll(data?: any) {
    const self = this
    return new DomainsAllEntity(self,data)
  }


  // Entity access: `client.Inbox().list()` / `client.Inbox().load({ id })`.
  Inbox(data?: any) {
    const self = this
    return new InboxEntity(self,data)
  }


  // Entity access: `client.Men().list()` / `client.Men().load({ id })`.
  Men(data?: any) {
    const self = this
    return new MenEntity(self,data)
  }


  // Entity access: `client.Message().list()` / `client.Message().load({ id })`.
  Message(data?: any) {
    const self = this
    return new MessageEntity(self,data)
  }


  // Entity access: `client.Otp().list()` / `client.Otp().load({ id })`.
  Otp(data?: any) {
    const self = this
    return new OtpEntity(self,data)
  }


  // Entity access: `client.Plan().list()` / `client.Plan().load({ id })`.
  Plan(data?: any) {
    const self = this
    return new PlanEntity(self,data)
  }


  // Entity access: `client.PublicV1DashboardAnalytics().list()` / `client.PublicV1DashboardAnalytics().load({ id })`.
  PublicV1DashboardAnalytics(data?: any) {
    const self = this
    return new PublicV1DashboardAnalyticsEntity(self,data)
  }


  // Entity access: `client.PublicV1Inbox().list()` / `client.PublicV1Inbox().load({ id })`.
  PublicV1Inbox(data?: any) {
    const self = this
    return new PublicV1InboxEntity(self,data)
  }


  // Entity access: `client.PublicV1Message().list()` / `client.PublicV1Message().load({ id })`.
  PublicV1Message(data?: any) {
    const self = this
    return new PublicV1MessageEntity(self,data)
  }


  // Entity access: `client.PublicV1Webhook().list()` / `client.PublicV1Webhook().load({ id })`.
  PublicV1Webhook(data?: any) {
    const self = this
    return new PublicV1WebhookEntity(self,data)
  }


  // Entity access: `client.Usage().list()` / `client.Usage().load({ id })`.
  Usage(data?: any) {
    const self = this
    return new UsageEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new CustomTempMailSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return CustomTempMailSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'CustomTempMail' }
  }

  toString() {
    return 'CustomTempMail ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = CustomTempMailSDK


export {
  stdutil,
  config,

  BaseFeature,
  CustomTempMailEntityBase,

  CustomTempMailSDK,
  SDK,
}


