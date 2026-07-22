<?php
declare(strict_types=1);

// Typed models for the CustomTempMail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** CustomDomain entity data model. */
class CustomDomain
{
    public ?string $added_at = null;
    public array $data;
    public string $domain;
    public ?string $message = null;
    public string $mx_record;
    public ?bool $success = null;
    public string $txt_record;
    public bool $verified;
}

/** Request payload for CustomDomain#list. */
class CustomDomainListMatch
{
    public ?string $added_at = null;
    public ?array $data = null;
    public ?string $domain = null;
    public ?string $message = null;
    public ?string $mx_record = null;
    public ?bool $success = null;
    public ?string $txt_record = null;
    public ?bool $verified = null;
}

/** Request payload for CustomDomain#create. */
class CustomDomainCreateData
{
    public ?string $added_at = null;
    public array $data;
    public string $domain;
    public ?string $message = null;
    public string $mx_record;
    public ?bool $success = null;
    public string $txt_record;
    public bool $verified;
}

/** Request payload for CustomDomain#remove. */
class CustomDomainRemoveMatch
{
    public string $id;
}

/** CustomDomainVerify entity data model. */
class CustomDomainVerify
{
    public array $data;
    public ?string $message = null;
    public ?bool $success = null;
    public ?bool $verified = null;
}

/** Request payload for CustomDomainVerify#create. */
class CustomDomainVerifyCreateData
{
    public string $domain;
}

/** Domain entity data model. */
class Domain
{
    public string $domain;
    public ?string $expires_at = null;
    public ?int $expires_in_day = null;
    public ?bool $expiring_soon = null;
    public array $tag;
    public string $tier;
}

/** Request payload for Domain#list. */
class DomainListMatch
{
    public ?string $domain = null;
    public ?string $expires_at = null;
    public ?int $expires_in_day = null;
    public ?bool $expiring_soon = null;
    public ?array $tag = null;
    public ?string $tier = null;
}

/** DomainsAll entity data model. */
class DomainsAll
{
    public string $domain;
    public bool $expired;
    public ?string $expires_at = null;
    public ?int $expires_in_day = null;
    public ?bool $expiring_soon = null;
    public array $tag;
    public string $tier;
}

/** Request payload for DomainsAll#list. */
class DomainsAllListMatch
{
    public ?string $domain = null;
    public ?bool $expired = null;
    public ?string $expires_at = null;
    public ?int $expires_in_day = null;
    public ?bool $expiring_soon = null;
    public ?array $tag = null;
    public ?string $tier = null;
}

/** Inbox entity data model. */
class Inbox
{
    public ?array $data = null;
    public ?string $inbox = null;
    public ?bool $is_testing = null;
    public ?string $message = null;
    public ?bool $success = null;
}

/** Request payload for Inbox#load. */
class InboxLoadMatch
{
    public ?array $data = null;
    public ?string $inbox = null;
    public ?bool $is_testing = null;
    public ?string $message = null;
    public ?bool $success = null;
}

/** Request payload for Inbox#create. */
class InboxCreateData
{
    public ?array $data = null;
    public ?string $inbox = null;
    public ?bool $is_testing = null;
    public ?string $message = null;
    public ?bool $success = null;
}

/** Men entity data model. */
class Men
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Request payload for Men#load. */
class MenLoadMatch
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Message entity data model. */
class Message
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Request payload for Message#load. */
class MessageLoadMatch
{
    public string $inbox_id;
    public ?string $id = null;
}

/** Otp entity data model. */
class Otp
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Request payload for Otp#load. */
class OtpLoadMatch
{
    public string $inbox_id;
}

/** Plan entity data model. */
class Plan
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Request payload for Plan#load. */
class PlanLoadMatch
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** PublicV1DashboardAnalytics entity data model. */
class PublicV1DashboardAnalytics
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Request payload for PublicV1DashboardAnalytics#load. */
class PublicV1DashboardAnalyticsLoadMatch
{
    public string $inbox_id;
}

/** PublicV1Inbox entity data model. */
class PublicV1Inbox
{
    public ?int $count = null;
    public ?array $custom_firstname = null;
    public ?array $custom_surname = null;
    public ?int $daily_limit = null;
    public ?int $daily_remaining = null;
    public ?int $daily_used = null;
    public ?array $data = null;
    public ?array $domain = null;
    public ?string $domain_mode = null;
    public ?array $inbox = null;
    public ?string $output_format = null;
    public ?bool $parse_code = null;
    public ?int $since = null;
    public ?bool $success = null;
    public ?string $test_id = null;
    public ?string $username_style = null;
}

/** Request payload for PublicV1Inbox#create. */
class PublicV1InboxCreateData
{
    public ?string $inbox_id = null;
}

/** Request payload for PublicV1Inbox#remove. */
class PublicV1InboxRemoveMatch
{
    public string $id;
}

/** PublicV1Message entity data model. */
class PublicV1Message
{
    public ?array $data = null;
    public ?string $message = null;
    public ?bool $success = null;
}

/** Request payload for PublicV1Message#load. */
class PublicV1MessageLoadMatch
{
    public string $inbox_id;
}

/** Request payload for PublicV1Message#remove. */
class PublicV1MessageRemoveMatch
{
    public string $id;
    public string $inbox_id;
}

/** PublicV1Webhook entity data model. */
class PublicV1Webhook
{
    public ?string $created_at = null;
    public ?int $failure_count = null;
    public ?string $id = null;
    public string $inbox;
    public string $url;
}

/** Request payload for PublicV1Webhook#list. */
class PublicV1WebhookListMatch
{
    public ?string $created_at = null;
    public ?int $failure_count = null;
    public ?string $id = null;
    public ?string $inbox = null;
    public ?string $url = null;
}

/** Request payload for PublicV1Webhook#create. */
class PublicV1WebhookCreateData
{
    public ?string $created_at = null;
    public ?int $failure_count = null;
    public ?string $id = null;
    public string $inbox;
    public string $url;
}

/** Request payload for PublicV1Webhook#remove. */
class PublicV1WebhookRemoveMatch
{
    public string $id;
}

/** Usage entity data model. */
class Usage
{
    public ?array $data = null;
    public ?bool $success = null;
}

/** Request payload for Usage#load. */
class UsageLoadMatch
{
    public ?array $data = null;
    public ?bool $success = null;
}

