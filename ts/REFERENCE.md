# CustomTempMail TypeScript SDK Reference

Complete API reference for the CustomTempMail TypeScript SDK.


## CustomTempMailSDK

### Constructor

```ts
new CustomTempMailSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CustomTempMailSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = CustomTempMailSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `CustomTempMailSDK` instance in test mode.


### Instance Methods

#### `CustomDomain(data?: object)`

Create a new `CustomDomain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CustomDomainEntity` instance.

#### `CustomDomainVerify(data?: object)`

Create a new `CustomDomainVerify` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CustomDomainVerifyEntity` instance.

#### `Domain(data?: object)`

Create a new `Domain` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainEntity` instance.

#### `DomainsAll(data?: object)`

Create a new `DomainsAll` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainsAllEntity` instance.

#### `Inbox(data?: object)`

Create a new `Inbox` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InboxEntity` instance.

#### `Men(data?: object)`

Create a new `Men` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MenEntity` instance.

#### `Message(data?: object)`

Create a new `Message` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MessageEntity` instance.

#### `Otp(data?: object)`

Create a new `Otp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OtpEntity` instance.

#### `Plan(data?: object)`

Create a new `Plan` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlanEntity` instance.

#### `PublicV1DashboardAnalytics(data?: object)`

Create a new `PublicV1DashboardAnalytics` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PublicV1DashboardAnalyticsEntity` instance.

#### `PublicV1Inbox(data?: object)`

Create a new `PublicV1Inbox` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PublicV1InboxEntity` instance.

#### `PublicV1Message(data?: object)`

Create a new `PublicV1Message` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PublicV1MessageEntity` instance.

#### `PublicV1Webhook(data?: object)`

Create a new `PublicV1Webhook` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PublicV1WebhookEntity` instance.

#### `Usage(data?: object)`

Create a new `Usage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UsageEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `CustomTempMailSDK.test()`.

**Returns:** `CustomTempMailSDK` instance in test mode.


---

## CustomDomainEntity

```ts
const custom_domain = client.CustomDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `string` | No |  |
| `data` | `Record<string, any>` | Yes |  |
| `domain` | `string` | Yes |  |
| `message` | `string` | No |  |
| `mx_record` | `string` | Yes |  |
| `success` | `boolean` | No |  |
| `txt_record` | `string` | Yes |  |
| `verified` | `boolean` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CustomDomain().create({
  data: {},
  domain: 'example_domain',
  mx_record: 'example_mx_record',
  txt_record: 'example_txt_record',
  verified: true,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CustomDomain().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.CustomDomain().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CustomDomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CustomDomainVerifyEntity

```ts
const custom_domain_verify = client.CustomDomainVerify()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | Yes |  |
| `message` | `string` | No |  |
| `success` | `boolean` | No |  |
| `verified` | `boolean` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.CustomDomainVerify().create({
  domain: 'example_domain',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CustomDomainVerifyEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainEntity

```ts
const domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `expires_at` | `string` | No |  |
| `expires_in_day` | `number` | No |  |
| `expiring_soon` | `boolean` | No |  |
| `tag` | `any[]` | Yes |  |
| `tier` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Domain().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainsAllEntity

```ts
const domains_all = client.DomainsAll()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | Yes |  |
| `expired` | `boolean` | Yes |  |
| `expires_at` | `string` | No |  |
| `expires_in_day` | `number` | No |  |
| `expiring_soon` | `boolean` | No |  |
| `tag` | `any[]` | Yes |  |
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DomainsAll().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainsAllEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InboxEntity

```ts
const inbox = client.Inbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Inbox().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Inbox().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InboxEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MenEntity

```ts
const men = client.Men()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Men().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MenEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MessageEntity

```ts
const message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Message().load({ id: 'message_id', inbox_id: 'inbox_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MessageEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OtpEntity

```ts
const otp = client.Otp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Otp().load({ inbox_id: 'inbox_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OtpEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlanEntity

```ts
const plan = client.Plan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Plan().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlanEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PublicV1DashboardAnalyticsEntity

```ts
const public_v1_dashboard_analytics = client.PublicV1DashboardAnalytics()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PublicV1DashboardAnalytics().load({ inbox_id: 'inbox_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PublicV1DashboardAnalyticsEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PublicV1InboxEntity

```ts
const public_v1_inbox = client.PublicV1Inbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `number` | No |  |
| `custom_firstname` | `any[]` | No |  |
| `custom_surname` | `any[]` | No |  |
| `daily_limit` | `number` | No |  |
| `daily_remaining` | `number` | No |  |
| `daily_used` | `number` | No |  |
| `data` | `Record<string, any>` | No |  |
| `domain` | `any[]` | No |  |
| `domain_mode` | `string` | No |  |
| `inbox` | `any[]` | No |  |
| `output_format` | `string` | No |  |
| `parse_code` | `boolean` | No |  |
| `since` | `number` | No |  |
| `success` | `boolean` | No |  |
| `test_id` | `string` | No |  |
| `username_style` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PublicV1Inbox().create({
})
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.PublicV1Inbox().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PublicV1InboxEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PublicV1MessageEntity

```ts
const public_v1_message = client.PublicV1Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | No |  |
| `message` | `string` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PublicV1Message().load({ inbox_id: 'inbox_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.PublicV1Message().remove({ id: 'id', inbox_id: 'inbox_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PublicV1MessageEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PublicV1WebhookEntity

```ts
const public_v1_webhook = client.PublicV1Webhook()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PublicV1Webhook().create({
  inbox: 'example_inbox',
  url: 'example_url',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PublicV1Webhook().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.PublicV1Webhook().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PublicV1WebhookEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UsageEntity

```ts
const usage = client.Usage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | No |  |
| `success` | `boolean` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Usage().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UsageEntity` instance with the same client and
options.

#### `client()`

Return the parent `CustomTempMailSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new CustomTempMailSDK({
  feature: {
    test: { active: true },
  }
})
```

