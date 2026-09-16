# CustomTempMail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module CustomTempMailFeatures
  def self.make_feature(name)
    case name
    when "base"
      CustomTempMailBaseFeature.new
    when "ratelimit"
      CustomTempMailRatelimitFeature.new
    when "retry"
      CustomTempMailRetryFeature.new
    when "test"
      CustomTempMailTestFeature.new
    when "timeout"
      CustomTempMailTimeoutFeature.new
    else
      CustomTempMailBaseFeature.new
    end
  end
end
