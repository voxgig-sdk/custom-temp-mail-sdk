
import { Context } from './Context'


class CustomTempMailError extends Error {

  isCustomTempMailError = true

  sdk = 'CustomTempMail'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  CustomTempMailError
}

