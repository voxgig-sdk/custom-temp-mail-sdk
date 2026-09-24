// Typed models for the CustomTempMail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface CustomDomain {
  added_at?: string
  domain: string
  id?: string
  mx_record: string
  txt_record: string
  verified: boolean
}

export interface CustomDomainListMatch {
  added_at?: string
  domain?: string
  id?: string
  mx_record?: string
  txt_record?: string
  verified?: boolean
}

export interface CustomDomainCreateData {
  added_at?: string
  domain: string
  id?: string
  mx_record: string
  txt_record: string
  verified: boolean
}

export interface CustomDomainRemoveMatch {
  id: string
}

export interface CustomDomainVerify {
  added_at?: string
  domain: string
  mx_record: string
  txt_record: string
  verified: boolean
}

export interface CustomDomainVerifyCreateData {
  domain: string
  added_at?: string
  mx_record: string
  txt_record: string
  verified: boolean
}

export interface Domain {
  domain: string
  expires_at?: string
  expires_in_days?: number
  expiring_soon?: boolean
  tags: any[]
  tier: string
}

export interface DomainListMatch {
  domain?: string
  expires_at?: string
  expires_in_days?: number
  expiring_soon?: boolean
  tags?: any[]
  tier?: string
}

export interface DomainsAll {
  domain: string
  expired: boolean
  expires_at?: string
  expires_in_days?: number
  expiring_soon?: boolean
  tags: any[]
  tier: string
}

export interface DomainsAllListMatch {
  domain?: string
  expired?: boolean
  expires_at?: string
  expires_in_days?: number
  expiring_soon?: boolean
  tags?: any[]
  tier?: string
}

export interface Inbox {
  count?: number
  inbox?: string
  inboxes?: any[]
  isTesting?: boolean
  message?: string
  success?: boolean
}

export interface InboxLoadMatch {
  count?: number
  inbox?: string
  inboxes?: any[]
  isTesting?: boolean
  message?: string
  success?: boolean
}

export interface InboxCreateData {
  count?: number
  inbox?: string
  inboxes?: any[]
  isTesting?: boolean
  message?: string
  success?: boolean
}

export interface Men {
  api_inbox_count?: number
  api_inboxes?: any[]
  app_inbox_count?: number
  app_inboxes?: any[]
  credits?: number
  custom_domain_count?: number
  custom_domains?: any[]
  features?: Record<string, any>
  plan?: string
  rate_limits?: Record<string, any>
}

export interface MenLoadMatch {
  api_inbox_count?: number
  api_inboxes?: any[]
  app_inbox_count?: number
  app_inboxes?: any[]
  credits?: number
  custom_domain_count?: number
  custom_domains?: any[]
  features?: Record<string, any>
  plan?: string
  rate_limits?: Record<string, any>
}

export interface Message {
  attachments?: any[]
  count?: number
  date?: string
  from?: string
  has_attachment?: boolean
  has_more?: boolean
  html?: string
  id?: string
  inbox?: string
  messages?: any[]
  otp?: string
  subject?: string
  text?: string
  to?: string
  verification_link?: string
}

export interface MessageLoadMatch {
  inbox_id: string
  before?: string
  limit?: number
  id?: string
}

export interface Otp {
  from?: string
  inbox?: string
  message?: string
  message_id?: string
  otp?: string
  received_at?: string
  score?: number
  subject?: string
  verification_link?: string
}

export interface OtpLoadMatch {
  inbox_id: string
  parse_code?: boolean
  since?: number

  // Selects a custom action instead of the plain load:
  //   'public'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Plan {
  credit_packages?: any[]
  plans?: any[]
}

export interface PlanLoadMatch {
  credit_packages?: any[]
  plans?: any[]
}

export interface PublicV1DashboardAnalytics {
  analyzed_at?: string
  duration_hours?: number
  event_count?: number
  events?: any[]
  inbox?: string
  insights?: any[]
}

export interface PublicV1DashboardAnalyticsLoadMatch {
  inbox_id: string
  test_id?: string
}

export interface PublicV1Inbox {
  count?: number
  custom_firstnames?: any[]
  custom_surnames?: any[]
  daily_limit?: number
  daily_remaining?: number
  daily_used?: number
  domain_mode?: string
  domains?: any[]
  id?: string
  inbox?: string
  inboxes?: any[]
  output_format?: string
  parseCode?: boolean
  since?: number
  started_at?: string
  success?: boolean
  test_id?: string
  username_style?: string
}

export interface PublicV1InboxCreateData {
  count?: number
  custom_firstnames?: any[]
  custom_surnames?: any[]
  daily_limit?: number
  daily_remaining?: number
  daily_used?: number
  domain_mode?: string
  domains?: any[]
  id?: string
  inbox?: string
  inboxes?: any[]
  output_format?: string
  parseCode?: boolean
  since?: number
  started_at?: string
  success?: boolean
  test_id?: string
  username_style?: string
}

export interface PublicV1InboxRemoveMatch {
  id: string
}

export interface PublicV1Message {
  date?: string
  from?: string
  has_attachment?: boolean
  id?: string
  otp?: string
  subject?: string
  verification_link?: string
}

export interface PublicV1MessageLoadMatch {
  inbox_id: string
  since?: string
  timeout?: number
}

export interface PublicV1MessageRemoveMatch {
  id: string
  inbox_id: string
}

export interface PublicV1Webhook {
  createdAt?: string
  failureCount?: number
  id?: string
  inbox: string
  url: string
}

export interface PublicV1WebhookListMatch {
  createdAt?: string
  failureCount?: number
  id?: string
  inbox?: string
  url?: string
}

export interface PublicV1WebhookCreateData {
  createdAt?: string
  failureCount?: number
  id?: string
  inbox: string
  url: string
}

export interface PublicV1WebhookRemoveMatch {
  id: string
}

export interface Usage {
  credits?: Record<string, any>
  period?: Record<string, any>
  plan?: string
  rate_limit?: Record<string, any>
  requests?: Record<string, any>
}

export interface UsageLoadMatch {
  credits?: Record<string, any>
  period?: Record<string, any>
  plan?: string
  rate_limit?: Record<string, any>
  requests?: Record<string, any>
}

