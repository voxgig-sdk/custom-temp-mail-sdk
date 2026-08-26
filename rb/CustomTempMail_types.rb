# frozen_string_literal: true

# Typed models for the CustomTempMail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# CustomDomain entity data model.
#
# @!attribute [rw] added_at
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mx_record
#   @return [String]
#
# @!attribute [rw] txt_record
#   @return [String]
#
# @!attribute [rw] verified
#   @return [Boolean]
CustomDomain = Struct.new(
  :added_at,
  :domain,
  :id,
  :mx_record,
  :txt_record,
  :verified,
  keyword_init: true
)

# Request payload for CustomDomain#list.
#
# @!attribute [rw] added_at
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mx_record
#   @return [String, nil]
#
# @!attribute [rw] txt_record
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
CustomDomainListMatch = Struct.new(
  :added_at,
  :domain,
  :id,
  :mx_record,
  :txt_record,
  :verified,
  keyword_init: true
)

# Request payload for CustomDomain#create.
#
# @!attribute [rw] added_at
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] mx_record
#   @return [String]
#
# @!attribute [rw] txt_record
#   @return [String]
#
# @!attribute [rw] verified
#   @return [Boolean]
CustomDomainCreateData = Struct.new(
  :added_at,
  :domain,
  :id,
  :mx_record,
  :txt_record,
  :verified,
  keyword_init: true
)

# Request payload for CustomDomain#remove.
#
# @!attribute [rw] id
#   @return [String]
CustomDomainRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# CustomDomainVerify entity data model.
#
# @!attribute [rw] added_at
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] mx_record
#   @return [String]
#
# @!attribute [rw] txt_record
#   @return [String]
#
# @!attribute [rw] verified
#   @return [Boolean]
CustomDomainVerify = Struct.new(
  :added_at,
  :domain,
  :mx_record,
  :txt_record,
  :verified,
  keyword_init: true
)

# Request payload for CustomDomainVerify#create.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] added_at
#   @return [String, nil]
#
# @!attribute [rw] mx_record
#   @return [String]
#
# @!attribute [rw] txt_record
#   @return [String]
#
# @!attribute [rw] verified
#   @return [Boolean]
CustomDomainVerifyCreateData = Struct.new(
  :domain,
  :added_at,
  :mx_record,
  :txt_record,
  :verified,
  keyword_init: true
)

# Domain entity data model.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] expires_in_days
#   @return [Integer, nil]
#
# @!attribute [rw] expiring_soon
#   @return [Boolean, nil]
#
# @!attribute [rw] tags
#   @return [Array]
#
# @!attribute [rw] tier
#   @return [String]
Domain = Struct.new(
  :domain,
  :expires_at,
  :expires_in_days,
  :expiring_soon,
  :tags,
  :tier,
  keyword_init: true
)

# Request payload for Domain#list.
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] expires_in_days
#   @return [Integer, nil]
#
# @!attribute [rw] expiring_soon
#   @return [Boolean, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] tier
#   @return [String, nil]
DomainListMatch = Struct.new(
  :domain,
  :expires_at,
  :expires_in_days,
  :expiring_soon,
  :tags,
  :tier,
  keyword_init: true
)

# DomainsAll entity data model.
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] expired
#   @return [Boolean]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] expires_in_days
#   @return [Integer, nil]
#
# @!attribute [rw] expiring_soon
#   @return [Boolean, nil]
#
# @!attribute [rw] tags
#   @return [Array]
#
# @!attribute [rw] tier
#   @return [String]
DomainsAll = Struct.new(
  :domain,
  :expired,
  :expires_at,
  :expires_in_days,
  :expiring_soon,
  :tags,
  :tier,
  keyword_init: true
)

# Request payload for DomainsAll#list.
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] expired
#   @return [Boolean, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] expires_in_days
#   @return [Integer, nil]
#
# @!attribute [rw] expiring_soon
#   @return [Boolean, nil]
#
# @!attribute [rw] tags
#   @return [Array, nil]
#
# @!attribute [rw] tier
#   @return [String, nil]
DomainsAllListMatch = Struct.new(
  :domain,
  :expired,
  :expires_at,
  :expires_in_days,
  :expiring_soon,
  :tags,
  :tier,
  keyword_init: true
)

# Inbox entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] inboxes
#   @return [Array, nil]
#
# @!attribute [rw] isTesting
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Inbox = Struct.new(
  :count,
  :inbox,
  :inboxes,
  :isTesting,
  :message,
  :success,
  keyword_init: true
)

# Request payload for Inbox#load.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] inboxes
#   @return [Array, nil]
#
# @!attribute [rw] isTesting
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
InboxLoadMatch = Struct.new(
  :count,
  :inbox,
  :inboxes,
  :isTesting,
  :message,
  :success,
  keyword_init: true
)

# Request payload for Inbox#create.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] inboxes
#   @return [Array, nil]
#
# @!attribute [rw] isTesting
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
InboxCreateData = Struct.new(
  :count,
  :inbox,
  :inboxes,
  :isTesting,
  :message,
  :success,
  keyword_init: true
)

# Men entity data model.
#
# @!attribute [rw] api_inbox_count
#   @return [Integer, nil]
#
# @!attribute [rw] api_inboxes
#   @return [Array, nil]
#
# @!attribute [rw] app_inbox_count
#   @return [Integer, nil]
#
# @!attribute [rw] app_inboxes
#   @return [Array, nil]
#
# @!attribute [rw] credits
#   @return [Integer, nil]
#
# @!attribute [rw] custom_domain_count
#   @return [Integer, nil]
#
# @!attribute [rw] custom_domains
#   @return [Array, nil]
#
# @!attribute [rw] features
#   @return [Hash, nil]
#
# @!attribute [rw] plan
#   @return [String, nil]
#
# @!attribute [rw] rate_limits
#   @return [Hash, nil]
Men = Struct.new(
  :api_inbox_count,
  :api_inboxes,
  :app_inbox_count,
  :app_inboxes,
  :credits,
  :custom_domain_count,
  :custom_domains,
  :features,
  :plan,
  :rate_limits,
  keyword_init: true
)

# Request payload for Men#load.
#
# @!attribute [rw] api_inbox_count
#   @return [Integer, nil]
#
# @!attribute [rw] api_inboxes
#   @return [Array, nil]
#
# @!attribute [rw] app_inbox_count
#   @return [Integer, nil]
#
# @!attribute [rw] app_inboxes
#   @return [Array, nil]
#
# @!attribute [rw] credits
#   @return [Integer, nil]
#
# @!attribute [rw] custom_domain_count
#   @return [Integer, nil]
#
# @!attribute [rw] custom_domains
#   @return [Array, nil]
#
# @!attribute [rw] features
#   @return [Hash, nil]
#
# @!attribute [rw] plan
#   @return [String, nil]
#
# @!attribute [rw] rate_limits
#   @return [Hash, nil]
MenLoadMatch = Struct.new(
  :api_inbox_count,
  :api_inboxes,
  :app_inbox_count,
  :app_inboxes,
  :credits,
  :custom_domain_count,
  :custom_domains,
  :features,
  :plan,
  :rate_limits,
  keyword_init: true
)

# Message entity data model.
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] has_attachment
#   @return [Boolean, nil]
#
# @!attribute [rw] has_more
#   @return [Boolean, nil]
#
# @!attribute [rw] html
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] otp
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
#
# @!attribute [rw] verification_link
#   @return [String, nil]
Message = Struct.new(
  :attachments,
  :count,
  :date,
  :from,
  :has_attachment,
  :has_more,
  :html,
  :id,
  :inbox,
  :messages,
  :otp,
  :subject,
  :text,
  :to,
  :verification_link,
  keyword_init: true
)

# Request payload for Message#load.
#
# @!attribute [rw] inbox_id
#   @return [String]
#
# @!attribute [rw] id
#   @return [String, nil]
MessageLoadMatch = Struct.new(
  :inbox_id,
  :id,
  keyword_init: true
)

# Otp entity data model.
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] message_id
#   @return [String, nil]
#
# @!attribute [rw] otp
#   @return [String, nil]
#
# @!attribute [rw] received_at
#   @return [String, nil]
#
# @!attribute [rw] score
#   @return [Float, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
#
# @!attribute [rw] verification_link
#   @return [String, nil]
Otp = Struct.new(
  :from,
  :inbox,
  :message,
  :message_id,
  :otp,
  :received_at,
  :score,
  :subject,
  :verification_link,
  keyword_init: true
)

# Request payload for Otp#load.
#
# @!attribute [rw] inbox_id
#   @return [String]
OtpLoadMatch = Struct.new(
  :inbox_id,
  keyword_init: true
)

# Plan entity data model.
#
# @!attribute [rw] credit_packages
#   @return [Array, nil]
#
# @!attribute [rw] plans
#   @return [Array, nil]
Plan = Struct.new(
  :credit_packages,
  :plans,
  keyword_init: true
)

# Request payload for Plan#load.
#
# @!attribute [rw] credit_packages
#   @return [Array, nil]
#
# @!attribute [rw] plans
#   @return [Array, nil]
PlanLoadMatch = Struct.new(
  :credit_packages,
  :plans,
  keyword_init: true
)

# PublicV1DashboardAnalytics entity data model.
#
# @!attribute [rw] analyzed_at
#   @return [String, nil]
#
# @!attribute [rw] duration_hours
#   @return [Integer, nil]
#
# @!attribute [rw] event_count
#   @return [Integer, nil]
#
# @!attribute [rw] events
#   @return [Array, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] insights
#   @return [Array, nil]
PublicV1DashboardAnalytics = Struct.new(
  :analyzed_at,
  :duration_hours,
  :event_count,
  :events,
  :inbox,
  :insights,
  keyword_init: true
)

# Request payload for PublicV1DashboardAnalytics#load.
#
# @!attribute [rw] inbox_id
#   @return [String]
PublicV1DashboardAnalyticsLoadMatch = Struct.new(
  :inbox_id,
  keyword_init: true
)

# PublicV1Inbox entity data model.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] custom_firstnames
#   @return [Array, nil]
#
# @!attribute [rw] custom_surnames
#   @return [Array, nil]
#
# @!attribute [rw] daily_limit
#   @return [Integer, nil]
#
# @!attribute [rw] daily_remaining
#   @return [Integer, nil]
#
# @!attribute [rw] daily_used
#   @return [Integer, nil]
#
# @!attribute [rw] domain_mode
#   @return [String, nil]
#
# @!attribute [rw] domains
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] inboxes
#   @return [Array, nil]
#
# @!attribute [rw] output_format
#   @return [String, nil]
#
# @!attribute [rw] parseCode
#   @return [Boolean, nil]
#
# @!attribute [rw] since
#   @return [Integer, nil]
#
# @!attribute [rw] started_at
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] test_id
#   @return [String, nil]
#
# @!attribute [rw] username_style
#   @return [String, nil]
PublicV1Inbox = Struct.new(
  :count,
  :custom_firstnames,
  :custom_surnames,
  :daily_limit,
  :daily_remaining,
  :daily_used,
  :domain_mode,
  :domains,
  :id,
  :inbox,
  :inboxes,
  :output_format,
  :parseCode,
  :since,
  :started_at,
  :success,
  :test_id,
  :username_style,
  keyword_init: true
)

# Request payload for PublicV1Inbox#create.
#
# @!attribute [rw] count
#   @return [Integer, nil]
#
# @!attribute [rw] custom_firstnames
#   @return [Array, nil]
#
# @!attribute [rw] custom_surnames
#   @return [Array, nil]
#
# @!attribute [rw] daily_limit
#   @return [Integer, nil]
#
# @!attribute [rw] daily_remaining
#   @return [Integer, nil]
#
# @!attribute [rw] daily_used
#   @return [Integer, nil]
#
# @!attribute [rw] domain_mode
#   @return [String, nil]
#
# @!attribute [rw] domains
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] inboxes
#   @return [Array, nil]
#
# @!attribute [rw] output_format
#   @return [String, nil]
#
# @!attribute [rw] parseCode
#   @return [Boolean, nil]
#
# @!attribute [rw] since
#   @return [Integer, nil]
#
# @!attribute [rw] started_at
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] test_id
#   @return [String, nil]
#
# @!attribute [rw] username_style
#   @return [String, nil]
PublicV1InboxCreateData = Struct.new(
  :count,
  :custom_firstnames,
  :custom_surnames,
  :daily_limit,
  :daily_remaining,
  :daily_used,
  :domain_mode,
  :domains,
  :id,
  :inbox,
  :inboxes,
  :output_format,
  :parseCode,
  :since,
  :started_at,
  :success,
  :test_id,
  :username_style,
  keyword_init: true
)

# Request payload for PublicV1Inbox#remove.
#
# @!attribute [rw] id
#   @return [String]
PublicV1InboxRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# PublicV1Message entity data model.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] has_attachment
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] otp
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
#
# @!attribute [rw] verification_link
#   @return [String, nil]
PublicV1Message = Struct.new(
  :date,
  :from,
  :has_attachment,
  :id,
  :otp,
  :subject,
  :verification_link,
  keyword_init: true
)

# Request payload for PublicV1Message#load.
#
# @!attribute [rw] inbox_id
#   @return [String]
PublicV1MessageLoadMatch = Struct.new(
  :inbox_id,
  keyword_init: true
)

# Request payload for PublicV1Message#remove.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] inbox_id
#   @return [String]
PublicV1MessageRemoveMatch = Struct.new(
  :id,
  :inbox_id,
  keyword_init: true
)

# PublicV1Webhook entity data model.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] failureCount
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inbox
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
PublicV1Webhook = Struct.new(
  :createdAt,
  :failureCount,
  :id,
  :inbox,
  :url,
  keyword_init: true
)

# Request payload for PublicV1Webhook#list.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] failureCount
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
PublicV1WebhookListMatch = Struct.new(
  :createdAt,
  :failureCount,
  :id,
  :inbox,
  :url,
  keyword_init: true
)

# Request payload for PublicV1Webhook#create.
#
# @!attribute [rw] createdAt
#   @return [String, nil]
#
# @!attribute [rw] failureCount
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inbox
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
PublicV1WebhookCreateData = Struct.new(
  :createdAt,
  :failureCount,
  :id,
  :inbox,
  :url,
  keyword_init: true
)

# Request payload for PublicV1Webhook#remove.
#
# @!attribute [rw] id
#   @return [String]
PublicV1WebhookRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# Usage entity data model.
#
# @!attribute [rw] credits
#   @return [Hash, nil]
#
# @!attribute [rw] period
#   @return [Hash, nil]
#
# @!attribute [rw] plan
#   @return [String, nil]
#
# @!attribute [rw] rate_limit
#   @return [Hash, nil]
#
# @!attribute [rw] requests
#   @return [Hash, nil]
Usage = Struct.new(
  :credits,
  :period,
  :plan,
  :rate_limit,
  :requests,
  keyword_init: true
)

# Request payload for Usage#load.
#
# @!attribute [rw] credits
#   @return [Hash, nil]
#
# @!attribute [rw] period
#   @return [Hash, nil]
#
# @!attribute [rw] plan
#   @return [String, nil]
#
# @!attribute [rw] rate_limit
#   @return [Hash, nil]
#
# @!attribute [rw] requests
#   @return [Hash, nil]
UsageLoadMatch = Struct.new(
  :credits,
  :period,
  :plan,
  :rate_limit,
  :requests,
  keyword_init: true
)

