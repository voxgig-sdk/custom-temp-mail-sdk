# Typed models for the CustomTempMail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CustomDomainRequired(TypedDict):
    domain: str
    mx_record: str
    txt_record: str
    verified: bool


class CustomDomain(CustomDomainRequired, total=False):
    added_at: str
    id: str


class CustomDomainListMatch(TypedDict, total=False):
    added_at: str
    domain: str
    id: str
    mx_record: str
    txt_record: str
    verified: bool


class CustomDomainCreateDataRequired(TypedDict):
    domain: str
    mx_record: str
    txt_record: str
    verified: bool


class CustomDomainCreateData(CustomDomainCreateDataRequired, total=False):
    added_at: str
    id: str


class CustomDomainRemoveMatch(TypedDict):
    id: str


class CustomDomainVerifyRequired(TypedDict):
    domain: str
    mx_record: str
    txt_record: str
    verified: bool


class CustomDomainVerify(CustomDomainVerifyRequired, total=False):
    added_at: str


class CustomDomainVerifyCreateDataRequired(TypedDict):
    domain: str
    mx_record: str
    txt_record: str
    verified: bool


class CustomDomainVerifyCreateData(CustomDomainVerifyCreateDataRequired, total=False):
    added_at: str


class DomainRequired(TypedDict):
    domain: str
    tags: list
    tier: str


class Domain(DomainRequired, total=False):
    expires_at: str
    expires_in_days: int
    expiring_soon: bool


class DomainListMatch(TypedDict, total=False):
    domain: str
    expires_at: str
    expires_in_days: int
    expiring_soon: bool
    tags: list
    tier: str


class DomainsAllRequired(TypedDict):
    domain: str
    expired: bool
    tags: list
    tier: str


class DomainsAll(DomainsAllRequired, total=False):
    expires_at: str
    expires_in_days: int
    expiring_soon: bool


class DomainsAllListMatch(TypedDict, total=False):
    domain: str
    expired: bool
    expires_at: str
    expires_in_days: int
    expiring_soon: bool
    tags: list
    tier: str


class Inbox(TypedDict, total=False):
    count: int
    inbox: str
    inboxes: list
    isTesting: bool
    message: str
    success: bool


class InboxLoadMatch(TypedDict, total=False):
    count: int
    inbox: str
    inboxes: list
    isTesting: bool
    message: str
    success: bool


class InboxCreateData(TypedDict, total=False):
    count: int
    inbox: str
    inboxes: list
    isTesting: bool
    message: str
    success: bool


class Men(TypedDict, total=False):
    api_inbox_count: int
    api_inboxes: list
    app_inbox_count: int
    app_inboxes: list
    credits: int
    custom_domain_count: int
    custom_domains: list
    features: dict
    plan: str
    rate_limits: dict


class MenLoadMatch(TypedDict, total=False):
    api_inbox_count: int
    api_inboxes: list
    app_inbox_count: int
    app_inboxes: list
    credits: int
    custom_domain_count: int
    custom_domains: list
    features: dict
    plan: str
    rate_limits: dict


class Message(TypedDict, total=False):
    attachments: list
    count: int
    date: str
    has_attachment: bool
    has_more: bool
    html: str
    id: str
    inbox: str
    messages: list
    otp: str
    subject: str
    text: str
    to: str
    verification_link: str


class MessageLoadMatchRequired(TypedDict):
    inbox_id: str


class MessageLoadMatch(MessageLoadMatchRequired, total=False):
    before: str
    limit: int
    id: str


class Otp(TypedDict, total=False):
    inbox: str
    message: str
    message_id: str
    otp: str
    received_at: str
    score: float
    subject: str
    verification_link: str


class OtpLoadMatchRequired(TypedDict):
    inbox_id: str


class OtpLoadMatch(OtpLoadMatchRequired, total=False):
    parse_code: bool
    since: int


class Plan(TypedDict, total=False):
    credit_packages: list
    plans: list


class PlanLoadMatch(TypedDict, total=False):
    credit_packages: list
    plans: list


class PublicV1DashboardAnalytics(TypedDict, total=False):
    analyzed_at: str
    duration_hours: int
    event_count: int
    events: list
    inbox: str
    insights: list


class PublicV1DashboardAnalyticsLoadMatchRequired(TypedDict):
    inbox_id: str


class PublicV1DashboardAnalyticsLoadMatch(PublicV1DashboardAnalyticsLoadMatchRequired, total=False):
    test_id: str


class PublicV1Inbox(TypedDict, total=False):
    count: int
    custom_firstnames: list
    custom_surnames: list
    daily_limit: int
    daily_remaining: int
    daily_used: int
    domain_mode: str
    domains: list
    id: str
    inbox: str
    inboxes: list
    output_format: str
    parseCode: bool
    since: int
    started_at: str
    success: bool
    test_id: str
    username_style: str


class PublicV1InboxCreateData(TypedDict, total=False):
    count: int
    custom_firstnames: list
    custom_surnames: list
    daily_limit: int
    daily_remaining: int
    daily_used: int
    domain_mode: str
    domains: list
    id: str
    inbox: str
    inboxes: list
    output_format: str
    parseCode: bool
    since: int
    started_at: str
    success: bool
    test_id: str
    username_style: str


class PublicV1InboxRemoveMatch(TypedDict):
    id: str


class PublicV1Message(TypedDict, total=False):
    date: str
    has_attachment: bool
    id: str
    otp: str
    subject: str
    verification_link: str


class PublicV1MessageLoadMatchRequired(TypedDict):
    inbox_id: str


class PublicV1MessageLoadMatch(PublicV1MessageLoadMatchRequired, total=False):
    since: str
    timeout: int


class PublicV1MessageRemoveMatch(TypedDict):
    id: str
    inbox_id: str


class PublicV1WebhookRequired(TypedDict):
    inbox: str
    url: str


class PublicV1Webhook(PublicV1WebhookRequired, total=False):
    createdAt: str
    failureCount: int
    id: str


class PublicV1WebhookListMatch(TypedDict, total=False):
    createdAt: str
    failureCount: int
    id: str
    inbox: str
    url: str


class PublicV1WebhookCreateDataRequired(TypedDict):
    inbox: str
    url: str


class PublicV1WebhookCreateData(PublicV1WebhookCreateDataRequired, total=False):
    createdAt: str
    failureCount: int
    id: str


class PublicV1WebhookRemoveMatch(TypedDict):
    id: str


class Usage(TypedDict, total=False):
    credits: dict
    period: dict
    plan: str
    rate_limit: dict
    requests: dict


class UsageLoadMatch(TypedDict, total=False):
    credits: dict
    period: dict
    plan: str
    rate_limit: dict
    requests: dict
