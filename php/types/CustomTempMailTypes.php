<?php
declare(strict_types=1);

// Typed models for the CustomTempMail SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
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
    public string $domain;
    public ?string $id = null;
    public string $mx_record;
    public string $txt_record;
    public bool $verified;
}

/** Request payload for CustomDomain#list. */
class CustomDomainListMatch
{
    public ?string $added_at = null;
    public ?string $domain = null;
    public ?string $id = null;
    public ?string $mx_record = null;
    public ?string $txt_record = null;
    public ?bool $verified = null;
}

/** Request payload for CustomDomain#create. */
class CustomDomainCreateData
{
    public ?string $added_at = null;
    public string $domain;
    public ?string $id = null;
    public string $mx_record;
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
    public ?string $added_at = null;
    public string $domain;
    public string $mx_record;
    public string $txt_record;
    public bool $verified;
}

/** Request payload for CustomDomainVerify#create. */
class CustomDomainVerifyCreateData
{
    public string $domain;
    public ?string $added_at = null;
    public string $mx_record;
    public string $txt_record;
    public bool $verified;
}

/** Domain entity data model. */
class Domain
{
    public string $domain;
    public ?string $expires_at = null;
    public ?int $expires_in_days = null;
    public ?bool $expiring_soon = null;
    public array $tags;
    public string $tier;
}

/** Request payload for Domain#list. */
class DomainListMatch
{
    public ?string $domain = null;
    public ?string $expires_at = null;
    public ?int $expires_in_days = null;
    public ?bool $expiring_soon = null;
    public ?array $tags = null;
    public ?string $tier = null;
}

/** DomainsAll entity data model. */
class DomainsAll
{
    public string $domain;
    public bool $expired;
    public ?string $expires_at = null;
    public ?int $expires_in_days = null;
    public ?bool $expiring_soon = null;
    public array $tags;
    public string $tier;
}

/** Request payload for DomainsAll#list. */
class DomainsAllListMatch
{
    public ?string $domain = null;
    public ?bool $expired = null;
    public ?string $expires_at = null;
    public ?int $expires_in_days = null;
    public ?bool $expiring_soon = null;
    public ?array $tags = null;
    public ?string $tier = null;
}

/** Inbox entity data model. */
class Inbox
{
    public ?int $count = null;
    public ?string $inbox = null;
    public ?array $inboxes = null;
    public ?bool $isTesting = null;
    public ?string $message = null;
    public ?bool $success = null;
}

/** Request payload for Inbox#load. */
class InboxLoadMatch
{
    public ?int $count = null;
    public ?string $inbox = null;
    public ?array $inboxes = null;
    public ?bool $isTesting = null;
    public ?string $message = null;
    public ?bool $success = null;
}

/** Request payload for Inbox#create. */
class InboxCreateData
{
    public ?int $count = null;
    public ?string $inbox = null;
    public ?array $inboxes = null;
    public ?bool $isTesting = null;
    public ?string $message = null;
    public ?bool $success = null;
}

/** Men entity data model. */
class Men
{
    public ?int $api_inbox_count = null;
    public ?array $api_inboxes = null;
    public ?int $app_inbox_count = null;
    public ?array $app_inboxes = null;
    public ?int $credits = null;
    public ?int $custom_domain_count = null;
    public ?array $custom_domains = null;
    public ?array $features = null;
    public ?string $plan = null;
    public ?array $rate_limits = null;
}

/** Request payload for Men#load. */
class MenLoadMatch
{
    public ?int $api_inbox_count = null;
    public ?array $api_inboxes = null;
    public ?int $app_inbox_count = null;
    public ?array $app_inboxes = null;
    public ?int $credits = null;
    public ?int $custom_domain_count = null;
    public ?array $custom_domains = null;
    public ?array $features = null;
    public ?string $plan = null;
    public ?array $rate_limits = null;
}

/** Message entity data model. */
class Message
{
    public ?array $attachments = null;
    public ?int $count = null;
    public ?string $date = null;
    public ?string $from = null;
    public ?bool $has_attachment = null;
    public ?bool $has_more = null;
    public ?string $html = null;
    public ?string $id = null;
    public ?string $inbox = null;
    public ?array $messages = null;
    public ?string $otp = null;
    public ?string $subject = null;
    public ?string $text = null;
    public ?string $to = null;
    public ?string $verification_link = null;
}

/** Request payload for Message#load. */
class MessageLoadMatch
{
    public string $inbox_id;
    public ?string $before = null;
    public ?int $limit = null;
    public ?string $id = null;
}

/** Otp entity data model. */
class Otp
{
    public ?string $from = null;
    public ?string $inbox = null;
    public ?string $message = null;
    public ?string $message_id = null;
    public ?string $otp = null;
    public ?string $received_at = null;
    public ?float $score = null;
    public ?string $subject = null;
    public ?string $verification_link = null;
}

/** Request payload for Otp#load. */
class OtpLoadMatch
{
    public string $inbox_id;
    public ?bool $parse_code = null;
    public ?int $since = null;
}

/** Plan entity data model. */
class Plan
{
    public ?array $credit_packages = null;
    public ?array $plans = null;
}

/** Request payload for Plan#load. */
class PlanLoadMatch
{
    public ?array $credit_packages = null;
    public ?array $plans = null;
}

/** PublicV1DashboardAnalytics entity data model. */
class PublicV1DashboardAnalytics
{
    public ?string $analyzed_at = null;
    public ?int $duration_hours = null;
    public ?int $event_count = null;
    public ?array $events = null;
    public ?string $inbox = null;
    public ?array $insights = null;
}

/** Request payload for PublicV1DashboardAnalytics#load. */
class PublicV1DashboardAnalyticsLoadMatch
{
    public string $inbox_id;
    public ?string $test_id = null;
}

/** PublicV1Inbox entity data model. */
class PublicV1Inbox
{
    public ?int $count = null;
    public ?array $custom_firstnames = null;
    public ?array $custom_surnames = null;
    public ?int $daily_limit = null;
    public ?int $daily_remaining = null;
    public ?int $daily_used = null;
    public ?string $domain_mode = null;
    public ?array $domains = null;
    public ?string $id = null;
    public ?string $inbox = null;
    public ?array $inboxes = null;
    public ?string $output_format = null;
    public ?bool $parseCode = null;
    public ?int $since = null;
    public ?string $started_at = null;
    public ?bool $success = null;
    public ?string $test_id = null;
    public ?string $username_style = null;
}

/** Request payload for PublicV1Inbox#create. */
class PublicV1InboxCreateData
{
    public ?int $count = null;
    public ?array $custom_firstnames = null;
    public ?array $custom_surnames = null;
    public ?int $daily_limit = null;
    public ?int $daily_remaining = null;
    public ?int $daily_used = null;
    public ?string $domain_mode = null;
    public ?array $domains = null;
    public ?string $id = null;
    public ?string $inbox = null;
    public ?array $inboxes = null;
    public ?string $output_format = null;
    public ?bool $parseCode = null;
    public ?int $since = null;
    public ?string $started_at = null;
    public ?bool $success = null;
    public ?string $test_id = null;
    public ?string $username_style = null;
}

/** Request payload for PublicV1Inbox#remove. */
class PublicV1InboxRemoveMatch
{
    public string $id;
}

/** PublicV1Message entity data model. */
class PublicV1Message
{
    public ?string $date = null;
    public ?string $from = null;
    public ?bool $has_attachment = null;
    public ?string $id = null;
    public ?string $otp = null;
    public ?string $subject = null;
    public ?string $verification_link = null;
}

/** Request payload for PublicV1Message#load. */
class PublicV1MessageLoadMatch
{
    public string $inbox_id;
    public ?string $since = null;
    public ?int $timeout = null;
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
    public ?string $createdAt = null;
    public ?int $failureCount = null;
    public ?string $id = null;
    public string $inbox;
    public string $url;
}

/** Request payload for PublicV1Webhook#list. */
class PublicV1WebhookListMatch
{
    public ?string $createdAt = null;
    public ?int $failureCount = null;
    public ?string $id = null;
    public ?string $inbox = null;
    public ?string $url = null;
}

/** Request payload for PublicV1Webhook#create. */
class PublicV1WebhookCreateData
{
    public ?string $createdAt = null;
    public ?int $failureCount = null;
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
    public ?array $credits = null;
    public ?array $period = null;
    public ?string $plan = null;
    public ?array $rate_limit = null;
    public ?array $requests = null;
}

/** Request payload for Usage#load. */
class UsageLoadMatch
{
    public ?array $credits = null;
    public ?array $period = null;
    public ?string $plan = null;
    public ?array $rate_limit = null;
    public ?array $requests = null;
}

