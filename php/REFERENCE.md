# CustomTempMail PHP SDK Reference

Complete API reference for the CustomTempMail PHP SDK.


## CustomTempMailSDK

### Constructor

```php
require_once __DIR__ . '/customtempmail_sdk.php';

$client = new CustomTempMailSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CustomTempMailSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = CustomTempMailSDK::test();
```


### Instance Methods

#### `CustomDomain($data = null)`

Create a new `CustomDomainEntity` instance. Pass `null` for no initial data.

#### `CustomDomainVerify($data = null)`

Create a new `CustomDomainVerifyEntity` instance. Pass `null` for no initial data.

#### `Domain($data = null)`

Create a new `DomainEntity` instance. Pass `null` for no initial data.

#### `DomainsAll($data = null)`

Create a new `DomainsAllEntity` instance. Pass `null` for no initial data.

#### `Inbox($data = null)`

Create a new `InboxEntity` instance. Pass `null` for no initial data.

#### `Men($data = null)`

Create a new `MenEntity` instance. Pass `null` for no initial data.

#### `Message($data = null)`

Create a new `MessageEntity` instance. Pass `null` for no initial data.

#### `Otp($data = null)`

Create a new `OtpEntity` instance. Pass `null` for no initial data.

#### `Plan($data = null)`

Create a new `PlanEntity` instance. Pass `null` for no initial data.

#### `PublicV1DashboardAnalytics($data = null)`

Create a new `PublicV1DashboardAnalyticsEntity` instance. Pass `null` for no initial data.

#### `PublicV1Inbox($data = null)`

Create a new `PublicV1InboxEntity` instance. Pass `null` for no initial data.

#### `PublicV1Message($data = null)`

Create a new `PublicV1MessageEntity` instance. Pass `null` for no initial data.

#### `PublicV1Webhook($data = null)`

Create a new `PublicV1WebhookEntity` instance. Pass `null` for no initial data.

#### `Usage($data = null)`

Create a new `UsageEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): CustomTempMailUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CustomDomainEntity

```php
$custom_domain = $client->CustomDomain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `string` | No | ISO 8601 timestamp when the domain was added. |
| `domain` | `string` | Yes | Bare domain name (no leading @). |
| `id` | `string` | No |  |
| `mx_record` | `string` | Yes | The MX record value to add at your registrar. |
| `txt_record` | `string` | Yes | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `bool` | Yes | `true` — MX and TXT records confirmed. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CustomDomain()->create([
  "domain" => null, // string
  "mx_record" => null, // string
  "txt_record" => null, // string
  "verified" => null, // bool
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->CustomDomain()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->CustomDomain()->remove(["id" => "id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CustomDomainEntity`

Create a new `CustomDomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CustomDomainVerifyEntity

```php
$custom_domain_verify = $client->CustomDomainVerify();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `string` | No | ISO 8601 timestamp when the domain was added. |
| `domain` | `string` | Yes | Bare domain name (no leading @). |
| `mx_record` | `string` | Yes | The MX record value to add at your registrar. |
| `txt_record` | `string` | Yes | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `bool` | Yes | `true` — MX and TXT records confirmed. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->CustomDomainVerify()->create([
  "domain" => null, // string
  "mx_record" => null, // string
  "txt_record" => null, // string
  "verified" => null, // bool
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CustomDomainVerifyEntity`

Create a new `CustomDomainVerifyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainEntity

```php
$domain = $client->Domain();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes | Bare domain name (no leading @). |
| `expires_at` | `string` | No | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `int` | No | Days remaining until expiry. |
| `expiring_soon` | `bool` | No | True when the domain expires within 30 days. |
| `tags` | `array` | Yes | `new` — recently added, shown for ~30 days. |
| `tier` | `string` | Yes | `free` — available on all plans. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Domain()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainEntity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainsAllEntity

```php
$domains_all = $client->DomainsAll();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes | Bare domain name (no leading @). |
| `expired` | `bool` | Yes | True when the domain has already passed its expiry date. |
| `expires_at` | `string` | No | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `int` | No | Days remaining until expiry. |
| `expiring_soon` | `bool` | No | True when the domain expires within 30 days. |
| `tags` | `array` | Yes | `new` — recently added, shown for ~30 days. |
| `tier` | `string` | Yes | `free` — available on all plans. |

### Field Usage by Operation

| Field | list |
| --- | --- |
| `domain` | - |
| `expired` | - |
| `expires_at` | Yes |
| `expires_in_days` | Yes |
| `expiring_soon` | Yes |
| `tags` | - |
| `tier` | - |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->DomainsAll()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainsAllEntity`

Create a new `DomainsAllEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InboxEntity

```php
$inbox = $client->Inbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No |  |
| `inbox` | `string` | No |  |
| `inboxes` | `array` | No |  |
| `isTesting` | `bool` | No | Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger. |
| `message` | `string` | No |  |
| `success` | `bool` | No |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `count` | - | - |
| `inbox` | - | Yes |
| `inboxes` | - | - |
| `isTesting` | - | - |
| `message` | - | - |
| `success` | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Inbox()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Inbox()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InboxEntity`

Create a new `InboxEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MenEntity

```php
$men = $client->Men();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_inbox_count` | `int` | No |  |
| `api_inboxes` | `array` | No |  |
| `app_inbox_count` | `int` | No |  |
| `app_inboxes` | `array` | No |  |
| `credits` | `int` | No |  |
| `custom_domain_count` | `int` | No |  |
| `custom_domains` | `array` | No |  |
| `features` | `array` | No |  |
| `plan` | `string` | No |  |
| `rate_limits` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Men()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MenEntity`

Create a new `MenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MessageEntity

```php
$message = $client->Message();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `array` | No |  |
| `count` | `int` | No |  |
| `date` | `string` | No |  |
| `from` | `string` | No |  |
| `has_attachment` | `bool` | No |  |
| `has_more` | `bool` | No |  |
| `html` | `string` | No |  |
| `id` | `string` | No |  |
| `inbox` | `string` | No |  |
| `messages` | `array` | No |  |
| `otp` | `string` | No |  |
| `subject` | `string` | No |  |
| `text` | `string` | No |  |
| `to` | `string` | No |  |
| `verification_link` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Message()->load(["id" => "message_id", "inbox_id" => "inbox_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MessageEntity`

Create a new `MessageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OtpEntity

```php
$otp = $client->Otp();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No |  |
| `inbox` | `string` | No |  |
| `message` | `string` | No |  |
| `message_id` | `string` | No |  |
| `otp` | `string` | No |  |
| `received_at` | `string` | No |  |
| `score` | `float` | No | Confidence score (0.0 to 1.0) of the extracted OTP. |
| `subject` | `string` | No |  |
| `verification_link` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Otp()->load(["inbox_id" => "inbox_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OtpEntity`

Create a new `OtpEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PlanEntity

```php
$plan = $client->Plan();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credit_packages` | `array` | No |  |
| `plans` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Plan()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PlanEntity`

Create a new `PlanEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PublicV1DashboardAnalyticsEntity

```php
$public_v1_dashboard_analytics = $client->PublicV1DashboardAnalytics();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyzed_at` | `string` | No |  |
| `duration_hours` | `int` | No |  |
| `event_count` | `int` | No |  |
| `events` | `array` | No |  |
| `inbox` | `string` | No |  |
| `insights` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PublicV1DashboardAnalytics()->load(["inbox_id" => "inbox_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PublicV1DashboardAnalyticsEntity`

Create a new `PublicV1DashboardAnalyticsEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PublicV1InboxEntity

```php
$public_v1_inbox = $client->PublicV1Inbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | Number of inboxes to generate (1–500 depending on plan). |
| `custom_firstnames` | `array` | No | Custom first-name pool for `firstname.surname` style. |
| `custom_surnames` | `array` | No | Custom surname pool for `firstname.surname` style. |
| `daily_limit` | `int` | No |  |
| `daily_remaining` | `int` | No |  |
| `daily_used` | `int` | No |  |
| `domain_mode` | `string` | No | Which domain pool to use. |
| `domains` | `array` | No | Required when `domain_mode` is `specific`. |
| `id` | `string` | No |  |
| `inbox` | `string` | No |  |
| `inboxes` | `array` | No |  |
| `output_format` | `string` | No | Template string for each line of output. |
| `parseCode` | `bool` | No | When `true` (default), embeds `?parseCode=true` in every OTP URL. |
| `since` | `int` | No | Unix timestamp in milliseconds. |
| `started_at` | `string` | No |  |
| `success` | `bool` | No |  |
| `test_id` | `string` | No | Optional custom test ID. |
| `username_style` | `string` | No | Username generation style. |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->PublicV1Inbox()->create([
]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->PublicV1Inbox()->remove(["id" => "id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PublicV1InboxEntity`

Create a new `PublicV1InboxEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PublicV1MessageEntity

```php
$public_v1_message = $client->PublicV1Message();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `from` | `string` | No |  |
| `has_attachment` | `bool` | No |  |
| `id` | `string` | No |  |
| `otp` | `string` | No | The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value). |
| `subject` | `string` | No |  |
| `verification_link` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PublicV1Message()->load(["inbox_id" => "inbox_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->PublicV1Message()->remove(["id" => "id", "inbox_id" => "inbox_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PublicV1MessageEntity`

Create a new `PublicV1MessageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PublicV1WebhookEntity

```php
$public_v1_webhook = $client->PublicV1Webhook();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `failureCount` | `int` | No |  |
| `id` | `string` | No |  |
| `inbox` | `string` | Yes | The registered inbox to subscribe to. |
| `url` | `string` | Yes | The HTTPS URL to receive the POST request. |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `failureCount` | - | - | - |
| `id` | - | - | - |
| `inbox` | Yes | - | - |
| `url` | Yes | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->PublicV1Webhook()->create([
  "inbox" => null, // string
  "url" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PublicV1Webhook()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->PublicV1Webhook()->remove(["id" => "id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PublicV1WebhookEntity`

Create a new `PublicV1WebhookEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UsageEntity

```php
$usage = $client->Usage();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credits` | `array` | No |  |
| `period` | `array` | No |  |
| `plan` | `string` | No |  |
| `rate_limit` | `array` | No |  |
| `requests` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Usage()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UsageEntity`

Create a new `UsageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new CustomTempMailSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

