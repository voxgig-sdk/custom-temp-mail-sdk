# Typed models for the CustomTempMail SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
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
    data: dict
    domain: str
    mx_record: str
    txt_record: str
    verified: bool


class CustomDomain(CustomDomainRequired, total=False):
    added_at: str
    message: str
    success: bool


class CustomDomainListMatch(TypedDict, total=False):
    added_at: str
    data: dict
    domain: str
    message: str
    mx_record: str
    success: bool
    txt_record: str
    verified: bool


class CustomDomainCreateDataRequired(TypedDict):
    data: dict
    domain: str
    mx_record: str
    txt_record: str
    verified: bool


class CustomDomainCreateData(CustomDomainCreateDataRequired, total=False):
    added_at: str
    message: str
    success: bool


class CustomDomainRemoveMatch(TypedDict):
    id: str


class CustomDomainVerifyRequired(TypedDict):
    data: dict


class CustomDomainVerify(CustomDomainVerifyRequired, total=False):
    message: str
    success: bool
    verified: bool


class CustomDomainVerifyCreateData(TypedDict):
    domain: str


class DomainRequired(TypedDict):
    domain: str
    tag: list
    tier: str


class Domain(DomainRequired, total=False):
    expires_at: str
    expires_in_day: int
    expiring_soon: bool


class DomainListMatch(TypedDict, total=False):
    domain: str
    expires_at: str
    expires_in_day: int
    expiring_soon: bool
    tag: list
    tier: str


class DomainsAllRequired(TypedDict):
    domain: str
    expired: bool
    tag: list
    tier: str


class DomainsAll(DomainsAllRequired, total=False):
    expires_at: str
    expires_in_day: int
    expiring_soon: bool


class DomainsAllListMatch(TypedDict, total=False):
    domain: str
    expired: bool
    expires_at: str
    expires_in_day: int
    expiring_soon: bool
    tag: list
    tier: str


class Inbox(TypedDict, total=False):
    data: dict
    inbox: str
    is_testing: bool
    message: str
    success: bool


class InboxLoadMatch(TypedDict, total=False):
    data: dict
    inbox: str
    is_testing: bool
    message: str
    success: bool


class InboxCreateData(TypedDict, total=False):
    data: dict
    inbox: str
    is_testing: bool
    message: str
    success: bool


class Men(TypedDict, total=False):
    data: dict
    success: bool


class MenLoadMatch(TypedDict, total=False):
    data: dict
    success: bool


class Message(TypedDict, total=False):
    data: dict
    success: bool


class MessageLoadMatchRequired(TypedDict):
    inbox_id: str


class MessageLoadMatch(MessageLoadMatchRequired, total=False):
    id: str


class Otp(TypedDict, total=False):
    data: dict
    success: bool


class OtpLoadMatch(TypedDict):
    inbox_id: str


class Plan(TypedDict, total=False):
    data: dict
    success: bool


class PlanLoadMatch(TypedDict, total=False):
    data: dict
    success: bool


class PublicV1DashboardAnalytics(TypedDict, total=False):
    data: dict
    success: bool


class PublicV1DashboardAnalyticsLoadMatch(TypedDict):
    inbox_id: str


class PublicV1Inbox(TypedDict, total=False):
    count: int
    custom_firstname: list
    custom_surname: list
    daily_limit: int
    daily_remaining: int
    daily_used: int
    data: dict
    domain: list
    domain_mode: str
    inbox: list
    output_format: str
    parse_code: bool
    since: int
    success: bool
    test_id: str
    username_style: str


class PublicV1InboxCreateData(TypedDict, total=False):
    inbox_id: str


class PublicV1InboxRemoveMatch(TypedDict):
    id: str


class PublicV1Message(TypedDict, total=False):
    data: dict
    message: str
    success: bool


class PublicV1MessageLoadMatch(TypedDict):
    inbox_id: str


class PublicV1MessageRemoveMatch(TypedDict):
    id: str
    inbox_id: str


class PublicV1WebhookRequired(TypedDict):
    inbox: str
    url: str


class PublicV1Webhook(PublicV1WebhookRequired, total=False):
    created_at: str
    failure_count: int
    id: str


class PublicV1WebhookListMatch(TypedDict, total=False):
    created_at: str
    failure_count: int
    id: str
    inbox: str
    url: str


class PublicV1WebhookCreateDataRequired(TypedDict):
    inbox: str
    url: str


class PublicV1WebhookCreateData(PublicV1WebhookCreateDataRequired, total=False):
    created_at: str
    failure_count: int
    id: str


class PublicV1WebhookRemoveMatch(TypedDict):
    id: str


class Usage(TypedDict, total=False):
    data: dict
    success: bool


class UsageLoadMatch(TypedDict, total=False):
    data: dict
    success: bool
