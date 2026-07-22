# CustomTempMail SDK utility: prepare_body
module CustomTempMailUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
