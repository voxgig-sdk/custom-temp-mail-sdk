package voxgigcustomtempmailsdk

import (
	"github.com/voxgig-sdk/custom-temp-mail-sdk/go/core"
	"github.com/voxgig-sdk/custom-temp-mail-sdk/go/entity"
	"github.com/voxgig-sdk/custom-temp-mail-sdk/go/feature"
	_ "github.com/voxgig-sdk/custom-temp-mail-sdk/go/utility"
)

// Type aliases preserve external API.
type CustomTempMailSDK = core.CustomTempMailSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CustomTempMailEntity = core.CustomTempMailEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CustomTempMailError = core.CustomTempMailError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCustomDomainEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewCustomDomainEntity(client, entopts)
	}
	core.NewCustomDomainVerifyEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewCustomDomainVerifyEntity(client, entopts)
	}
	core.NewDomainEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewDomainEntity(client, entopts)
	}
	core.NewDomainsAllEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewDomainsAllEntity(client, entopts)
	}
	core.NewInboxEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewInboxEntity(client, entopts)
	}
	core.NewMenEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewMenEntity(client, entopts)
	}
	core.NewMessageEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewMessageEntity(client, entopts)
	}
	core.NewOtpEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewOtpEntity(client, entopts)
	}
	core.NewPlanEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewPlanEntity(client, entopts)
	}
	core.NewPublicV1DashboardAnalyticsEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewPublicV1DashboardAnalyticsEntity(client, entopts)
	}
	core.NewPublicV1InboxEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewPublicV1InboxEntity(client, entopts)
	}
	core.NewPublicV1MessageEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewPublicV1MessageEntity(client, entopts)
	}
	core.NewPublicV1WebhookEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewPublicV1WebhookEntity(client, entopts)
	}
	core.NewUsageEntityFunc = func(client *core.CustomTempMailSDK, entopts map[string]any) core.CustomTempMailEntity {
		return entity.NewUsageEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCustomTempMailSDK = core.NewCustomTempMailSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCustomTempMailSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *CustomTempMailSDK  { return NewCustomTempMailSDK(nil) }
func Test() *CustomTempMailSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
