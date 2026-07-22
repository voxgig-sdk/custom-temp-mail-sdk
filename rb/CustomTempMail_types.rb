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
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] mx_record
#   @return [String]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] txt_record
#   @return [String]
#
# @!attribute [rw] verified
#   @return [Boolean]
CustomDomain = Struct.new(
  :added_at,
  :data,
  :domain,
  :message,
  :mx_record,
  :success,
  :txt_record,
  :verified,
  keyword_init: true
)

# Request payload for CustomDomain#list.
#
# @!attribute [rw] added_at
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] mx_record
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] txt_record
#   @return [String, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
CustomDomainListMatch = Struct.new(
  :added_at,
  :data,
  :domain,
  :message,
  :mx_record,
  :success,
  :txt_record,
  :verified,
  keyword_init: true
)

# Request payload for CustomDomain#create.
#
# @!attribute [rw] added_at
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] domain
#   @return [String]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] mx_record
#   @return [String]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] txt_record
#   @return [String]
#
# @!attribute [rw] verified
#   @return [Boolean]
CustomDomainCreateData = Struct.new(
  :added_at,
  :data,
  :domain,
  :message,
  :mx_record,
  :success,
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
# @!attribute [rw] data
#   @return [Hash]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] verified
#   @return [Boolean, nil]
CustomDomainVerify = Struct.new(
  :data,
  :message,
  :success,
  :verified,
  keyword_init: true
)

# Request payload for CustomDomainVerify#create.
#
# @!attribute [rw] domain
#   @return [String]
CustomDomainVerifyCreateData = Struct.new(
  :domain,
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
# @!attribute [rw] expires_in_day
#   @return [Integer, nil]
#
# @!attribute [rw] expiring_soon
#   @return [Boolean, nil]
#
# @!attribute [rw] tag
#   @return [Array]
#
# @!attribute [rw] tier
#   @return [String]
Domain = Struct.new(
  :domain,
  :expires_at,
  :expires_in_day,
  :expiring_soon,
  :tag,
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
# @!attribute [rw] expires_in_day
#   @return [Integer, nil]
#
# @!attribute [rw] expiring_soon
#   @return [Boolean, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] tier
#   @return [String, nil]
DomainListMatch = Struct.new(
  :domain,
  :expires_at,
  :expires_in_day,
  :expiring_soon,
  :tag,
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
# @!attribute [rw] expires_in_day
#   @return [Integer, nil]
#
# @!attribute [rw] expiring_soon
#   @return [Boolean, nil]
#
# @!attribute [rw] tag
#   @return [Array]
#
# @!attribute [rw] tier
#   @return [String]
DomainsAll = Struct.new(
  :domain,
  :expired,
  :expires_at,
  :expires_in_day,
  :expiring_soon,
  :tag,
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
# @!attribute [rw] expires_in_day
#   @return [Integer, nil]
#
# @!attribute [rw] expiring_soon
#   @return [Boolean, nil]
#
# @!attribute [rw] tag
#   @return [Array, nil]
#
# @!attribute [rw] tier
#   @return [String, nil]
DomainsAllListMatch = Struct.new(
  :domain,
  :expired,
  :expires_at,
  :expires_in_day,
  :expiring_soon,
  :tag,
  :tier,
  keyword_init: true
)

# Inbox entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] is_testing
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Inbox = Struct.new(
  :data,
  :inbox,
  :is_testing,
  :message,
  :success,
  keyword_init: true
)

# Request payload for Inbox#load.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] is_testing
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
InboxLoadMatch = Struct.new(
  :data,
  :inbox,
  :is_testing,
  :message,
  :success,
  keyword_init: true
)

# Request payload for Inbox#create.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] inbox
#   @return [String, nil]
#
# @!attribute [rw] is_testing
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
InboxCreateData = Struct.new(
  :data,
  :inbox,
  :is_testing,
  :message,
  :success,
  keyword_init: true
)

# Men entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Men = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Request payload for Men#load.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
MenLoadMatch = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Message entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Message = Struct.new(
  :data,
  :success,
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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Otp = Struct.new(
  :data,
  :success,
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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Plan = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Request payload for Plan#load.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
PlanLoadMatch = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# PublicV1DashboardAnalytics entity data model.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
PublicV1DashboardAnalytics = Struct.new(
  :data,
  :success,
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
# @!attribute [rw] custom_firstname
#   @return [Array, nil]
#
# @!attribute [rw] custom_surname
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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] domain
#   @return [Array, nil]
#
# @!attribute [rw] domain_mode
#   @return [String, nil]
#
# @!attribute [rw] inbox
#   @return [Array, nil]
#
# @!attribute [rw] output_format
#   @return [String, nil]
#
# @!attribute [rw] parse_code
#   @return [Boolean, nil]
#
# @!attribute [rw] since
#   @return [Integer, nil]
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
  :custom_firstname,
  :custom_surname,
  :daily_limit,
  :daily_remaining,
  :daily_used,
  :data,
  :domain,
  :domain_mode,
  :inbox,
  :output_format,
  :parse_code,
  :since,
  :success,
  :test_id,
  :username_style,
  keyword_init: true
)

# Request payload for PublicV1Inbox#create.
#
# @!attribute [rw] inbox_id
#   @return [String, nil]
PublicV1InboxCreateData = Struct.new(
  :inbox_id,
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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
PublicV1Message = Struct.new(
  :data,
  :message,
  :success,
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
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] failure_count
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
  :created_at,
  :failure_count,
  :id,
  :inbox,
  :url,
  keyword_init: true
)

# Request payload for PublicV1Webhook#list.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] failure_count
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
  :created_at,
  :failure_count,
  :id,
  :inbox,
  :url,
  keyword_init: true
)

# Request payload for PublicV1Webhook#create.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] failure_count
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
  :created_at,
  :failure_count,
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
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Usage = Struct.new(
  :data,
  :success,
  keyword_init: true
)

# Request payload for Usage#load.
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
UsageLoadMatch = Struct.new(
  :data,
  :success,
  keyword_init: true
)

