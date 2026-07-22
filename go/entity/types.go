// Typed models for the CustomTempMail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// CustomDomain is the typed data model for the custom_domain entity.
type CustomDomain struct {
	AddedAt *string `json:"added_at,omitempty"`
	Data map[string]any `json:"data"`
	Domain string `json:"domain"`
	Message *string `json:"message,omitempty"`
	MxRecord string `json:"mx_record"`
	Success *bool `json:"success,omitempty"`
	TxtRecord string `json:"txt_record"`
	Verified bool `json:"verified"`
}

// CustomDomainListMatch is the typed request payload for CustomDomain.ListTyped.
type CustomDomainListMatch struct {
	AddedAt *string `json:"added_at,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Message *string `json:"message,omitempty"`
	MxRecord *string `json:"mx_record,omitempty"`
	Success *bool `json:"success,omitempty"`
	TxtRecord *string `json:"txt_record,omitempty"`
	Verified *bool `json:"verified,omitempty"`
}

// CustomDomainCreateData is the typed request payload for CustomDomain.CreateTyped.
type CustomDomainCreateData struct {
	AddedAt *string `json:"added_at,omitempty"`
	Data map[string]any `json:"data"`
	Domain string `json:"domain"`
	Message *string `json:"message,omitempty"`
	MxRecord string `json:"mx_record"`
	Success *bool `json:"success,omitempty"`
	TxtRecord string `json:"txt_record"`
	Verified bool `json:"verified"`
}

// CustomDomainRemoveMatch is the typed request payload for CustomDomain.RemoveTyped.
type CustomDomainRemoveMatch struct {
	Id string `json:"id"`
}

// CustomDomainVerify is the typed data model for the custom_domain_verify entity.
type CustomDomainVerify struct {
	Data map[string]any `json:"data"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
	Verified *bool `json:"verified,omitempty"`
}

// CustomDomainVerifyCreateData is the typed request payload for CustomDomainVerify.CreateTyped.
type CustomDomainVerifyCreateData struct {
	Domain string `json:"domain"`
}

// Domain is the typed data model for the domain entity.
type Domain struct {
	Domain string `json:"domain"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ExpiresInDay *int `json:"expires_in_day,omitempty"`
	ExpiringSoon *bool `json:"expiring_soon,omitempty"`
	Tag []any `json:"tag"`
	Tier string `json:"tier"`
}

// DomainListMatch is the typed request payload for Domain.ListTyped.
type DomainListMatch struct {
	Domain *string `json:"domain,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ExpiresInDay *int `json:"expires_in_day,omitempty"`
	ExpiringSoon *bool `json:"expiring_soon,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Tier *string `json:"tier,omitempty"`
}

// DomainsAll is the typed data model for the domains_all entity.
type DomainsAll struct {
	Domain string `json:"domain"`
	Expired bool `json:"expired"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ExpiresInDay *int `json:"expires_in_day,omitempty"`
	ExpiringSoon *bool `json:"expiring_soon,omitempty"`
	Tag []any `json:"tag"`
	Tier string `json:"tier"`
}

// DomainsAllListMatch is the typed request payload for DomainsAll.ListTyped.
type DomainsAllListMatch struct {
	Domain *string `json:"domain,omitempty"`
	Expired *bool `json:"expired,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ExpiresInDay *int `json:"expires_in_day,omitempty"`
	ExpiringSoon *bool `json:"expiring_soon,omitempty"`
	Tag *[]any `json:"tag,omitempty"`
	Tier *string `json:"tier,omitempty"`
}

// Inbox is the typed data model for the inbox entity.
type Inbox struct {
	Data *map[string]any `json:"data,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	IsTesting *bool `json:"is_testing,omitempty"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// InboxLoadMatch is the typed request payload for Inbox.LoadTyped.
type InboxLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	IsTesting *bool `json:"is_testing,omitempty"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// InboxCreateData is the typed request payload for Inbox.CreateTyped.
type InboxCreateData struct {
	Data *map[string]any `json:"data,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	IsTesting *bool `json:"is_testing,omitempty"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Men is the typed data model for the men entity.
type Men struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// MenLoadMatch is the typed request payload for Men.LoadTyped.
type MenLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// Message is the typed data model for the message entity.
type Message struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// MessageLoadMatch is the typed request payload for Message.LoadTyped.
type MessageLoadMatch struct {
	InboxId string `json:"inbox_id"`
	Id *string `json:"id,omitempty"`
}

// Otp is the typed data model for the otp entity.
type Otp struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// OtpLoadMatch is the typed request payload for Otp.LoadTyped.
type OtpLoadMatch struct {
	InboxId string `json:"inbox_id"`
}

// Plan is the typed data model for the plan entity.
type Plan struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// PlanLoadMatch is the typed request payload for Plan.LoadTyped.
type PlanLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// PublicV1DashboardAnalytics is the typed data model for the public_v1_dashboard_analytics entity.
type PublicV1DashboardAnalytics struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// PublicV1DashboardAnalyticsLoadMatch is the typed request payload for PublicV1DashboardAnalytics.LoadTyped.
type PublicV1DashboardAnalyticsLoadMatch struct {
	InboxId string `json:"inbox_id"`
}

// PublicV1Inbox is the typed data model for the public_v1_inbox entity.
type PublicV1Inbox struct {
	Count *int `json:"count,omitempty"`
	CustomFirstname *[]any `json:"custom_firstname,omitempty"`
	CustomSurname *[]any `json:"custom_surname,omitempty"`
	DailyLimit *int `json:"daily_limit,omitempty"`
	DailyRemaining *int `json:"daily_remaining,omitempty"`
	DailyUsed *int `json:"daily_used,omitempty"`
	Data *map[string]any `json:"data,omitempty"`
	Domain *[]any `json:"domain,omitempty"`
	DomainMode *string `json:"domain_mode,omitempty"`
	Inbox *[]any `json:"inbox,omitempty"`
	OutputFormat *string `json:"output_format,omitempty"`
	ParseCode *bool `json:"parse_code,omitempty"`
	Since *int `json:"since,omitempty"`
	Success *bool `json:"success,omitempty"`
	TestId *string `json:"test_id,omitempty"`
	UsernameStyle *string `json:"username_style,omitempty"`
}

// PublicV1InboxCreateData is the typed request payload for PublicV1Inbox.CreateTyped.
type PublicV1InboxCreateData struct {
	InboxId *string `json:"inbox_id,omitempty"`
}

// PublicV1InboxRemoveMatch is the typed request payload for PublicV1Inbox.RemoveTyped.
type PublicV1InboxRemoveMatch struct {
	Id string `json:"id"`
}

// PublicV1Message is the typed data model for the public_v1_message entity.
type PublicV1Message struct {
	Data *map[string]any `json:"data,omitempty"`
	Message *string `json:"message,omitempty"`
	Success *bool `json:"success,omitempty"`
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
	CreatedAt *string `json:"created_at,omitempty"`
	FailureCount *int `json:"failure_count,omitempty"`
	Id *string `json:"id,omitempty"`
	Inbox string `json:"inbox"`
	Url string `json:"url"`
}

// PublicV1WebhookListMatch is the typed request payload for PublicV1Webhook.ListTyped.
type PublicV1WebhookListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	FailureCount *int `json:"failure_count,omitempty"`
	Id *string `json:"id,omitempty"`
	Inbox *string `json:"inbox,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PublicV1WebhookCreateData is the typed request payload for PublicV1Webhook.CreateTyped.
type PublicV1WebhookCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	FailureCount *int `json:"failure_count,omitempty"`
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
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
}

// UsageLoadMatch is the typed request payload for Usage.LoadTyped.
type UsageLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Success *bool `json:"success,omitempty"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
