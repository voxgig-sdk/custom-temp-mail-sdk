# CustomTempMail TypeScript SDK



The TypeScript SDK for the CustomTempMail API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.CustomDomain()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/custom-temp-mail-sdk/releases](https://github.com/voxgig-sdk/custom-temp-mail-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { CustomTempMailSDK } from '@voxgig-sdk/custom-temp-mail-sdk'

const client = new CustomTempMailSDK({
  apikey: process.env.CUSTOM_TEMP_MAIL_APIKEY,
})
```

### 2. List customdomain records

`list()` resolves to an array of CustomDomain ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const customdomains = await client.CustomDomain().list()

for (const customdomain of customdomains) {
  console.log(customdomain)
}
```

### 3. Load a message

Message is nested under inbox, so provide the `inbox_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const message = await client.Message().load({
    inbox_id: 'example_inbox_id',
  })
  console.log(message)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created CustomDomain ENTITY (.data() for the record)
const created = await client.CustomDomain().create({
  domain: 'example_domain',
  mx_record: 'example_mx_record',
  txt_record: 'example_txt_record',
  verified: true,
})

// Remove
await client.CustomDomain().remove({
  id: 'example_id',
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const domains = await client.Domain().list()
  console.log(domains)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = CustomTempMailSDK.test()

const domain = await client.Domain().list()
// domain is the entity, populated with mock response data
// — call domain.data() for the record itself
console.log(domain)
```

You can also use the instance method:

```ts
const client = new CustomTempMailSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Domain()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new CustomTempMailSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### CustomTempMailSDK

#### Constructor

```ts
new CustomTempMailSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `CustomDomain(data?)` | `CustomDomainEntity` | Create a CustomDomain entity instance. |
| `CustomDomainVerify(data?)` | `CustomDomainVerifyEntity` | Create a CustomDomainVerify entity instance. |
| `Domain(data?)` | `DomainEntity` | Create a Domain entity instance. |
| `DomainsAll(data?)` | `DomainsAllEntity` | Create a DomainsAll entity instance. |
| `Inbox(data?)` | `InboxEntity` | Create an Inbox entity instance. |
| `Men(data?)` | `MenEntity` | Create a Men entity instance. |
| `Message(data?)` | `MessageEntity` | Create a Message entity instance. |
| `Otp(data?)` | `OtpEntity` | Create an Otp entity instance. |
| `Plan(data?)` | `PlanEntity` | Create a Plan entity instance. |
| `PublicV1DashboardAnalytics(data?)` | `PublicV1DashboardAnalyticsEntity` | Create a PublicV1DashboardAnalytics entity instance. |
| `PublicV1Inbox(data?)` | `PublicV1InboxEntity` | Create a PublicV1Inbox entity instance. |
| `PublicV1Message(data?)` | `PublicV1MessageEntity` | Create a PublicV1Message entity instance. |
| `PublicV1Webhook(data?)` | `PublicV1WebhookEntity` | Create a PublicV1Webhook entity instance. |
| `Usage(data?)` | `UsageEntity` | Create an Usage entity instance. |
| `tester(testopts?, sdkopts?)` | `CustomTempMailSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `CustomTempMailSDK.test(testopts?, sdkopts?)` | `CustomTempMailSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): CustomTempMailSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### CustomDomain

| Field | Description |
| --- | --- |
| `added_at` | ISO 8601 timestamp when the domain was added. |
| `domain` | Bare domain name (no leading @). |
| `id` |  |
| `mx_record` | The MX record value to add at your registrar. |
| `txt_record` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `true` — MX and TXT records confirmed. |

Operations: create, list, remove.

API path: `/v1/custom-domains`

#### CustomDomainVerify

| Field | Description |
| --- | --- |
| `added_at` | ISO 8601 timestamp when the domain was added. |
| `domain` | Bare domain name (no leading @). |
| `mx_record` | The MX record value to add at your registrar. |
| `txt_record` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `true` — MX and TXT records confirmed. |

Operations: create.

API path: `/v1/custom-domains/{domain}/verify`

#### Domain

| Field | Description |
| --- | --- |
| `domain` | Bare domain name (no leading @). |
| `expires_at` | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | Days remaining until expiry. |
| `expiring_soon` | True when the domain expires within 30 days. |
| `tags` | `new` — recently added, shown for ~30 days. |
| `tier` | `free` — available on all plans. |

Operations: list.

API path: `/v1/domains`

#### DomainsAll

| Field | Description |
| --- | --- |
| `domain` | Bare domain name (no leading @). |
| `expired` | True when the domain has already passed its expiry date. |
| `expires_at` | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | Days remaining until expiry. |
| `expiring_soon` | True when the domain expires within 30 days. |
| `tags` | `new` — recently added, shown for ~30 days. |
| `tier` | `free` — available on all plans. |

Operations: list.

API path: `/v1/domains/all`

#### Inbox

| Field | Description |
| --- | --- |
| `count` |  |
| `inbox` |  |
| `inboxes` |  |
| `isTesting` | Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger. |
| `message` |  |
| `success` |  |

Operations: create, load.

API path: `/v1/inboxes`

#### Men

| Field | Description |
| --- | --- |
| `api_inbox_count` |  |
| `api_inboxes` |  |
| `app_inbox_count` |  |
| `app_inboxes` |  |
| `credits` |  |
| `custom_domain_count` |  |
| `custom_domains` |  |
| `features` |  |
| `plan` |  |
| `rate_limits` |  |

Operations: load.

API path: `/v1/me`

#### Message

| Field | Description |
| --- | --- |
| `attachments` |  |
| `count` |  |
| `date` |  |
| `from` |  |
| `has_attachment` |  |
| `has_more` |  |
| `html` |  |
| `id` |  |
| `inbox` |  |
| `messages` |  |
| `otp` |  |
| `subject` |  |
| `text` |  |
| `to` |  |
| `verification_link` |  |

Operations: load.

API path: `/v1/inboxes/{inbox}/messages`

#### Otp

| Field | Description |
| --- | --- |
| `from` |  |
| `inbox` |  |
| `message` |  |
| `message_id` |  |
| `otp` |  |
| `received_at` |  |
| `score` | Confidence score (0.0 to 1.0) of the extracted OTP. |
| `subject` |  |
| `verification_link` |  |

Operations: load.

API path: `/v1/inboxes/{inbox}/otp`

#### Plan

| Field | Description |
| --- | --- |
| `credit_packages` |  |
| `plans` |  |

Operations: load.

API path: `/v1/plans`

#### PublicV1DashboardAnalytics

| Field | Description |
| --- | --- |
| `analyzed_at` |  |
| `duration_hours` |  |
| `event_count` |  |
| `events` |  |
| `inbox` |  |
| `insights` |  |

Operations: load.

API path: `/v1/inboxes/{inbox}/timeline`

#### PublicV1Inbox

| Field | Description |
| --- | --- |
| `count` | Number of inboxes to generate (1–500 depending on plan). |
| `custom_firstnames` | Custom first-name pool for `firstname.surname` style. |
| `custom_surnames` | Custom surname pool for `firstname.surname` style. |
| `daily_limit` |  |
| `daily_remaining` |  |
| `daily_used` |  |
| `domain_mode` | Which domain pool to use. |
| `domains` | Required when `domain_mode` is `specific`. |
| `id` |  |
| `inbox` |  |
| `inboxes` |  |
| `output_format` | Template string for each line of output. |
| `parseCode` | When `true` (default), embeds `?parseCode=true` in every OTP URL. |
| `since` | Unix timestamp in milliseconds. |
| `started_at` |  |
| `success` |  |
| `test_id` | Optional custom test ID. |
| `username_style` | Username generation style. |

Operations: create, remove.

API path: `/v1/inboxes/{inbox}/tests`

#### PublicV1Message

| Field | Description |
| --- | --- |
| `date` |  |
| `from` |  |
| `has_attachment` |  |
| `id` |  |
| `otp` | The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value). |
| `subject` |  |
| `verification_link` |  |

Operations: load, remove.

API path: `/v1/inboxes/{inbox}/wait`

#### PublicV1Webhook

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `failureCount` |  |
| `id` |  |
| `inbox` | The registered inbox to subscribe to. |
| `url` | The HTTPS URL to receive the POST request. |

Operations: create, list, remove.

API path: `/v1/webhooks`

#### Usage

| Field | Description |
| --- | --- |
| `credits` |  |
| `period` |  |
| `plan` |  |
| `rate_limit` |  |
| `requests` |  |

Operations: load.

API path: `/v1/usage`



## Entities


### CustomDomain

Create an instance: `const custom_domain = client.CustomDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `string` | ISO 8601 timestamp when the domain was added. |
| `domain` | `string` | Bare domain name (no leading @). |
| `id` | `string` |  |
| `mx_record` | `string` | The MX record value to add at your registrar. |
| `txt_record` | `string` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `boolean` | `true` — MX and TXT records confirmed. |

#### Example: List

```ts
const custom_domains = await client.CustomDomain().list()
```

#### Example: Create

```ts
const custom_domain = await client.CustomDomain().create({
  domain: 'example_domain',
  mx_record: 'example_mx_record',
  txt_record: 'example_txt_record',
  verified: true,
})
```


### CustomDomainVerify

Create an instance: `const custom_domain_verify = client.CustomDomainVerify()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `string` | ISO 8601 timestamp when the domain was added. |
| `domain` | `string` | Bare domain name (no leading @). |
| `mx_record` | `string` | The MX record value to add at your registrar. |
| `txt_record` | `string` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `boolean` | `true` — MX and TXT records confirmed. |

#### Example: Create

```ts
const custom_domain_verify = await client.CustomDomainVerify().create({
  domain: 'example_domain',
  mx_record: 'example_mx_record',
  txt_record: 'example_txt_record',
  verified: true,
})
```


### Domain

Create an instance: `const domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` | Bare domain name (no leading @). |
| `expires_at` | `string` | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `number` | Days remaining until expiry. |
| `expiring_soon` | `boolean` | True when the domain expires within 30 days. |
| `tags` | `any[]` | `new` — recently added, shown for ~30 days. |
| `tier` | `string` | `free` — available on all plans. |

#### Example: List

```ts
const domains = await client.Domain().list()
```


### DomainsAll

Create an instance: `const domains_all = client.DomainsAll()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` | Bare domain name (no leading @). |
| `expired` | `boolean` | True when the domain has already passed its expiry date. |
| `expires_at` | `string` | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `number` | Days remaining until expiry. |
| `expiring_soon` | `boolean` | True when the domain expires within 30 days. |
| `tags` | `any[]` | `new` — recently added, shown for ~30 days. |
| `tier` | `string` | `free` — available on all plans. |

#### Example: List

```ts
const domains_alls = await client.DomainsAll().list()
```


### Inbox

Create an instance: `const inbox = client.Inbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `inbox` | `string` |  |
| `inboxes` | `any[]` |  |
| `isTesting` | `boolean` | Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger. |
| `message` | `string` |  |
| `success` | `boolean` |  |

#### Example: Load

```ts
const inbox = await client.Inbox().load()
```

#### Example: Create

```ts
const inbox = await client.Inbox().create({
})
```


### Men

Create an instance: `const men = client.Men()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_inbox_count` | `number` |  |
| `api_inboxes` | `any[]` |  |
| `app_inbox_count` | `number` |  |
| `app_inboxes` | `any[]` |  |
| `credits` | `number` |  |
| `custom_domain_count` | `number` |  |
| `custom_domains` | `any[]` |  |
| `features` | `Record<string, any>` |  |
| `plan` | `string` |  |
| `rate_limits` | `Record<string, any>` |  |

#### Example: Load

```ts
const men = await client.Men().load()
```


### Message

Create an instance: `const message = client.Message()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachments` | `any[]` |  |
| `count` | `number` |  |
| `date` | `string` |  |
| `from` | `string` |  |
| `has_attachment` | `boolean` |  |
| `has_more` | `boolean` |  |
| `html` | `string` |  |
| `id` | `string` |  |
| `inbox` | `string` |  |
| `messages` | `any[]` |  |
| `otp` | `string` |  |
| `subject` | `string` |  |
| `text` | `string` |  |
| `to` | `string` |  |
| `verification_link` | `string` |  |

#### Example: Load

```ts
const message = await client.Message().load({ id: 'message_id', inbox_id: 'inbox_id' })
```


### Otp

Create an instance: `const otp = client.Otp()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` |  |
| `inbox` | `string` |  |
| `message` | `string` |  |
| `message_id` | `string` |  |
| `otp` | `string` |  |
| `received_at` | `string` |  |
| `score` | `number` | Confidence score (0.0 to 1.0) of the extracted OTP. |
| `subject` | `string` |  |
| `verification_link` | `string` |  |

#### Example: Load

```ts
const otp = await client.Otp().load({ inbox_id: 'inbox_id' })
```


### Plan

Create an instance: `const plan = client.Plan()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credit_packages` | `any[]` |  |
| `plans` | `any[]` |  |

#### Example: Load

```ts
const plan = await client.Plan().load()
```


### PublicV1DashboardAnalytics

Create an instance: `const public_v1_dashboard_analytics = client.PublicV1DashboardAnalytics()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyzed_at` | `string` |  |
| `duration_hours` | `number` |  |
| `event_count` | `number` |  |
| `events` | `any[]` |  |
| `inbox` | `string` |  |
| `insights` | `any[]` |  |

#### Example: Load

```ts
const public_v1_dashboard_analytics = await client.PublicV1DashboardAnalytics().load({ inbox_id: 'inbox_id' })
```


### PublicV1Inbox

Create an instance: `const public_v1_inbox = client.PublicV1Inbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` | Number of inboxes to generate (1–500 depending on plan). |
| `custom_firstnames` | `any[]` | Custom first-name pool for `firstname.surname` style. |
| `custom_surnames` | `any[]` | Custom surname pool for `firstname.surname` style. |
| `daily_limit` | `number` |  |
| `daily_remaining` | `number` |  |
| `daily_used` | `number` |  |
| `domain_mode` | `string` | Which domain pool to use. |
| `domains` | `any[]` | Required when `domain_mode` is `specific`. |
| `id` | `string` |  |
| `inbox` | `string` |  |
| `inboxes` | `any[]` |  |
| `output_format` | `string` | Template string for each line of output. |
| `parseCode` | `boolean` | When `true` (default), embeds `?parseCode=true` in every OTP URL. |
| `since` | `number` | Unix timestamp in milliseconds. |
| `started_at` | `string` |  |
| `success` | `boolean` |  |
| `test_id` | `string` | Optional custom test ID. |
| `username_style` | `string` | Username generation style. |

#### Example: Create

```ts
const public_v1_inbox = await client.PublicV1Inbox().create({
})
```


### PublicV1Message

Create an instance: `const public_v1_message = client.PublicV1Message()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `string` |  |
| `from` | `string` |  |
| `has_attachment` | `boolean` |  |
| `id` | `string` |  |
| `otp` | `string` | The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value). |
| `subject` | `string` |  |
| `verification_link` | `string` |  |

#### Example: Load

```ts
const public_v1_message = await client.PublicV1Message().load({ inbox_id: 'inbox_id' })
```


### PublicV1Webhook

Create an instance: `const public_v1_webhook = client.PublicV1Webhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `failureCount` | `number` |  |
| `id` | `string` |  |
| `inbox` | `string` | The registered inbox to subscribe to. |
| `url` | `string` | The HTTPS URL to receive the POST request. |

#### Example: List

```ts
const public_v1_webhooks = await client.PublicV1Webhook().list()
```

#### Example: Create

```ts
const public_v1_webhook = await client.PublicV1Webhook().create({
  inbox: 'example_inbox',
  url: 'example_url',
})
```


### Usage

Create an instance: `const usage = client.Usage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credits` | `Record<string, any>` |  |
| `period` | `Record<string, any>` |  |
| `plan` | `string` |  |
| `rate_limit` | `Record<string, any>` |  |
| `requests` | `Record<string, any>` |  |

#### Example: Load

```ts
const usage = await client.Usage().load()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
custom-temp-mail/
├── src/
│   ├── CustomTempMailSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { CustomTempMailSDK } from '@voxgig-sdk/custom-temp-mail-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const domain = client.Domain()
await domain.list()

// domain.data() now returns the domain data from the last `list`
// domain.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
