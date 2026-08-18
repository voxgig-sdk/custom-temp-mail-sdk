// Typed models for the CustomTempMail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/custom-temp-mail-sdk/go/core"
)

// CustomDomain is the typed data model for the custom_domain entity.
type CustomDomain struct {
	AddedAt *string `json:"added_at,omitempty"`
	Domain string `json:"domain"`
	MxRecord string `json:"mx_record"`
	TxtRecord string `json:"txt_record"`
	Verified bool `json:"verified"`
}

// CustomDomainListMatch is the typed request payload for CustomDomain.ListTyped.
type CustomDomainListMatch struct {
	AddedAt *string `json:"added_at,omitempty"`
	Domain *string `json:"domain,omitempty"`
	MxRecord *string `json:"mx_record,omitempty"`
	TxtRecord *string `json:"txt_record,omitempty"`
	Verified *bool `json:"verified,omitempty"`
}

// CustomDomainCreateData is the typed request payload for CustomDomain.CreateTyped.
type CustomDomainCreateData struct {
	AddedAt *string `json:"added_at,omitempty"`
	Domain string `json:"domain"`
	MxRecord string `json:"mx_record"`
	TxtRecord string `json:"txt_record"`
	Verified bool `json:"verified"`
}

// CustomDomainRemoveMatch is the typed request payload for CustomDomain.RemoveTyped.
type CustomDomainRemoveMatch struct {
	Id string `json:"id"`
}

// CustomDomainVerify is the typed data model for the custom_domain_verify entity.
type CustomDomainVerify struct {
	AddedAt *string `json:"added_at,omitempty"`
	Domain string `json:"domain"`
	MxRecord string `json:"mx_record"`
	TxtRecord string `json:"txt_record"`
	Verified bool `json:"verified"`
}

// CustomDomainVerifyCreateData is the typed request payload for CustomDomainVerify.CreateTyped.
type CustomDomainVerifyCreateData struct {
	Domain string `json:"domain"`
	AddedAt *string `json:"added_at,omitempty"`
	MxRecord string `json:"mx_record"`
	TxtRecord string `json:"txt_record"`
	Verified bool `json:"verified"`
}

// Domain is the typed data model for the domain entity.
type Domain struct {
	Domain string `json:"domain"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ExpiresInDays *int `json:"expires_in_days,omitempty"`
	ExpiringSoon *bool `json:"expiring_soon,omitempty"`
	Tags []any `json:"tags"`
	Tier string `json:"tier"`
}

// DomainListMatch is the typed request payload for Domain.ListTyped.
type DomainListMatch struct {
	Domain *string `json:"domain,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ExpiresInDays *int `json:"expires_in_days,omitempty"`
	ExpiringSoon *bool `json:"expiring_soon,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Tier *string `json:"tier,omitempty"`
}

// DomainsAll is the typed data model for the domains_all entity.
type DomainsAll struct {
	Domain string `json:"domain"`
	Expired bool `json:"expired"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ExpiresInDays *int `json:"expires_in_days,omitempty"`
	ExpiringSoon *bool `json:"expiring_soon,omitempty"`
	Tags []any `json:"tags"`
	Tier string `json:"tier"`
}

// DomainsAllListMatch is the typed request payload for DomainsAll.ListTyped.
type DomainsAllListMatch struct {
	Domain *string `json:"domain,omitempty"`
	Expired *bool `json:"expired,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ExpiresInDays *int `json:"expires_in_days,omitempty"`
	ExpiringSoon *bool `json:"expiring_soon,omitempty"`
	Tags *[]any `json:"tags,omitempty"`
	Tier *string `json:"tier,omitempty"`
}

// Inbox is the typed data model for the inbox entity.
type Inbox struct {
	Count *int `json:"count,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	Inboxes *[]any `json:"inboxes,omitempty"`
	IsTesting *bool `json:"isTesting,omitempty"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// InboxLoadMatch is the typed request payload for Inbox.LoadTyped.
type InboxLoadMatch struct {
	Count *int `json:"count,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	Inboxes *[]any `json:"inboxes,omitempty"`
	IsTesting *bool `json:"isTesting,omitempty"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// InboxCreateData is the typed request payload for Inbox.CreateTyped.
type InboxCreateData struct {
	Count *int `json:"count,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	Inboxes *[]any `json:"inboxes,omitempty"`
	IsTesting *bool `json:"isTesting,omitempty"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Men is the typed data model for the men entity.
type Men struct {
	ApiInboxCount *int `json:"api_inbox_count,omitempty"`
	ApiInboxes *[]any `json:"api_inboxes,omitempty"`
	AppInboxCount *int `json:"app_inbox_count,omitempty"`
	AppInboxes *[]any `json:"app_inboxes,omitempty"`
	Credits *int `json:"credits,omitempty"`
	CustomDomainCount *int `json:"custom_domain_count,omitempty"`
	CustomDomains *[]any `json:"custom_domains,omitempty"`
	Features *map[string]any `json:"features,omitempty"`
	Plan *string `json:"plan,omitempty"`
	RateLimits *map[string]any `json:"rate_limits,omitempty"`
}

// MenLoadMatch is the typed request payload for Men.LoadTyped.
type MenLoadMatch struct {
	ApiInboxCount *int `json:"api_inbox_count,omitempty"`
	ApiInboxes *[]any `json:"api_inboxes,omitempty"`
	AppInboxCount *int `json:"app_inbox_count,omitempty"`
	AppInboxes *[]any `json:"app_inboxes,omitempty"`
	Credits *int `json:"credits,omitempty"`
	CustomDomainCount *int `json:"custom_domain_count,omitempty"`
	CustomDomains *[]any `json:"custom_domains,omitempty"`
	Features *map[string]any `json:"features,omitempty"`
	Plan *string `json:"plan,omitempty"`
	RateLimits *map[string]any `json:"rate_limits,omitempty"`
}

// Message is the typed data model for the message entity.
type Message struct {
	Attachments *[]any `json:"attachments,omitempty"`
	Count *int `json:"count,omitempty"`
	Date *string `json:"date,omitempty"`
	From *string `json:"from,omitempty"`
	HasAttachment *bool `json:"has_attachment,omitempty"`
	HasMore *bool `json:"has_more,omitempty"`
	Html *string `json:"html,omitempty"`
	Id *string `json:"id,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Otp *string `json:"otp,omitempty"`
	Subject *string `json:"subject,omitempty"`
	Text *string `json:"text,omitempty"`
	To *string `json:"to,omitempty"`
	VerificationLink *string `json:"verification_link,omitempty"`
}

// MessageLoadMatch is the typed request payload for Message.LoadTyped.
type MessageLoadMatch struct {
	InboxId string `json:"inbox_id"`
	Id *string `json:"id,omitempty"`
}

// Otp is the typed data model for the otp entity.
type Otp struct {
	From *string `json:"from,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	Message *string `json:"message,omitempty"`
	MessageId *string `json:"message_id,omitempty"`
	Otp *string `json:"otp,omitempty"`
	ReceivedAt *string `json:"received_at,omitempty"`
	Score *float64 `json:"score,omitempty"`
	Subject *string `json:"subject,omitempty"`
	VerificationLink *string `json:"verification_link,omitempty"`
}

// OtpLoadMatch is the typed request payload for Otp.LoadTyped.
type OtpLoadMatch struct {
	InboxId string `json:"inbox_id"`
}

// Plan is the typed data model for the plan entity.
type Plan struct {
	CreditPackages *[]any `json:"credit_packages,omitempty"`
	Plans *[]any `json:"plans,omitempty"`
}

// PlanLoadMatch is the typed request payload for Plan.LoadTyped.
type PlanLoadMatch struct {
	CreditPackages *[]any `json:"credit_packages,omitempty"`
	Plans *[]any `json:"plans,omitempty"`
}

// PublicV1DashboardAnalytics is the typed data model for the public_v1_dashboard_analytics entity.
type PublicV1DashboardAnalytics struct {
	AnalyzedAt *string `json:"analyzed_at,omitempty"`
	DurationHours *int `json:"duration_hours,omitempty"`
	EventCount *int `json:"event_count,omitempty"`
	Events *[]any `json:"events,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	Insights *[]any `json:"insights,omitempty"`
}

// PublicV1DashboardAnalyticsLoadMatch is the typed request payload for PublicV1DashboardAnalytics.LoadTyped.
type PublicV1DashboardAnalyticsLoadMatch struct {
	InboxId string `json:"inbox_id"`
}

// PublicV1Inbox is the typed data model for the public_v1_inbox entity.
type PublicV1Inbox struct {
	Count *int `json:"count,omitempty"`
	CustomFirstnames *[]any `json:"custom_firstnames,omitempty"`
	CustomSurnames *[]any `json:"custom_surnames,omitempty"`
	DailyLimit *int `json:"daily_limit,omitempty"`
	DailyRemaining *int `json:"daily_remaining,omitempty"`
	DailyUsed *int `json:"daily_used,omitempty"`
	DomainMode *string `json:"domain_mode,omitempty"`
	Domains *[]any `json:"domains,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	Inboxes *[]any `json:"inboxes,omitempty"`
	OutputFormat *string `json:"output_format,omitempty"`
	ParseCode *bool `json:"parseCode,omitempty"`
	Since *int `json:"since,omitempty"`
	StartedAt *string `json:"started_at,omitempty"`
	Success *bool `json:"success,omitempty"`
	TestId *string `json:"test_id,omitempty"`
	UsernameStyle *string `json:"username_style,omitempty"`
}

// PublicV1InboxCreateData is the typed request payload for PublicV1Inbox.CreateTyped.
type PublicV1InboxCreateData struct {
	Count *int `json:"count,omitempty"`
	CustomFirstnames *[]any `json:"custom_firstnames,omitempty"`
	CustomSurnames *[]any `json:"custom_surnames,omitempty"`
	DailyLimit *int `json:"daily_limit,omitempty"`
	DailyRemaining *int `json:"daily_remaining,omitempty"`
	DailyUsed *int `json:"daily_used,omitempty"`
	DomainMode *string `json:"domain_mode,omitempty"`
	Domains *[]any `json:"domains,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	Inboxes *[]any `json:"inboxes,omitempty"`
	OutputFormat *string `json:"output_format,omitempty"`
	ParseCode *bool `json:"parseCode,omitempty"`
	Since *int `json:"since,omitempty"`
	StartedAt *string `json:"started_at,omitempty"`
	Success *bool `json:"success,omitempty"`
	TestId *string `json:"test_id,omitempty"`
	UsernameStyle *string `json:"username_style,omitempty"`
}

// PublicV1InboxRemoveMatch is the typed request payload for PublicV1Inbox.RemoveTyped.
type PublicV1InboxRemoveMatch struct {
	Id string `json:"id"`
}

// PublicV1Message is the typed data model for the public_v1_message entity.
type PublicV1Message struct {
	Date *string `json:"date,omitempty"`
	From *string `json:"from,omitempty"`
	HasAttachment *bool `json:"has_attachment,omitempty"`
	Id *string `json:"id,omitempty"`
	Otp *string `json:"otp,omitempty"`
	Subject *string `json:"subject,omitempty"`
	VerificationLink *string `json:"verification_link,omitempty"`
}

// PublicV1MessageLoadMatch is the typed request payload for PublicV1Message.LoadTyped.
type PublicV1MessageLoadMatch struct {
	InboxId string `json:"inbox_id"`
}

// PublicV1MessageRemoveMatch is the typed request payload for PublicV1Message.RemoveTyped.
type PublicV1MessageRemoveMatch struct {
	Id string `json:"id"`
	InboxId string `json:"inbox_id"`
}

// PublicV1Webhook is the typed data model for the public_v1_webhook entity.
type PublicV1Webhook struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	FailureCount *int `json:"failureCount,omitempty"`
	Id *string `json:"id,omitempty"`
	Inbox string `json:"inbox"`
	Url string `json:"url"`
}

// PublicV1WebhookListMatch is the typed request payload for PublicV1Webhook.ListTyped.
type PublicV1WebhookListMatch struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	FailureCount *int `json:"failureCount,omitempty"`
	Id *string `json:"id,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PublicV1WebhookCreateData is the typed request payload for PublicV1Webhook.CreateTyped.
type PublicV1WebhookCreateData struct {
	CreatedAt *string `json:"createdAt,omitempty"`
	FailureCount *int `json:"failureCount,omitempty"`
	Id *string `json:"id,omitempty"`
	Inbox string `json:"inbox"`
	Url string `json:"url"`
}

// PublicV1WebhookRemoveMatch is the typed request payload for PublicV1Webhook.RemoveTyped.
type PublicV1WebhookRemoveMatch struct {
	Id string `json:"id"`
}

// Usage is the typed data model for the usage entity.
type Usage struct {
	Credits *map[string]any `json:"credits,omitempty"`
	Period *map[string]any `json:"period,omitempty"`
	Plan *string `json:"plan,omitempty"`
	RateLimit *map[string]any `json:"rate_limit,omitempty"`
	Requests *map[string]any `json:"requests,omitempty"`
}

// UsageLoadMatch is the typed request payload for Usage.LoadTyped.
type UsageLoadMatch struct {
	Credits *map[string]any `json:"credits,omitempty"`
	Period *map[string]any `json:"period,omitempty"`
	Plan *string `json:"plan,omitempty"`
	RateLimit *map[string]any `json:"rate_limit,omitempty"`
	Requests *map[string]any `json:"requests,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
