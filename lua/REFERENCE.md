# CustomTempMail Lua SDK Reference

Complete API reference for the CustomTempMail Lua SDK.


## CustomTempMailSDK

### Constructor

```lua
local sdk = require("custom-temp-mail_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `CustomDomain(data)`

Create a new `CustomDomain` entity instance. Pass `nil` for no initial data.

#### `CustomDomainVerify(data)`

Create a new `CustomDomainVerify` entity instance. Pass `nil` for no initial data.

#### `Domain(data)`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `DomainsAll(data)`

Create a new `DomainsAll` entity instance. Pass `nil` for no initial data.

#### `Inbox(data)`

Create a new `Inbox` entity instance. Pass `nil` for no initial data.

#### `Men(data)`

Create a new `Men` entity instance. Pass `nil` for no initial data.

#### `Message(data)`

Create a new `Message` entity instance. Pass `nil` for no initial data.

#### `Otp(data)`

Create a new `Otp` entity instance. Pass `nil` for no initial data.

#### `Plan(data)`

Create a new `Plan` entity instance. Pass `nil` for no initial data.

#### `PublicV1DashboardAnalytics(data)`

Create a new `PublicV1DashboardAnalytics` entity instance. Pass `nil` for no initial data.

#### `PublicV1Inbox(data)`

Create a new `PublicV1Inbox` entity instance. Pass `nil` for no initial data.

#### `PublicV1Message(data)`

Create a new `PublicV1Message` entity instance. Pass `nil` for no initial data.

#### `PublicV1Webhook(data)`

Create a new `PublicV1Webhook` entity instance. Pass `nil` for no initial data.

#### `Usage(data)`

Create a new `Usage` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CustomDomainEntity

```lua
local custom_domain = client:CustomDomain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `string` | No |  |
| `data` | `table` | Yes |  |
| `domain` | `string` | Yes |  |
| `message` | `string` | No |  |
| `mx_record` | `string` | Yes |  |
| `success` | `boolean` | No |  |
| `txt_record` | `string` | Yes |  |
| `verified` | `boolean` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CustomDomain():create({
  data = --[[ table ]],
  domain = --[[ string ]],
  mx_record = --[[ string ]],
  txt_record = --[[ string ]],
  verified = --[[ boolean ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:CustomDomain():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:CustomDomain():remove({ id = "id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CustomDomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CustomDomainVerifyEntity

```lua
local custom_domain_verify = client:CustomDomainVerify(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | Yes |  |
| `message` | `string` | No |  |
| `success` | `boolean` | No |  |
| `verified` | `boolean` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:CustomDomainVerify():create({
  domain = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CustomDomainVerifyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainEntity

```lua
local domain = client:Domain(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `expires_at` | `string` | No |  |
| `expires_in_day` | `number` | No |  |
| `expiring_soon` | `boolean` | No |  |
| `tag` | `table` | Yes |  |
| `tier` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Domain():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainsAllEntity

```lua
local domains_all = client:DomainsAll(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `expired` | `boolean` | Yes |  |
| `expires_at` | `string` | No |  |
| `expires_in_day` | `number` | No |  |
| `expiring_soon` | `boolean` | No |  |
| `tag` | `table` | Yes |  |
| `tier` | `string` | Yes |  |

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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:DomainsAll():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainsAllEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InboxEntity

```lua
local inbox = client:Inbox(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | No |  |
| `inbox` | `string` | No |  |
| `is_testing` | `boolean` | No |  |
| `message` | `string` | No |  |
| `success` | `boolean` | No |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `data` | - | - |
| `inbox` | - | Yes |
| `is_testing` | - | - |
| `message` | - | - |
| `success` | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Inbox():create({
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Inbox():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MenEntity

```lua
local men = client:Men(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Men():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MessageEntity

```lua
local message = client:Message(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Message():load({ id = "message_id", inbox_id = "inbox_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OtpEntity

```lua
local otp = client:Otp(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Otp():load({ inbox_id = "inbox_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OtpEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PlanEntity

```lua
local plan = client:Plan(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Plan():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlanEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PublicV1DashboardAnalyticsEntity

```lua
local public_v1_dashboard_analytics = client:PublicV1DashboardAnalytics(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PublicV1DashboardAnalytics():load({ inbox_id = "inbox_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicV1DashboardAnalyticsEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PublicV1InboxEntity

```lua
local public_v1_inbox = client:PublicV1Inbox(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | No |  |
| `custom_firstname` | `table` | No |  |
| `custom_surname` | `table` | No |  |
| `daily_limit` | `number` | No |  |
| `daily_remaining` | `number` | No |  |
| `daily_used` | `number` | No |  |
| `data` | `table` | No |  |
| `domain` | `table` | No |  |
| `domain_mode` | `string` | No |  |
| `inbox` | `table` | No |  |
| `output_format` | `string` | No |  |
| `parse_code` | `boolean` | No |  |
| `since` | `number` | No |  |
| `success` | `boolean` | No |  |
| `test_id` | `string` | No |  |
| `username_style` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:PublicV1Inbox():create({
})
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:PublicV1Inbox():remove({ id = "id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicV1InboxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PublicV1MessageEntity

```lua
local public_v1_message = client:PublicV1Message(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | No |  |
| `message` | `string` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PublicV1Message():load({ inbox_id = "inbox_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:PublicV1Message():remove({ id = "id", inbox_id = "inbox_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicV1MessageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PublicV1WebhookEntity

```lua
local public_v1_webhook = client:PublicV1Webhook(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `failure_count` | `number` | No |  |
| `id` | `string` | No |  |
| `inbox` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `created_at` | - | - | - |
| `failure_count` | - | - | - |
| `id` | - | - | - |
| `inbox` | Yes | - | - |
| `url` | Yes | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:PublicV1Webhook():create({
  inbox = --[[ string ]],
  url = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PublicV1Webhook():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:PublicV1Webhook():remove({ id = "id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicV1WebhookEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UsageEntity

```lua
local usage = client:Usage(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Usage():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

