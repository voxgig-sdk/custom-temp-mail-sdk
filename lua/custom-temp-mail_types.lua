-- Typed models for the CustomTempMail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CustomDomain
---@field added_at? string
---@field domain string
---@field id? string
---@field mx_record string
---@field txt_record string
---@field verified boolean

---@class CustomDomainListMatch
---@field added_at? string
---@field domain? string
---@field id? string
---@field mx_record? string
---@field txt_record? string
---@field verified? boolean

---@class CustomDomainCreateData
---@field added_at? string
---@field domain string
---@field id? string
---@field mx_record string
---@field txt_record string
---@field verified boolean

---@class CustomDomainRemoveMatch
---@field id string

---@class CustomDomainVerify
---@field added_at? string
---@field domain string
---@field mx_record string
---@field txt_record string
---@field verified boolean

---@class CustomDomainVerifyCreateData
---@field domain string
---@field added_at? string
---@field mx_record string
---@field txt_record string
---@field verified boolean

---@class Domain
---@field domain string
---@field expires_at? string
---@field expires_in_days? number
---@field expiring_soon? boolean
---@field tags table
---@field tier string

---@class DomainListMatch
---@field domain? string
---@field expires_at? string
---@field expires_in_days? number
---@field expiring_soon? boolean
---@field tags? table
---@field tier? string

---@class DomainsAll
---@field domain string
---@field expired boolean
---@field expires_at? string
---@field expires_in_days? number
---@field expiring_soon? boolean
---@field tags table
---@field tier string

---@class DomainsAllListMatch
---@field domain? string
---@field expired? boolean
---@field expires_at? string
---@field expires_in_days? number
---@field expiring_soon? boolean
---@field tags? table
---@field tier? string

---@class Inbox
---@field count? number
---@field inbox? string
---@field inboxes? table
---@field isTesting? boolean
---@field message? string
---@field success? boolean

---@class InboxLoadMatch
---@field count? number
---@field inbox? string
---@field inboxes? table
---@field isTesting? boolean
---@field message? string
---@field success? boolean

---@class InboxCreateData
---@field count? number
---@field inbox? string
---@field inboxes? table
---@field isTesting? boolean
---@field message? string
---@field success? boolean

---@class Men
---@field api_inbox_count? number
---@field api_inboxes? table
---@field app_inbox_count? number
---@field app_inboxes? table
---@field credits? number
---@field custom_domain_count? number
---@field custom_domains? table
---@field features? table
---@field plan? string
---@field rate_limits? table

---@class MenLoadMatch
---@field api_inbox_count? number
---@field api_inboxes? table
---@field app_inbox_count? number
---@field app_inboxes? table
---@field credits? number
---@field custom_domain_count? number
---@field custom_domains? table
---@field features? table
---@field plan? string
---@field rate_limits? table

---@class Message
---@field attachments? table
---@field count? number
---@field date? string
---@field from? string
---@field has_attachment? boolean
---@field has_more? boolean
---@field html? string
---@field id? string
---@field inbox? string
---@field messages? table
---@field otp? string
---@field subject? string
---@field text? string
---@field to? string
---@field verification_link? string

---@class MessageLoadMatch
---@field inbox_id string
---@field before? string
---@field limit? number
---@field id? string

---@class Otp
---@field from? string
---@field inbox? string
---@field message? string
---@field message_id? string
---@field otp? string
---@field received_at? string
---@field score? number
---@field subject? string
---@field verification_link? string

---@class OtpLoadMatch
---@field inbox_id string
---@field parse_code? boolean
---@field since? number

---@class Plan
---@field credit_packages? table
---@field plans? table

---@class PlanLoadMatch
---@field credit_packages? table
---@field plans? table

---@class PublicV1DashboardAnalytics
---@field analyzed_at? string
---@field duration_hours? number
---@field event_count? number
---@field events? table
---@field inbox? string
---@field insights? table

---@class PublicV1DashboardAnalyticsLoadMatch
---@field inbox_id string
---@field test_id? string

---@class PublicV1Inbox
---@field count? number
---@field custom_firstnames? table
---@field custom_surnames? table
---@field daily_limit? number
---@field daily_remaining? number
---@field daily_used? number
---@field domain_mode? string
---@field domains? table
---@field id? string
---@field inbox? string
---@field inboxes? table
---@field output_format? string
---@field parseCode? boolean
---@field since? number
---@field started_at? string
---@field success? boolean
---@field test_id? string
---@field username_style? string

---@class PublicV1InboxCreateData
---@field count? number
---@field custom_firstnames? table
---@field custom_surnames? table
---@field daily_limit? number
---@field daily_remaining? number
---@field daily_used? number
---@field domain_mode? string
---@field domains? table
---@field id? string
---@field inbox? string
---@field inboxes? table
---@field output_format? string
---@field parseCode? boolean
---@field since? number
---@field started_at? string
---@field success? boolean
---@field test_id? string
---@field username_style? string

---@class PublicV1InboxRemoveMatch
---@field id string

---@class PublicV1Message
---@field date? string
---@field from? string
---@field has_attachment? boolean
---@field id? string
---@field otp? string
---@field subject? string
---@field verification_link? string

---@class PublicV1MessageLoadMatch
---@field inbox_id string
---@field since? string
---@field timeout? number

---@class PublicV1MessageRemoveMatch
---@field id string
---@field inbox_id string

---@class PublicV1Webhook
---@field createdAt? string
---@field failureCount? number
---@field id? string
---@field inbox string
---@field url string

---@class PublicV1WebhookListMatch
---@field createdAt? string
---@field failureCount? number
---@field id? string
---@field inbox? string
---@field url? string

---@class PublicV1WebhookCreateData
---@field createdAt? string
---@field failureCount? number
---@field id? string
---@field inbox string
---@field url string

---@class PublicV1WebhookRemoveMatch
---@field id string

---@class Usage
---@field credits? table
---@field period? table
---@field plan? string
---@field rate_limit? table
---@field requests? table

---@class UsageLoadMatch
---@field credits? table
---@field period? table
---@field plan? string
---@field rate_limit? table
---@field requests? table

local M = {}

return M
