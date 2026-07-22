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
| `added_at` | `String` | No |  |
| `data` | `Hash` | Yes |  |
| `domain` | `String` | Yes |  |
| `message` | `String` | No |  |
| `mx_record` | `String` | Yes |  |
| `success` | `Boolean` | No |  |
| `txt_record` | `String` | Yes |  |
| `verified` | `Boolean` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CustomDomain.create({
  "data" => {}, # Hash
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
| `data` | `Hash` | Yes |  |
| `message` | `String` | No |  |
| `success` | `Boolean` | No |  |
| `verified` | `Boolean` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.CustomDomainVerify.create({
  "domain" => "example_domain", # String
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
| `domain` | `String` | Yes |  |
| `expires_at` | `String` | No |  |
| `expires_in_day` | `Integer` | No |  |
| `expiring_soon` | `Boolean` | No |  |
| `tag` | `Array` | Yes |  |
| `tier` | `String` | Yes |  |

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
| `domain` | `String` | Yes |  |
| `expired` | `Boolean` | Yes |  |
| `expires_at` | `String` | No |  |
| `expires_in_day` | `Integer` | No |  |
| `expiring_soon` | `Boolean` | No |  |
| `tag` | `Array` | Yes |  |
| `tier` | `String` | Yes |  |

### Field Usage by Operation

| Field | list |
| --- | --- |
| `domain` | - |
| `expired` | - |
| `expires_at` | Yes |
| `expires_in_day` | Yes |
| `expiring_soon` | Yes |
| `tag` | - |
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
| `data` | `Hash` | No |  |
| `inbox` | `String` | No |  |
| `is_testing` | `Boolean` | No |  |
| `message` | `String` | No |  |
| `success` | `Boolean` | No |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `data` | - | - |
| `inbox` | - | Yes |
| `is_testing` | - | - |
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
| `data` | `Hash` | No |  |
| `success` | `Boolean` | No |  |

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
| `data` | `Hash` | No |  |
| `success` | `Boolean` | No |  |

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
| `data` | `Hash` | No |  |
| `success` | `Boolean` | No |  |

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
| `data` | `Hash` | No |  |
| `success` | `Boolean` | No |  |

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
| `data` | `Hash` | No |  |
| `success` | `Boolean` | No |  |

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
| `count` | `Integer` | No |  |
| `custom_firstname` | `Array` | No |  |
| `custom_surname` | `Array` | No |  |
| `daily_limit` | `Integer` | No |  |
| `daily_remaining` | `Integer` | No |  |
| `daily_used` | `Integer` | No |  |
| `data` | `Hash` | No |  |
| `domain` | `Array` | No |  |
| `domain_mode` | `String` | No |  |
| `inbox` | `Array` | No |  |
| `output_format` | `String` | No |  |
| `parse_code` | `Boolean` | No |  |
| `since` | `Integer` | No |  |
| `success` | `Boolean` | No |  |
| `test_id` | `String` | No |  |
| `username_style` | `String` | No |  |

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
| `data` | `Hash` | No |  |
| `message` | `String` | No |  |
| `success` | `Boolean` | No |  |

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
| `created_at` | `String` | No |  |
| `failure_count` | `Integer` | No |  |
| `id` | `String` | No |  |
| `inbox` | `String` | Yes |  |
| `url` | `String` | Yes |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `created_at` | - | - | - |
| `failure_count` | - | - | - |
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
| `data` | `Hash` | No |  |
| `success` | `Boolean` | No |  |

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = CustomTempMailSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

