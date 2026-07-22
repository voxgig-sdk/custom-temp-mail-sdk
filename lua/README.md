# CustomTempMail Lua SDK



The Lua SDK for the CustomTempMail API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:CustomDomain()` — each with the same small set of operations (`list`, `load`, `create`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/custom-temp-mail-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("custom-temp-mail_sdk")

local client = sdk.new({
  apikey = os.getenv("CUSTOM_TEMP_MAIL_APIKEY"),
})
```

### 2. List customdomain records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local customdomains, err = client:CustomDomain():list()
if err then error(err) end

for _, item in ipairs(customdomains) do
  print(item["added_at"])
end
```

### 3. Load a message

Message is nested under inbox, so provide the `inbox_id`.

```lua
local message, err = client:Message():load({ inbox_id = "example_inbox_id" })
if err then error(err) end
print(message)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:CustomDomain():create({ data = {}, domain = "example_domain", mx_record = "example_mx_record", txt_record = "example_txt_record", verified = true })
if err then error(err) end

-- Remove
client:CustomDomain():remove({ id = "example_id" })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local customdomains, err = client:CustomDomain():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:CustomDomain():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### CustomTempMailSDK

```lua
local sdk = require("custom-temp-mail_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CustomTempMailSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local custom_domain, err = client:CustomDomain():load()
    if err then error(err) end
    -- custom_domain is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local custom_domain = client:CustomDomain(nil)`

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
| `data` | `table` |  |
| `domain` | `string` |  |
| `message` | `string` |  |
| `mx_record` | `string` |  |
| `success` | `boolean` |  |
| `txt_record` | `string` |  |
| `verified` | `boolean` |  |

#### Example: List

```lua
local custom_domains, err = client:CustomDomain():list()
```

#### Example: Create

```lua
local custom_domain, err = client:CustomDomain():create({
  data = {}, -- table
  domain = "example_domain", -- string
  mx_record = "example_mx_record", -- string
  txt_record = "example_txt_record", -- string
  verified = true, -- boolean
})
```


### CustomDomainVerify

Create an instance: `local custom_domain_verify = client:CustomDomainVerify(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `message` | `string` |  |
| `success` | `boolean` |  |
| `verified` | `boolean` |  |

#### Example: Create

```lua
local custom_domain_verify, err = client:CustomDomainVerify():create({
  domain = "example_domain", -- string
})
```


### Domain

Create an instance: `local domain = client:Domain(nil)`

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
| `tag` | `table` |  |
| `tier` | `string` |  |

#### Example: List

```lua
local domains, err = client:Domain():list()
```


### DomainsAll

Create an instance: `local domains_all = client:DomainsAll(nil)`

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
| `tag` | `table` |  |
| `tier` | `string` |  |

#### Example: List

```lua
local domains_alls, err = client:DomainsAll():list()
```


### Inbox

Create an instance: `local inbox = client:Inbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `inbox` | `string` |  |
| `is_testing` | `boolean` |  |
| `message` | `string` |  |
| `success` | `boolean` |  |

#### Example: Load

```lua
local inbox, err = client:Inbox():load()
```

#### Example: Create

```lua
local inbox, err = client:Inbox():create({
})
```


### Men

Create an instance: `local men = client:Men(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `success` | `boolean` |  |

#### Example: Load

```lua
local men, err = client:Men():load()
```


### Message

Create an instance: `local message = client:Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `success` | `boolean` |  |

#### Example: Load

```lua
local message, err = client:Message():load({ id = "message_id", inbox_id = "inbox_id" })
```


### Otp

Create an instance: `local otp = client:Otp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `success` | `boolean` |  |

#### Example: Load

```lua
local otp, err = client:Otp():load({ inbox_id = "inbox_id" })
```


### Plan

Create an instance: `local plan = client:Plan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `success` | `boolean` |  |

#### Example: Load

```lua
local plan, err = client:Plan():load()
```


### PublicV1DashboardAnalytics

Create an instance: `local public_v1_dashboard_analytics = client:PublicV1DashboardAnalytics(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `success` | `boolean` |  |

#### Example: Load

```lua
local public_v1_dashboard_analytics, err = client:PublicV1DashboardAnalytics():load({ inbox_id = "inbox_id" })
```


### PublicV1Inbox

Create an instance: `local public_v1_inbox = client:PublicV1Inbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `number` |  |
| `custom_firstname` | `table` |  |
| `custom_surname` | `table` |  |
| `daily_limit` | `number` |  |
| `daily_remaining` | `number` |  |
| `daily_used` | `number` |  |
| `data` | `table` |  |
| `domain` | `table` |  |
| `domain_mode` | `string` |  |
| `inbox` | `table` |  |
| `output_format` | `string` |  |
| `parse_code` | `boolean` |  |
| `since` | `number` |  |
| `success` | `boolean` |  |
| `test_id` | `string` |  |
| `username_style` | `string` |  |

#### Example: Create

```lua
local public_v1_inbox, err = client:PublicV1Inbox():create({
})
```


### PublicV1Message

Create an instance: `local public_v1_message = client:PublicV1Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `message` | `string` |  |
| `success` | `boolean` |  |

#### Example: Load

```lua
local public_v1_message, err = client:PublicV1Message():load({ inbox_id = "inbox_id" })
```


### PublicV1Webhook

Create an instance: `local public_v1_webhook = client:PublicV1Webhook(nil)`

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

```lua
local public_v1_webhooks, err = client:PublicV1Webhook():list()
```

#### Example: Create

```lua
local public_v1_webhook, err = client:PublicV1Webhook():create({
  inbox = "example_inbox", -- string
  url = "example_url", -- string
})
```


### Usage

Create an instance: `local usage = client:Usage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `success` | `boolean` |  |

#### Example: Load

```lua
local usage, err = client:Usage():load()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── custom-temp-mail_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`custom-temp-mail_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local customdomain = client:CustomDomain()
customdomain:list()

-- customdomain:data_get() now returns the customdomain data from the last list
-- customdomain:match_get() returns the last match criteria
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
