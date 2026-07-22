// Typed models for the CustomTempMail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface CustomDomain {
  added_at?: string
  data: Record<string, any>
  domain: string
  message?: string
  mx_record: string
  success?: boolean
  txt_record: string
  verified: boolean
}

export interface CustomDomainListMatch {
  added_at?: string
  data?: Record<string, any>
  domain?: string
  message?: string
  mx_record?: string
  success?: boolean
  txt_record?: string
  verified?: boolean
}

export interface CustomDomainCreateData {
  added_at?: string
  data: Record<string, any>
  domain: string
  message?: string
  mx_record: string
  success?: boolean
  txt_record: string
  verified: boolean
}

export interface CustomDomainRemoveMatch {
  id: string
}

export interface CustomDomainVerify {
  data: Record<string, any>
  message?: string
  success?: boolean
  verified?: boolean
}

export interface CustomDomainVerifyCreateData {
  domain: string
}

export interface Domain {
  domain: string
  expires_at?: string
  expires_in_day?: number
  expiring_soon?: boolean
  tag: any[]
  tier: string
}

export interface DomainListMatch {
  domain?: string
  expires_at?: string
  expires_in_day?: number
  expiring_soon?: boolean
  tag?: any[]
  tier?: string
}

export interface DomainsAll {
  domain: string
  expired: boolean
  expires_at?: string
  expires_in_day?: number
  expiring_soon?: boolean
  tag: any[]
  tier: string
}

export interface DomainsAllListMatch {
  domain?: string
  expired?: boolean
  expires_at?: string
  expires_in_day?: number
  expiring_soon?: boolean
  tag?: any[]
  tier?: string
}

export interface Inbox {
  data?: Record<string, any>
  inbox?: string
  is_testing?: boolean
  message?: string
  success?: boolean
}

export interface InboxLoadMatch {
  data?: Record<string, any>
  inbox?: string
  is_testing?: boolean
  message?: string
  success?: boolean
}

export interface InboxCreateData {
  data?: Record<string, any>
  inbox?: string
  is_testing?: boolean
  message?: string
  success?: boolean
}

export interface Men {
  data?: Record<string, any>
  success?: boolean
}

export interface MenLoadMatch {
  data?: Record<string, any>
  success?: boolean
}

export interface Message {
  data?: Record<string, any>
  success?: boolean
}

export interface MessageLoadMatch {
  inbox_id: string
  id?: string
}

export interface Otp {
  data?: Record<string, any>
  success?: boolean
}

export interface OtpLoadMatch {
  inbox_id: string
}

export interface Plan {
  data?: Record<string, any>
  success?: boolean
}

export interface PlanLoadMatch {
  data?: Record<string, any>
  success?: boolean
}

export interface PublicV1DashboardAnalytics {
  data?: Record<string, any>
  success?: boolean
}

export interface PublicV1DashboardAnalyticsLoadMatch {
  inbox_id: string
}

export interface PublicV1Inbox {
  count?: number
  custom_firstname?: any[]
  custom_surname?: any[]
  daily_limit?: number
  daily_remaining?: number
  daily_used?: number
  data?: Record<string, any>
  domain?: any[]
  domain_mode?: string
  inbox?: any[]
  output_format?: string
  parse_code?: boolean
  since?: number
  success?: boolean
  test_id?: string
  username_style?: string
}

export interface PublicV1InboxCreateData {
  inbox_id?: string
}

export interface PublicV1InboxRemoveMatch {
  id: string
}

export interface PublicV1Message {
  data?: Record<string, any>
  message?: string
  success?: boolean
}

export interface PublicV1MessageLoadMatch {
  inbox_id: string
}

export interface PublicV1MessageRemoveMatch {
  id: string
  inbox_id: string
}

export interface PublicV1Webhook {
  created_at?: string
  failure_count?: number
  id?: string
  inbox: string
  url: string
}

export interface PublicV1WebhookListMatch {
  created_at?: string
  failure_count?: number
  id?: string
  inbox?: string
  url?: string
}

export interface PublicV1WebhookCreateData {
  created_at?: string
  failure_count?: number
  id?: string
  inbox: string
  url: string
}

export interface PublicV1WebhookRemoveMatch {
  id: string
}

export interface Usage {
  data?: Record<string, any>
  success?: boolean
}

export interface UsageLoadMatch {
  data?: Record<string, any>
  success?: boolean
}

