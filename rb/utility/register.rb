# CustomTempMail SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CustomTempMailUtility.registrar = ->(u) {
  u.clean = CustomTempMailUtilities::Clean
  u.done = CustomTempMailUtilities::Done
  u.make_error = CustomTempMailUtilities::MakeError
  u.feature_add = CustomTempMailUtilities::FeatureAdd
  u.feature_hook = CustomTempMailUtilities::FeatureHook
  u.feature_init = CustomTempMailUtilities::FeatureInit
  u.fetcher = CustomTempMailUtilities::Fetcher
  u.make_fetch_def = CustomTempMailUtilities::MakeFetchDef
  u.make_context = CustomTempMailUtilities::MakeContext
  u.make_options = CustomTempMailUtilities::MakeOptions
  u.make_request = CustomTempMailUtilities::MakeRequest
  u.make_response = CustomTempMailUtilities::MakeResponse
  u.make_result = CustomTempMailUtilities::MakeResult
  u.make_point = CustomTempMailUtilities::MakePoint
  u.make_spec = CustomTempMailUtilities::MakeSpec
  u.make_url = CustomTempMailUtilities::MakeUrl
  u.param = CustomTempMailUtilities::Param
  u.prepare_auth = CustomTempMailUtilities::PrepareAuth
  u.prepare_body = CustomTempMailUtilities::PrepareBody
  u.prepare_headers = CustomTempMailUtilities::PrepareHeaders
  u.prepare_method = CustomTempMailUtilities::PrepareMethod
  u.prepare_params = CustomTempMailUtilities::PrepareParams
  u.prepare_path = CustomTempMailUtilities::PreparePath
  u.prepare_query = CustomTempMailUtilities::PrepareQuery
  u.result_basic = CustomTempMailUtilities::ResultBasic
  u.result_body = CustomTempMailUtilities::ResultBody
  u.result_headers = CustomTempMailUtilities::ResultHeaders
  u.transform_request = CustomTempMailUtilities::TransformRequest
  u.transform_response = CustomTempMailUtilities::TransformResponse
}
