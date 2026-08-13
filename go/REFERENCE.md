# CustomTempMail Golang SDK Reference

Complete API reference for the CustomTempMail Golang SDK.


## CustomTempMailSDK

### Constructor

```go
func NewCustomTempMailSDK(options map[string]any) *CustomTempMailSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *CustomTempMailSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *CustomTempMailSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `CustomDomain(data map[string]any) CustomTempMailEntity`

Create a new `CustomDomain` entity instance. Pass `nil` for no initial data.

#### `CustomDomainVerify(data map[string]any) CustomTempMailEntity`

Create a new `CustomDomainVerify` entity instance. Pass `nil` for no initial data.

#### `Domain(data map[string]any) CustomTempMailEntity`

Create a new `Domain` entity instance. Pass `nil` for no initial data.

#### `DomainsAll(data map[string]any) CustomTempMailEntity`

Create a new `DomainsAll` entity instance. Pass `nil` for no initial data.

#### `Inbox(data map[string]any) CustomTempMailEntity`

Create a new `Inbox` entity instance. Pass `nil` for no initial data.

#### `Men(data map[string]any) CustomTempMailEntity`

Create a new `Men` entity instance. Pass `nil` for no initial data.

#### `Message(data map[string]any) CustomTempMailEntity`

Create a new `Message` entity instance. Pass `nil` for no initial data.

#### `Otp(data map[string]any) CustomTempMailEntity`

Create a new `Otp` entity instance. Pass `nil` for no initial data.

#### `Plan(data map[string]any) CustomTempMailEntity`

Create a new `Plan` entity instance. Pass `nil` for no initial data.

#### `PublicV1DashboardAnalytics(data map[string]any) CustomTempMailEntity`

Create a new `PublicV1DashboardAnalytics` entity instance. Pass `nil` for no initial data.

#### `PublicV1Inbox(data map[string]any) CustomTempMailEntity`

Create a new `PublicV1Inbox` entity instance. Pass `nil` for no initial data.

#### `PublicV1Message(data map[string]any) CustomTempMailEntity`

Create a new `PublicV1Message` entity instance. Pass `nil` for no initial data.

#### `PublicV1Webhook(data map[string]any) CustomTempMailEntity`

Create a new `PublicV1Webhook` entity instance. Pass `nil` for no initial data.

#### `Usage(data map[string]any) CustomTempMailEntity`

Create a new `Usage` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CustomDomainEntity

```go
customDomain := client.CustomDomain(nil)
fmt.Println(customDomain.GetName()) // "custom_domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `string` | No |  |
| `domain` | `string` | Yes |  |
| `mx_record` | `string` | Yes |  |
| `txt_record` | `string` | Yes |  |
| `verified` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.CustomDomain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CustomDomain(nil).Create(map[string]any{
    "domain": "example_domain",
    "mx_record": "example_mx_record",
    "txt_record": "example_txt_record",
    "verified": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.CustomDomain(nil).Remove(map[string]any{"id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CustomDomainEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CustomDomainVerifyEntity

```go
customDomainVerify := client.CustomDomainVerify(nil)
fmt.Println(customDomainVerify.GetName()) // "custom_domain_verify"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `string` | No |  |
| `domain` | `string` | Yes |  |
| `mx_record` | `string` | Yes |  |
| `txt_record` | `string` | Yes |  |
| `verified` | `bool` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.CustomDomainVerify(nil).Create(map[string]any{
    "domain": "example_domain",
    "mx_record": "example_mx_record",
    "txt_record": "example_txt_record",
    "verified": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CustomDomainVerifyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DomainEntity

```go
domain := client.Domain(nil)
fmt.Println(domain.GetName()) // "domain"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `expires_at` | `string` | No |  |
| `expires_in_days` | `int` | No |  |
| `expiring_soon` | `bool` | No |  |
| `tags` | `[]any` | Yes |  |
| `tier` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Domain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DomainsAllEntity

```go
domainsAll := client.DomainsAll(nil)
fmt.Println(domainsAll.GetName()) // "domains_all"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `expired` | `bool` | Yes |  |
| `expires_at` | `string` | No |  |
| `expires_in_days` | `int` | No |  |
| `expiring_soon` | `bool` | No |  |
| `tags` | `[]any` | Yes |  |
| `tier` | `string` | Yes |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DomainsAll(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainsAllEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InboxEntity

```go
inbox := client.Inbox(nil)
fmt.Println(inbox.GetName()) // "inbox"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No |  |
| `inbox` | `string` | No |  |
| `inboxes` | `[]any` | No |  |
| `isTesting` | `bool` | No |  |
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Inbox(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Inbox(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InboxEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MenEntity

```go
men := client.Men(nil)
fmt.Println(men.GetName()) // "men"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_inbox_count` | `int` | No |  |
| `api_inboxes` | `[]any` | No |  |
| `app_inbox_count` | `int` | No |  |
| `app_inboxes` | `[]any` | No |  |
| `credits` | `int` | No |  |
| `custom_domain_count` | `int` | No |  |
| `custom_domains` | `[]any` | No |  |
| `features` | `map[string]any` | No |  |
| `plan` | `string` | No |  |
| `rate_limits` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Men(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MenEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MessageEntity

```go
message := client.Message(nil)
fmt.Println(message.GetName()) // "message"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `[]any` | No |  |
| `count` | `int` | No |  |
| `date` | `string` | No |  |
| `from` | `string` | No |  |
| `has_attachment` | `bool` | No |  |
| `has_more` | `bool` | No |  |
| `html` | `string` | No |  |
| `id` | `string` | No |  |
| `inbox` | `string` | No |  |
| `messages` | `[]any` | No |  |
| `otp` | `string` | No |  |
| `subject` | `string` | No |  |
| `text` | `string` | No |  |
| `to` | `string` | No |  |
| `verification_link` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Message(nil).Load(map[string]any{"id": "message_id", "inbox_id": "inbox_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MessageEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OtpEntity

```go
otp := client.Otp(nil)
fmt.Println(otp.GetName()) // "otp"
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
| `score` | `float64` | No |  |
| `subject` | `string` | No |  |
| `verification_link` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Otp(nil).Load(map[string]any{"inbox_id": "inbox_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OtpEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlanEntity

```go
plan := client.Plan(nil)
fmt.Println(plan.GetName()) // "plan"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credit_packages` | `[]any` | No |  |
| `plans` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Plan(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlanEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PublicV1DashboardAnalyticsEntity

```go
publicV1DashboardAnalytics := client.PublicV1DashboardAnalytics(nil)
fmt.Println(publicV1DashboardAnalytics.GetName()) // "public_v1_dashboard_analytics"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyzed_at` | `string` | No |  |
| `duration_hours` | `int` | No |  |
| `event_count` | `int` | No |  |
| `events` | `[]any` | No |  |
| `inbox` | `string` | No |  |
| `insights` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PublicV1DashboardAnalytics(nil).Load(map[string]any{"inbox_id": "inbox_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PublicV1DashboardAnalyticsEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PublicV1InboxEntity

```go
publicV1Inbox := client.PublicV1Inbox(nil)
fmt.Println(publicV1Inbox.GetName()) // "public_v1_inbox"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No |  |
| `custom_firstnames` | `[]any` | No |  |
| `custom_surnames` | `[]any` | No |  |
| `daily_limit` | `int` | No |  |
| `daily_remaining` | `int` | No |  |
| `daily_used` | `int` | No |  |
| `domain_mode` | `string` | No |  |
| `domains` | `[]any` | No |  |
| `inbox` | `string` | No |  |
| `inboxes` | `[]any` | No |  |
| `output_format` | `string` | No |  |
| `parseCode` | `bool` | No |  |
| `since` | `int` | No |  |
| `started_at` | `string` | No |  |
| `success` | `bool` | No |  |
| `test_id` | `string` | No |  |
| `username_style` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.PublicV1Inbox(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.PublicV1Inbox(nil).Remove(map[string]any{"id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PublicV1InboxEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PublicV1MessageEntity

```go
publicV1Message := client.PublicV1Message(nil)
fmt.Println(publicV1Message.GetName()) // "public_v1_message"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `from` | `string` | No |  |
| `has_attachment` | `bool` | No |  |
| `id` | `string` | No |  |
| `otp` | `string` | No |  |
| `subject` | `string` | No |  |
| `verification_link` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PublicV1Message(nil).Load(map[string]any{"inbox_id": "inbox_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.PublicV1Message(nil).Remove(map[string]any{"id": "id", "inbox_id": "inbox_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PublicV1MessageEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PublicV1WebhookEntity

```go
publicV1Webhook := client.PublicV1Webhook(nil)
fmt.Println(publicV1Webhook.GetName()) // "public_v1_webhook"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `failureCount` | `int` | No |  |
| `id` | `string` | No |  |
| `inbox` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `failureCount` | - | - | - |
| `id` | - | - | - |
| `inbox` | Yes | - | - |
| `url` | Yes | - | - |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PublicV1Webhook(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.PublicV1Webhook(nil).Create(map[string]any{
    "inbox": "example_inbox",
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.PublicV1Webhook(nil).Remove(map[string]any{"id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PublicV1WebhookEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UsageEntity

```go
usage := client.Usage(nil)
fmt.Println(usage.GetName()) // "usage"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credits` | `map[string]any` | No |  |
| `period` | `map[string]any` | No |  |
| `plan` | `string` | No |  |
| `rate_limit` | `map[string]any` | No |  |
| `requests` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Usage(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UsageEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewCustomTempMailSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

