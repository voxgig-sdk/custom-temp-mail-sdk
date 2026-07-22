# CustomTempMail Ruby SDK



The Ruby SDK for the CustomTempMail API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CustomDomain` — with named operations (`list`/`load`/`create`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/custom-temp-mail-sdk/releases](https://github.com/voxgig-sdk/custom-temp-mail-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "CustomTempMail_sdk"

client = CustomTempMailSDK.new({
  "apikey" => ENV["CUSTOM_TEMP_MAIL_APIKEY"],
})
```

### 2. List customdomain records

```ruby
begin
  # list returns an Array of CustomDomain records — iterate directly.
  customdomains = client.CustomDomain.list
  customdomains.each do |item|
    puts "#{item["added_at"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a message

Message is nested under inbox, so provide the `inbox_id`.

```ruby
begin
  # load returns the bare Message record (raises on error).
  message = client.Message.load({ "inbox_id" => "example_inbox_id" })
  puts message
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the bare created CustomDomain record.
created = client.CustomDomain.create({ "data" => {}, "domain" => "example_domain", "mx_record" => "example_mx_record", "txt_record" => "example_txt_record", "verified" => true })

# Remove
client.CustomDomain.remove({ "id" => "example_id" })
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  customdomains = client.CustomDomain.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = CustomTempMailSDK.test

# Entity ops return the bare mock record (raises on error).
customdomain = client.CustomDomain.list()
puts customdomain
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = CustomTempMailSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE
CUSTOM_TEMP_MAIL_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### CustomTempMailSDK

```ruby
require_relative "CustomTempMail_sdk"
client = CustomTempMailSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = CustomTempMailSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CustomTempMailSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `CustomDomain` | `(data) -> CustomDomainEntity` | Create a CustomDomain entity instance. |
| `CustomDomainVerify` | `(data) -> CustomDomainVerifyEntity` | Create a CustomDomainVerify entity instance. |
| `Domain` | `(data) -> DomainEntity` | Create a Domain entity instance. |
| `DomainsAll` | `(data) -> DomainsAllEntity` | Create a DomainsAll entity instance. |
| `Inbox` | `(data) -> InboxEntity` | Create an Inbox entity instance. |
| `Men` | `(data) -> MenEntity` | Create a Men entity instance. |
| `Message` | `(data) -> MessageEntity` | Create a Message entity instance. |
| `Otp` | `(data) -> OtpEntity` | Create an Otp entity instance. |
| `Plan` | `(data) -> PlanEntity` | Create a Plan entity instance. |
| `PublicV1DashboardAnalytics` | `(data) -> PublicV1DashboardAnalyticsEntity` | Create a PublicV1DashboardAnalytics entity instance. |
| `PublicV1Inbox` | `(data) -> PublicV1InboxEntity` | Create a PublicV1Inbox entity instance. |
| `PublicV1Message` | `(data) -> PublicV1MessageEntity` | Create a PublicV1Message entity instance. |
| `PublicV1Webhook` | `(data) -> PublicV1WebhookEntity` | Create a PublicV1Webhook entity instance. |
| `Usage` | `(data) -> UsageEntity` | Create an Usage entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `CustomTempMailError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `custom_domain = client.CustomDomain`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `String` |  |
| `data` | `Hash` |  |
| `domain` | `String` |  |
| `message` | `String` |  |
| `mx_record` | `String` |  |
| `success` | `Boolean` |  |
| `txt_record` | `String` |  |
| `verified` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of CustomDomain records (raises on error).
custom_domains = client.CustomDomain.list
```

#### Example: Create

```ruby
custom_domain = client.CustomDomain.create({
  "data" => {}, # Hash
  "domain" => "example_domain", # String
  "mx_record" => "example_mx_record", # String
  "txt_record" => "example_txt_record", # String
  "verified" => true, # Boolean
})
```


### CustomDomainVerify

Create an instance: `custom_domain_verify = client.CustomDomainVerify`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `message` | `String` |  |
| `success` | `Boolean` |  |
| `verified` | `Boolean` |  |

#### Example: Create

```ruby
custom_domain_verify = client.CustomDomainVerify.create({
  "domain" => "example_domain", # String
})
```


### Domain

Create an instance: `domain = client.Domain`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `String` |  |
| `expires_at` | `String` |  |
| `expires_in_day` | `Integer` |  |
| `expiring_soon` | `Boolean` |  |
| `tag` | `Array` |  |
| `tier` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Domain records (raises on error).
domains = client.Domain.list
```


### DomainsAll

Create an instance: `domains_all = client.DomainsAll`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `String` |  |
| `expired` | `Boolean` |  |
| `expires_at` | `String` |  |
| `expires_in_day` | `Integer` |  |
| `expiring_soon` | `Boolean` |  |
| `tag` | `Array` |  |
| `tier` | `String` |  |

#### Example: List

```ruby
# list returns an Array of DomainsAll records (raises on error).
domains_alls = client.DomainsAll.list
```


### Inbox

Create an instance: `inbox = client.Inbox`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `inbox` | `String` |  |
| `is_testing` | `Boolean` |  |
| `message` | `String` |  |
| `success` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare Inbox record (raises on error).
inbox = client.Inbox.load()
```

#### Example: Create

```ruby
inbox = client.Inbox.create({
})
```


### Men

Create an instance: `men = client.Men`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `success` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare Men record (raises on error).
men = client.Men.load()
```


### Message

Create an instance: `message = client.Message`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `success` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare Message record (raises on error).
message = client.Message.load({ "id" => "message_id", "inbox_id" => "inbox_id" })
```


### Otp

Create an instance: `otp = client.Otp`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `success` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare Otp record (raises on error).
otp = client.Otp.load({ "inbox_id" => "inbox_id" })
```


### Plan

Create an instance: `plan = client.Plan`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `success` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare Plan record (raises on error).
plan = client.Plan.load()
```


### PublicV1DashboardAnalytics

Create an instance: `public_v1_dashboard_analytics = client.PublicV1DashboardAnalytics`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `success` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare PublicV1DashboardAnalytics record (raises on error).
public_v1_dashboard_analytics = client.PublicV1DashboardAnalytics.load({ "inbox_id" => "inbox_id" })
```


### PublicV1Inbox

Create an instance: `public_v1_inbox = client.PublicV1Inbox`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `Integer` |  |
| `custom_firstname` | `Array` |  |
| `custom_surname` | `Array` |  |
| `daily_limit` | `Integer` |  |
| `daily_remaining` | `Integer` |  |
| `daily_used` | `Integer` |  |
| `data` | `Hash` |  |
| `domain` | `Array` |  |
| `domain_mode` | `String` |  |
| `inbox` | `Array` |  |
| `output_format` | `String` |  |
| `parse_code` | `Boolean` |  |
| `since` | `Integer` |  |
| `success` | `Boolean` |  |
| `test_id` | `String` |  |
| `username_style` | `String` |  |

#### Example: Create

```ruby
public_v1_inbox = client.PublicV1Inbox.create({
})
```


### PublicV1Message

Create an instance: `public_v1_message = client.PublicV1Message`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `message` | `String` |  |
| `success` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare PublicV1Message record (raises on error).
public_v1_message = client.PublicV1Message.load({ "inbox_id" => "inbox_id" })
```


### PublicV1Webhook

Create an instance: `public_v1_webhook = client.PublicV1Webhook`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `failure_count` | `Integer` |  |
| `id` | `String` |  |
| `inbox` | `String` |  |
| `url` | `String` |  |

#### Example: List

```ruby
# list returns an Array of PublicV1Webhook records (raises on error).
public_v1_webhooks = client.PublicV1Webhook.list
```

#### Example: Create

```ruby
public_v1_webhook = client.PublicV1Webhook.create({
  "inbox" => "example_inbox", # String
  "url" => "example_url", # String
})
```


### Usage

Create an instance: `usage = client.Usage`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Hash` |  |
| `success` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the bare Usage record (raises on error).
usage = client.Usage.load()
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── CustomTempMail_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`CustomTempMail_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
customdomain = client.CustomDomain
customdomain.list()

# customdomain.data_get now returns the customdomain data from the last list
# customdomain.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
