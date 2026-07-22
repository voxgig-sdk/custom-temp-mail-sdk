# CustomTempMail SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module CustomTempMailFeatures
  def self.make_feature(name)
    case name
    when "base"
      CustomTempMailBaseFeature.new
    when "test"
      CustomTempMailTestFeature.new
    else
      CustomTempMailBaseFeature.new
    end
  end
end
