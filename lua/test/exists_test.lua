-- CustomTempMail SDK exists test

local sdk = require("custom-temp-mail_sdk")

describe("CustomTempMailSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
