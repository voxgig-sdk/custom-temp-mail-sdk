-- CustomTempMail SDK error

local CustomTempMailError = {}
CustomTempMailError.__index = CustomTempMailError


function CustomTempMailError.new(code, msg, ctx)
  local self = setmetatable({}, CustomTempMailError)
  self.is_sdk_error = true
  self.sdk = "CustomTempMail"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function CustomTempMailError:error()
  return self.msg
end


function CustomTempMailError:__tostring()
  return self.msg
end


return CustomTempMailError
