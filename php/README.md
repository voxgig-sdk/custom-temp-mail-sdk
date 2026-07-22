# CustomTempMail PHP SDK



The PHP SDK for the CustomTempMail API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->CustomDomain()` — with named operations (`list`/`load`/`create`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/custom-temp-mail-sdk/releases](https://github.com/voxgig-sdk/custom-temp-mail-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'customtempmail_sdk.php';

$client = new CustomTempMailSDK([
    "apikey" => getenv("CUSTOM_TEMP_MAIL_APIKEY"),
]);
```

### 2. List customdomain records

```php
try {
    // list() returns an array of CustomDomain records — iterate directly.
    $customdomains = $client->CustomDomain()->list();
    foreach ($customdomains as $item) {
        echo $item["added_at"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a message

Message is nested under inbox, so provide the `inbox_id`.

```php
try {
    // load() returns the bare Message record (throws on error).
    $message = $client->Message()->load(["inbox_id" => "example_inbox_id"]);
    print_r($message);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the bare created CustomDomain record.
$created = $client->CustomDomain()->create(["data" => [], "domain" => "example_domain", "mx_record" => "example_mx_record", "txt_record" => "example_txt_record", "verified" => true]);

// Remove
$client->CustomDomain()->remove(["id" => "example_id"]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $customdomains = $client->CustomDomain()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = CustomTempMailSDK::test();

// Entity ops return the bare mock record (throws on error).
$customdomain = $client->CustomDomain()->list();
print_r($customdomain);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new CustomTempMailSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE
CUSTOM_TEMP_MAIL_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### CustomTempMailSDK

```php
require_once 'customtempmail_sdk.php';
$client = new CustomTempMailSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = CustomTempMailSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### CustomTempMailSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `CustomDomain` | `($data): CustomDomainEntity` | Create a CustomDomain entity instance. |
| `CustomDomainVerify` | `($data): CustomDomainVerifyEntity` | Create a CustomDomainVerify entity instance. |
| `Domain` | `($data): DomainEntity` | Create a Domain entity instance. |
| `DomainsAll` | `($data): DomainsAllEntity` | Create a DomainsAll entity instance. |
| `Inbox` | `($data): InboxEntity` | Create an Inbox entity instance. |
| `Men` | `($data): MenEntity` | Create a Men entity instance. |
| `Message` | `($data): MessageEntity` | Create a Message entity instance. |
| `Otp` | `($data): OtpEntity` | Create an Otp entity instance. |
| `Plan` | `($data): PlanEntity` | Create a Plan entity instance. |
| `PublicV1DashboardAnalytics` | `($data): PublicV1DashboardAnalyticsEntity` | Create a PublicV1DashboardAnalytics entity instance. |
| `PublicV1Inbox` | `($data): PublicV1InboxEntity` | Create a PublicV1Inbox entity instance. |
| `PublicV1Message` | `($data): PublicV1MessageEntity` | Create a PublicV1Message entity instance. |
| `PublicV1Webhook` | `($data): PublicV1WebhookEntity` | Create a PublicV1Webhook entity instance. |
| `Usage` | `($data): UsageEntity` | Create an Usage entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### CustomDomain

| Field | Description |
| --- | --- |
| `added_at` |  |
| `data` |  |
| `domain` |  |
| `message` |  |
| `mx_record` |  |
| `success` |  |
| `txt_record` |  |
| `verified` |  |

Operations: Create, List, Remove.

API path: `/v1/custom-domains`

#### CustomDomainVerify

| Field | Description |
| --- | --- |
| `data` |  |
| `message` |  |
| `success` |  |
| `verified` |  |

Operations: Create.

API path: `/v1/custom-domains/{domain}/verify`

#### Domain

| Field | Description |
| --- | --- |
| `domain` |  |
| `expires_at` |  |
| `expires_in_day` |  |
| `expiring_soon` |  |
| `tag` |  |
| `tier` |  |

Operations: List.

API path: `/v1/domains`

#### DomainsAll

| Field | Description |
| --- | --- |
| `domain` |  |
| `expired` |  |
| `expires_at` |  |
| `expires_in_day` |  |
| `expiring_soon` |  |
| `tag` |  |
| `tier` |  |

Operations: List.

API path: `/v1/domains/all`

#### Inbox

| Field | Description |
| --- | --- |
| `data` |  |
| `inbox` |  |
| `is_testing` |  |
| `message` |  |
| `success` |  |

Operations: Create, Load.

API path: `/v1/inboxes`

#### Men

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: Load.

API path: `/v1/me`

#### Message

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: Load.

API path: `/v1/inboxes/{inbox}/messages`

#### Otp

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: Load.

API path: `/v1/inboxes/{inbox}/otp`

#### Plan

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: Load.

API path: `/v1/plans`

#### PublicV1DashboardAnalytics

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: Load.

API path: `/v1/inboxes/{inbox}/timeline`

#### PublicV1Inbox

| Field | Description |
| --- | --- |
| `count` |  |
| `custom_firstname` |  |
| `custom_surname` |  |
| `daily_limit` |  |
| `daily_remaining` |  |
| `daily_used` |  |
| `data` |  |
| `domain` |  |
| `domain_mode` |  |
| `inbox` |  |
| `output_format` |  |
| `parse_code` |  |
| `since` |  |
| `success` |  |
| `test_id` |  |
| `username_style` |  |

Operations: Create, Remove.

API path: `/v1/inboxes/{inbox}/tests`

#### PublicV1Message

| Field | Description |
| --- | --- |
| `data` |  |
| `message` |  |
| `success` |  |

Operations: Load, Remove.

API path: `/v1/inboxes/{inbox}/wait`

#### PublicV1Webhook

| Field | Description |
| --- | --- |
| `created_at` |  |
| `failure_count` |  |
| `id` |  |
| `inbox` |  |
| `url` |  |

Operations: Create, List, Remove.

API path: `/v1/webhooks`

#### Usage

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: Load.

API path: `/v1/usage`



## Entities


### CustomDomain

Create an instance: `$custom_domain = $client->CustomDomain();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `string` |  |
| `data` | `array` |  |
| `domain` | `string` |  |
| `message` | `string` |  |
| `mx_record` | `string` |  |
| `success` | `bool` |  |
| `txt_record` | `string` |  |
| `verified` | `bool` |  |

#### Example: List

```php
// list() returns an array of CustomDomain records (throws on error).
$custom_domains = $client->CustomDomain()->list();
```

#### Example: Create

```php
$custom_domain = $client->CustomDomain()->create([
    "data" => null, // array
    "domain" => null, // string
    "mx_record" => null, // string
    "txt_record" => null, // string
    "verified" => null, // bool
]);
```


### CustomDomainVerify

Create an instance: `$custom_domain_verify = $client->CustomDomainVerify();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `message` | `string` |  |
| `success` | `bool` |  |
| `verified` | `bool` |  |

#### Example: Create

```php
$custom_domain_verify = $client->CustomDomainVerify()->create([
    "domain" => null, // string
]);
```


### Domain

Create an instance: `$domain = $client->Domain();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `expires_at` | `string` |  |
| `expires_in_day` | `int` |  |
| `expiring_soon` | `bool` |  |
| `tag` | `array` |  |
| `tier` | `string` |  |

#### Example: List

```php
// list() returns an array of Domain records (throws on error).
$domains = $client->Domain()->list();
```


### DomainsAll

Create an instance: `$domains_all = $client->DomainsAll();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `expired` | `bool` |  |
| `expires_at` | `string` |  |
| `expires_in_day` | `int` |  |
| `expiring_soon` | `bool` |  |
| `tag` | `array` |  |
| `tier` | `string` |  |

#### Example: List

```php
// list() returns an array of DomainsAll records (throws on error).
$domains_alls = $client->DomainsAll()->list();
```


### Inbox

Create an instance: `$inbox = $client->Inbox();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `inbox` | `string` |  |
| `is_testing` | `bool` |  |
| `message` | `string` |  |
| `success` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Inbox record (throws on error).
$inbox = $client->Inbox()->load();
```

#### Example: Create

```php
$inbox = $client->Inbox()->create([
]);
```


### Men

Create an instance: `$men = $client->Men();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `success` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Men record (throws on error).
$men = $client->Men()->load();
```


### Message

Create an instance: `$message = $client->Message();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `success` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Message record (throws on error).
$message = $client->Message()->load(["id" => "message_id", "inbox_id" => "inbox_id"]);
```


### Otp

Create an instance: `$otp = $client->Otp();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `success` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Otp record (throws on error).
$otp = $client->Otp()->load(["inbox_id" => "inbox_id"]);
```


### Plan

Create an instance: `$plan = $client->Plan();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `success` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Plan record (throws on error).
$plan = $client->Plan()->load();
```


### PublicV1DashboardAnalytics

Create an instance: `$public_v1_dashboard_analytics = $client->PublicV1DashboardAnalytics();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `success` | `bool` |  |

#### Example: Load

```php
// load() returns the bare PublicV1DashboardAnalytics record (throws on error).
$public_v1_dashboard_analytics = $client->PublicV1DashboardAnalytics()->load(["inbox_id" => "inbox_id"]);
```


### PublicV1Inbox

Create an instance: `$public_v1_inbox = $client->PublicV1Inbox();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` |  |
| `custom_firstname` | `array` |  |
| `custom_surname` | `array` |  |
| `daily_limit` | `int` |  |
| `daily_remaining` | `int` |  |
| `daily_used` | `int` |  |
| `data` | `array` |  |
| `domain` | `array` |  |
| `domain_mode` | `string` |  |
| `inbox` | `array` |  |
| `output_format` | `string` |  |
| `parse_code` | `bool` |  |
| `since` | `int` |  |
| `success` | `bool` |  |
| `test_id` | `string` |  |
| `username_style` | `string` |  |

#### Example: Create

```php
$public_v1_inbox = $client->PublicV1Inbox()->create([
]);
```


### PublicV1Message

Create an instance: `$public_v1_message = $client->PublicV1Message();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `message` | `string` |  |
| `success` | `bool` |  |

#### Example: Load

```php
// load() returns the bare PublicV1Message record (throws on error).
$public_v1_message = $client->PublicV1Message()->load(["inbox_id" => "inbox_id"]);
```


### PublicV1Webhook

Create an instance: `$public_v1_webhook = $client->PublicV1Webhook();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `failure_count` | `int` |  |
| `id` | `string` |  |
| `inbox` | `string` |  |
| `url` | `string` |  |

#### Example: List

```php
// list() returns an array of PublicV1Webhook records (throws on error).
$public_v1_webhooks = $client->PublicV1Webhook()->list();
```

#### Example: Create

```php
$public_v1_webhook = $client->PublicV1Webhook()->create([
    "inbox" => null, // string
    "url" => null, // string
]);
```


### Usage

Create an instance: `$usage = $client->Usage();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `success` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Usage record (throws on error).
$usage = $client->Usage()->load();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── customtempmail_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`customtempmail_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$customdomain = $client->CustomDomain();
$customdomain->list();

// $customdomain->data_get() now returns the customdomain data from the last list
// $customdomain->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
