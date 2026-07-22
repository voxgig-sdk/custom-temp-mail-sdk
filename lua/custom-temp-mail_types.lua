-- Typed models for the CustomTempMail SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CustomDomain
---@field added_at? string
---@field data table
---@field domain string
---@field message? string
---@field mx_record string
---@field success? boolean
---@field txt_record string
---@field verified boolean

---@class CustomDomainListMatch
---@field added_at? string
---@field data? table
---@field domain? string
---@field message? string
---@field mx_record? string
---@field success? boolean
---@field txt_record? string
---@field verified? boolean

---@class CustomDomainCreateData
---@field added_at? string
---@field data table
---@field domain string
---@field message? string
---@field mx_record string
---@field success? boolean
---@field txt_record string
---@field verified boolean

---@class CustomDomainRemoveMatch
---@field id string

---@class CustomDomainVerify
---@field data table
---@field message? string
---@field success? boolean
---@field verified? boolean

---@class CustomDomainVerifyCreateData
---@field domain string

---@class Domain
---@field domain string
---@field expires_at? string
---@field expires_in_day? number
---@field expiring_soon? boolean
---@field tag table
---@field tier string

---@class DomainListMatch
---@field domain? string
---@field expires_at? string
---@field expires_in_day? number
---@field expiring_soon? boolean
---@field tag? table
---@field tier? string

---@class DomainsAll
---@field domain string
---@field expired boolean
---@field expires_at? string
---@field expires_in_day? number
---@field expiring_soon? boolean
---@field tag table
---@field tier string

---@class DomainsAllListMatch
---@field domain? string
---@field expired? boolean
---@field expires_at? string
---@field expires_in_day? number
---@field expiring_soon? boolean
---@field tag? table
---@field tier? string

---@class Inbox
---@field data? table
---@field inbox? string
---@field is_testing? boolean
---@field message? string
---@field success? boolean

---@class InboxLoadMatch
---@field data? table
---@field inbox? string
---@field is_testing? boolean
---@field message? string
---@field success? boolean

---@class InboxCreateData
---@field data? table
---@field inbox? string
---@field is_testing? boolean
---@field message? string
---@field success? boolean

---@class Men
---@field data? table
---@field success? boolean

---@class MenLoadMatch
---@field data? table
---@field success? boolean

---@class Message
---@field data? table
---@field success? boolean

---@class MessageLoadMatch
---@field inbox_id string
---@field id? string

---@class Otp
---@field data? table
---@field success? boolean

---@class OtpLoadMatch
---@field inbox_id string

---@class Plan
---@field data? table
---@field success? boolean

---@class PlanLoadMatch
---@field data? table
---@field success? boolean

---@class PublicV1DashboardAnalytics
---@field data? table
---@field success? boolean

---@class PublicV1DashboardAnalyticsLoadMatch
---@field inbox_id string

---@class PublicV1Inbox
---@field count? number
---@field custom_firstname? table
---@field custom_surname? table
---@field daily_limit? number
---@field daily_remaining? number
---@field daily_used? number
---@field data? table
---@field domain? table
---@field domain_mode? string
---@field inbox? table
---@field output_format? string
---@field parse_code? boolean
---@field since? number
---@field success? boolean
---@field test_id? string
---@field username_style? string

---@class PublicV1InboxCreateData
---@field inbox_id? string

---@class PublicV1InboxRemoveMatch
---@field id string

---@class PublicV1Message
---@field data? table
---@field message? string
---@field success? boolean

---@class PublicV1MessageLoadMatch
---@field inbox_id string

---@class PublicV1MessageRemoveMatch
---@field id string
---@field inbox_id string

---@class PublicV1Webhook
---@field created_at? string
---@field failure_count? number
---@field id? string
---@field inbox string
---@field url string

---@class PublicV1WebhookListMatch
---@field created_at? string
---@field failure_count? number
---@field id? string
---@field inbox? string
---@field url? string

---@class PublicV1WebhookCreateData
---@field created_at? string
---@field failure_count? number
---@field id? string
---@field inbox string
---@field url string

---@class PublicV1WebhookRemoveMatch
---@field id string

---@class Usage
---@field data? table
---@field success? boolean

---@class UsageLoadMatch
---@field data? table
---@field success? boolean

local M = {}

return M
