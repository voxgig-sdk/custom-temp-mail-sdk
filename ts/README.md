# CustomTempMail TypeScript SDK



The TypeScript SDK for the CustomTempMail API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.CustomDomain()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
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
import { CustomTempMailSDK } from '@voxgig-sdk/custom-temp-mail'

const client = new CustomTempMailSDK({
  apikey: process.env.CUSTOM_TEMP_MAIL_APIKEY,
})
```

### 2. List customdomain records

`list()` resolves to an array of CustomDomain objects — iterate it directly:

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
// Create — returns the created CustomDomain
const created = await client.CustomDomain().create({
  data: {},
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
  const customdomains = await client.CustomDomain().list()
  console.log(customdomains)
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

const customdomain = await client.CustomDomain().list()
// customdomain is a bare entity populated with mock response data
console.log(customdomain)
```

You can also use the instance method:

```ts
const client = new CustomTempMailSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.CustomDomain()

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
| `added_at` |  |
| `data` |  |
| `domain` |  |
| `message` |  |
| `mx_record` |  |
| `success` |  |
| `txt_record` |  |
| `verified` |  |

Operations: create, list, remove.

API path: `/v1/custom-domains`

#### CustomDomainVerify

| Field | Description |
| --- | --- |
| `data` |  |
| `message` |  |
| `success` |  |
| `verified` |  |

Operations: create.

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

Operations: list.

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

Operations: list.

API path: `/v1/domains/all`

#### Inbox

| Field | Description |
| --- | --- |
| `data` |  |
| `inbox` |  |
| `is_testing` |  |
| `message` |  |
| `success` |  |

Operations: create, load.

API path: `/v1/inboxes`

#### Men

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: load.

API path: `/v1/me`

#### Message

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: load.

API path: `/v1/inboxes/{inbox}/messages`

#### Otp

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: load.

API path: `/v1/inboxes/{inbox}/otp`

#### Plan

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: load.

API path: `/v1/plans`

#### PublicV1DashboardAnalytics

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

Operations: load.

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

Operations: create, remove.

API path: `/v1/inboxes/{inbox}/tests`

#### PublicV1Message

| Field | Description |
| --- | --- |
| `data` |  |
| `message` |  |
| `success` |  |

Operations: load, remove.

API path: `/v1/inboxes/{inbox}/wait`

#### PublicV1Webhook

| Field | Description |
| --- | --- |
| `created_at` |  |
| `failure_count` |  |
| `id` |  |
| `inbox` |  |
| `url` |  |

Operations: create, list, remove.

API path: `/v1/webhooks`

#### Usage

| Field | Description |
| --- | --- |
| `data` |  |
| `success` |  |

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
| `added_at` | `string` |  |
| `data` | `Record<string, any>` |  |
| `domain` | `string` |  |
| `message` | `string` |  |
| `mx_record` | `string` |  |
| `success` | `boolean` |  |
| `txt_record` | `string` |  |
| `verified` | `boolean` |  |

#### Example: List

```ts
const custom_domains = await client.CustomDomain().list()
```

#### Example: Create

```ts
const custom_domain = await client.CustomDomain().create({
  data: {},
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
| `data` | `Record<string, any>` |  |
| `message` | `string` |  |
| `success` | `boolean` |  |
| `verified` | `boolean` |  |

#### Example: Create

```ts
const custom_domain_verify = await client.CustomDomainVerify().create({
  domain: 'example_domain',
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
| `domain` | `string` |  |
| `expires_at` | `string` |  |
| `expires_in_day` | `number` |  |
| `expiring_soon` | `boolean` |  |
| `tag` | `any[]` |  |
| `tier` | `string` |  |

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
| `domain` | `string` |  |
| `expired` | `boolean` |  |
| `expires_at` | `string` |  |
| `expires_in_day` | `number` |  |
| `expiring_soon` | `boolean` |  |
| `tag` | `any[]` |  |
| `tier` | `string` |  |

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
| `data` | `Record<string, any>` |  |
| `inbox` | `string` |  |
| `is_testing` | `boolean` |  |
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
| `data` | `Record<string, any>` |  |
| `success` | `boolean` |  |

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
| `data` | `Record<string, any>` |  |
| `success` | `boolean` |  |

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
| `data` | `Record<string, any>` |  |
| `success` | `boolean` |  |

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
| `data` | `Record<string, any>` |  |
| `success` | `boolean` |  |

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
| `data` | `Record<string, any>` |  |
| `success` | `boolean` |  |

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
| `count` | `number` |  |
| `custom_firstname` | `any[]` |  |
| `custom_surname` | `any[]` |  |
| `daily_limit` | `number` |  |
| `daily_remaining` | `number` |  |
| `daily_used` | `number` |  |
| `data` | `Record<string, any>` |  |
| `domain` | `any[]` |  |
| `domain_mode` | `string` |  |
| `inbox` | `any[]` |  |
| `output_format` | `string` |  |
| `parse_code` | `boolean` |  |
| `since` | `number` |  |
| `success` | `boolean` |  |
| `test_id` | `string` |  |
| `username_style` | `string` |  |

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
| `data` | `Record<string, any>` |  |
| `message` | `string` |  |
| `success` | `boolean` |  |

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
| `created_at` | `string` |  |
| `failure_count` | `number` |  |
| `id` | `string` |  |
| `inbox` | `string` |  |
| `url` | `string` |  |

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
| `data` | `Record<string, any>` |  |
| `success` | `boolean` |  |

#### Example: Load

```ts
const usage = await client.Usage().load()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
import { CustomTempMailSDK } from '@voxgig-sdk/custom-temp-mail'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const customdomain = client.CustomDomain()
await customdomain.list()

// customdomain.data() now returns the customdomain data from the last `list`
// customdomain.match() returns the last match criteria
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
