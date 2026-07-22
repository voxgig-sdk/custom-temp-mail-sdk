package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCustomDomainEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewCustomDomainVerifyEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewDomainEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewDomainsAllEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewInboxEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewMenEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewMessageEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewOtpEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewPlanEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewPublicV1DashboardAnalyticsEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewPublicV1InboxEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewPublicV1MessageEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewPublicV1WebhookEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

var NewUsageEntityFunc func(client *CustomTempMailSDK, entopts map[string]any) CustomTempMailEntity

