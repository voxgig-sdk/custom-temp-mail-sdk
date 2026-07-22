# CustomTempMail SDK utility: make_context
require_relative '../core/context'
module CustomTempMailUtilities
  MakeContext = ->(ctxmap, basectx) {
    CustomTempMailContext.new(ctxmap, basectx)
  }
end
