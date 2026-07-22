# CustomTempMail SDK exists test

require "minitest/autorun"
require_relative "../CustomTempMail_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = CustomTempMailSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
