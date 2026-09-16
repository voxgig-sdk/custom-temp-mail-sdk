# CustomTempMail Ruby SDK Reference

Complete API reference for the CustomTempMail Ruby SDK.


## CustomTempMailSDK

### Constructor

```ruby
require_relative 'CustomTempMail_sdk'

client = CustomTempMailSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CustomTempMailSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = CustomTempMailSDK.test
```


### Instance Methods

#### `CustomDomain(data = nil)`

Create a new `CustomDomain` entity instance. Pass `nil` for no initial data.

#### `CustomDomainVerify(data = nil)`

Create a new `CustomDomainVerify` entity instance. Pass `nil` for no initial data.

#### `Domain(data = nil)`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `DomainsAll(data = nil)`

Create a new `DomainsAll` entity instance. Pass `nil` for no initial data.

#### `Inbox(data = nil)`

Create a new `Inbox` entity instance. Pass `nil` for no initial data.

#### `Men(data = nil)`

Create a new `Men` entity instance. Pass `nil` for no initial data.

#### `Message(data = nil)`

Create a new `Message` entity instance. Pass `nil` for no initial data.

#### `Otp(data = nil)`

Create a new `Otp` entity instance. Pass `nil` for no initial data.

#### `Plan(data = nil)`

Create a new `Plan` entity instance. Pass `nil` for no initial data.

#### `PublicV1DashboardAnalytics(data = nil)`

Create a new `PublicV1DashboardAnalytics` entity instance. Pass `nil` for no initial data.

#### `PublicV1Inbox(data = nil)`

Create a new `PublicV1Inbox` entity instance. Pass `nil` for no initial data.

#### `PublicV1Message(data = nil)`

Create a new `PublicV1Message` entity instance. Pass `nil` for no initial data.

#### `PublicV1Webhook(data = nil)`

Create a new `PublicV1Webhook` entity instance. Pass `nil` for no initial data.

#### `Usage(data = nil)`

Create a new `Usage` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CustomDomainEntity

```ruby
custom_domain = client.CustomDomain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `String` | No | ISO 8601 timestamp when the domain was added. |
| `domain` | `String` | Yes | Bare domain name (no leading @). |
| `id` | `String` | No |  |
| `mx_record` | `String` | Yes | The MX record value to add at your registrar. |
| `txt_record` | `String` | Yes | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `Boolean` | Yes | `true` — MX and TXT records confirmed. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CustomDomain.create({
  "domain" => "example_domain", # String
  "mx_record" => "example_mx_record", # String
  "txt_record" => "example_txt_record", # String
  "verified" => true, # Boolean
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.CustomDomain.list
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.CustomDomain.remove({ "id" => "id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CustomDomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CustomDomainVerifyEntity

```ruby
custom_domain_verify = client.CustomDomainVerify
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `String` | No | ISO 8601 timestamp when the domain was added. |
| `domain` | `String` | Yes | Bare domain name (no leading @). |
| `mx_record` | `String` | Yes | The MX record value to add at your registrar. |
| `txt_record` | `String` | Yes | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `Boolean` | Yes | `true` — MX and TXT records confirmed. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CustomDomainVerify.create({
  "domain" => "example_domain", # String
  "mx_record" => "example_mx_record", # String
  "txt_record" => "example_txt_record", # String
  "verified" => true, # Boolean
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CustomDomainVerifyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainEntity

```ruby
domain = client.Domain
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `String` | Yes | Bare domain name (no leading @). |
| `expires_at` | `String` | No | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `Integer` | No | Days remaining until expiry. |
| `expiring_soon` | `Boolean` | No | True when the domain expires within 30 days. |
| `tags` | `Array` | Yes | `new` — recently added, shown for ~30 days. |
| `tier` | `String` | Yes | `free` — available on all plans. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Domain.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DomainsAllEntity

```ruby
domains_all = client.DomainsAll
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `String` | Yes | Bare domain name (no leading @). |
| `expired` | `Boolean` | Yes | True when the domain has already passed its expiry date. |
| `expires_at` | `String` | No | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `Integer` | No | Days remaining until expiry. |
| `expiring_soon` | `Boolean` | No | True when the domain expires within 30 days. |
| `tags` | `Array` | Yes | `new` — recently added, shown for ~30 days. |
| `tier` | `String` | Yes | `free` — available on all plans. |

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

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.DomainsAll.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DomainsAllEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InboxEntity

```ruby
inbox = client.Inbox
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | No |  |
| `inbox` | `String` | No |  |
| `inboxes` | `Array` | No |  |
| `isTesting` | `Boolean` | No | Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger. |
| `message` | `String` | No |  |
| `success` | `Boolean` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Inbox.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Inbox.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InboxEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MenEntity

```ruby
men = client.Men
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_inbox_count` | `Integer` | No |  |
| `api_inboxes` | `Array` | No |  |
| `app_inbox_count` | `Integer` | No |  |
| `app_inboxes` | `Array` | No |  |
| `credits` | `Integer` | No |  |
| `custom_domain_count` | `Integer` | No |  |
| `custom_domains` | `Array` | No |  |
| `features` | `Hash` | No |  |
| `plan` | `String` | No |  |
| `rate_limits` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Men.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MessageEntity

```ruby
message = client.Message
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `Array` | No |  |
| `count` | `Integer` | No |  |
| `date` | `String` | No |  |
| `from` | `String` | No |  |
| `has_attachment` | `Boolean` | No |  |
| `has_more` | `Boolean` | No |  |
| `html` | `String` | No |  |
| `id` | `String` | No |  |
| `inbox` | `String` | No |  |
| `messages` | `Array` | No |  |
| `otp` | `String` | No |  |
| `subject` | `String` | No |  |
| `text` | `String` | No |  |
| `to` | `String` | No |  |
| `verification_link` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Message.load({ "id" => "message_id", "inbox_id" => "inbox_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MessageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OtpEntity

```ruby
otp = client.Otp
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `String` | No |  |
| `inbox` | `String` | No |  |
| `message` | `String` | No |  |
| `message_id` | `String` | No |  |
| `otp` | `String` | No |  |
| `received_at` | `String` | No |  |
| `score` | `Float` | No | Confidence score (0.0 to 1.0) of the extracted OTP. |
| `subject` | `String` | No |  |
| `verification_link` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Otp.load({ "inbox_id" => "inbox_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OtpEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlanEntity

```ruby
plan = client.Plan
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credit_packages` | `Array` | No |  |
| `plans` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Plan.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlanEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PublicV1DashboardAnalyticsEntity

```ruby
public_v1_dashboard_analytics = client.PublicV1DashboardAnalytics
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyzed_at` | `String` | No |  |
| `duration_hours` | `Integer` | No |  |
| `event_count` | `Integer` | No |  |
| `events` | `Array` | No |  |
| `inbox` | `String` | No |  |
| `insights` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PublicV1DashboardAnalytics.load({ "inbox_id" => "inbox_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PublicV1DashboardAnalyticsEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PublicV1InboxEntity

```ruby
public_v1_inbox = client.PublicV1Inbox
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `Integer` | No | Number of inboxes to generate (1–500 depending on plan). |
| `custom_firstnames` | `Array` | No | Custom first-name pool for `firstname.surname` style. |
| `custom_surnames` | `Array` | No | Custom surname pool for `firstname.surname` style. |
| `daily_limit` | `Integer` | No |  |
| `daily_remaining` | `Integer` | No |  |
| `daily_used` | `Integer` | No |  |
| `domain_mode` | `String` | No | Which domain pool to use. |
| `domains` | `Array` | No | Required when `domain_mode` is `specific`. |
| `id` | `String` | No |  |
| `inbox` | `String` | No |  |
| `inboxes` | `Array` | No |  |
| `output_format` | `String` | No | Template string for each line of output. |
| `parseCode` | `Boolean` | No | When `true` (default), embeds `?parseCode=true` in every OTP URL. |
| `since` | `Integer` | No | Unix timestamp in milliseconds. |
| `started_at` | `String` | No |  |
| `success` | `Boolean` | No |  |
| `test_id` | `String` | No | Optional custom test ID. |
| `username_style` | `String` | No | Username generation style. |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.PublicV1Inbox.create({
})
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.PublicV1Inbox.remove({ "id" => "id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PublicV1InboxEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PublicV1MessageEntity

```ruby
public_v1_message = client.PublicV1Message
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `String` | No |  |
| `from` | `String` | No |  |
| `has_attachment` | `Boolean` | No |  |
| `id` | `String` | No |  |
| `otp` | `String` | No | The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value). |
| `subject` | `String` | No |  |
| `verification_link` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PublicV1Message.load({ "inbox_id" => "inbox_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.PublicV1Message.remove({ "id" => "id", "inbox_id" => "inbox_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PublicV1MessageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PublicV1WebhookEntity

```ruby
public_v1_webhook = client.PublicV1Webhook
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | No |  |
| `failureCount` | `Integer` | No |  |
| `id` | `String` | No |  |
| `inbox` | `String` | Yes | The registered inbox to subscribe to. |
| `url` | `String` | Yes | The HTTPS URL to receive the POST request. |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `failureCount` | - | - | - |
| `id` | - | - | - |
| `inbox` | Yes | - | - |
| `url` | Yes | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.PublicV1Webhook.create({
  "inbox" => "example_inbox", # String
  "url" => "example_url", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PublicV1Webhook.list
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.PublicV1Webhook.remove({ "id" => "id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PublicV1WebhookEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UsageEntity

```ruby
usage = client.Usage
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credits` | `Hash` | No |  |
| `period` | `Hash` | No |  |
| `plan` | `String` | No |  |
| `rate_limit` | `Hash` | No |  |
| `requests` | `Hash` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Usage.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UsageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ruby
client = CustomTempMailSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

