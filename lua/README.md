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
  print(item["id"])
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
local created, err = client:CustomDomain():create({ domain = "example_domain", mx_record = "example_mx_record", txt_record = "example_txt_record", verified = true })
if err then error(err) end

-- Remove
client:CustomDomain():remove({ id = "example_id" })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local domains, err = client:Domain():list()
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

local result, err = client:Domain():list()
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

    local inbox, err = client:Inbox():load()
    if err then error(err) end
    -- inbox is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Operations: Create, List, Remove.

API path: `/v1/custom-domains`

#### CustomDomainVerify

| Field | Description |
| --- | --- |
| `added_at` | ISO 8601 timestamp when the domain was added. |
| `domain` | Bare domain name (no leading @). |
| `mx_record` | The MX record value to add at your registrar. |
| `txt_record` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `true` — MX and TXT records confirmed. |

Operations: Create.

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

Operations: List.

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

Operations: List.

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

Operations: Create, Load.

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

Operations: Load.

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

Operations: Load.

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

Operations: Load.

API path: `/v1/inboxes/{inbox}/otp`

#### Plan

| Field | Description |
| --- | --- |
| `credit_packages` |  |
| `plans` |  |

Operations: Load.

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

Operations: Load.

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

Operations: Create, Remove.

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

Operations: Load, Remove.

API path: `/v1/inboxes/{inbox}/wait`

#### PublicV1Webhook

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `failureCount` |  |
| `id` |  |
| `inbox` | The registered inbox to subscribe to. |
| `url` | The HTTPS URL to receive the POST request. |

Operations: Create, List, Remove.

API path: `/v1/webhooks`

#### Usage

| Field | Description |
| --- | --- |
| `credits` |  |
| `period` |  |
| `plan` |  |
| `rate_limit` |  |
| `requests` |  |

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
| `added_at` | `string` | ISO 8601 timestamp when the domain was added. |
| `domain` | `string` | Bare domain name (no leading @). |
| `id` | `string` |  |
| `mx_record` | `string` | The MX record value to add at your registrar. |
| `txt_record` | `string` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `boolean` | `true` — MX and TXT records confirmed. |

#### Example: List

```lua
local custom_domains, err = client:CustomDomain():list()
```

#### Example: Create

```lua
local custom_domain, err = client:CustomDomain():create({
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
| `added_at` | `string` | ISO 8601 timestamp when the domain was added. |
| `domain` | `string` | Bare domain name (no leading @). |
| `mx_record` | `string` | The MX record value to add at your registrar. |
| `txt_record` | `string` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `boolean` | `true` — MX and TXT records confirmed. |

#### Example: Create

```lua
local custom_domain_verify, err = client:CustomDomainVerify():create({
  domain = "example_domain", -- string
  mx_record = "example_mx_record", -- string
  txt_record = "example_txt_record", -- string
  verified = true, -- boolean
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
| `domain` | `string` | Bare domain name (no leading @). |
| `expires_at` | `string` | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `number` | Days remaining until expiry. |
| `expiring_soon` | `boolean` | True when the domain expires within 30 days. |
| `tags` | `table` | `new` — recently added, shown for ~30 days. |
| `tier` | `string` | `free` — available on all plans. |

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
| `domain` | `string` | Bare domain name (no leading @). |
| `expired` | `boolean` | True when the domain has already passed its expiry date. |
| `expires_at` | `string` | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `number` | Days remaining until expiry. |
| `expiring_soon` | `boolean` | True when the domain expires within 30 days. |
| `tags` | `table` | `new` — recently added, shown for ~30 days. |
| `tier` | `string` | `free` — available on all plans. |

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
| `count` | `number` |  |
| `inbox` | `string` |  |
| `inboxes` | `table` |  |
| `isTesting` | `boolean` | Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger. |
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
| `api_inbox_count` | `number` |  |
| `api_inboxes` | `table` |  |
| `app_inbox_count` | `number` |  |
| `app_inboxes` | `table` |  |
| `credits` | `number` |  |
| `custom_domain_count` | `number` |  |
| `custom_domains` | `table` |  |
| `features` | `table` |  |
| `plan` | `string` |  |
| `rate_limits` | `table` |  |

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
| `attachments` | `table` |  |
| `count` | `number` |  |
| `date` | `string` |  |
| `from` | `string` |  |
| `has_attachment` | `boolean` |  |
| `has_more` | `boolean` |  |
| `html` | `string` |  |
| `id` | `string` |  |
| `inbox` | `string` |  |
| `messages` | `table` |  |
| `otp` | `string` |  |
| `subject` | `string` |  |
| `text` | `string` |  |
| `to` | `string` |  |
| `verification_link` | `string` |  |

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
| `credit_packages` | `table` |  |
| `plans` | `table` |  |

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
| `analyzed_at` | `string` |  |
| `duration_hours` | `number` |  |
| `event_count` | `number` |  |
| `events` | `table` |  |
| `inbox` | `string` |  |
| `insights` | `table` |  |

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
| `count` | `number` | Number of inboxes to generate (1–500 depending on plan). |
| `custom_firstnames` | `table` | Custom first-name pool for `firstname.surname` style. |
| `custom_surnames` | `table` | Custom surname pool for `firstname.surname` style. |
| `daily_limit` | `number` |  |
| `daily_remaining` | `number` |  |
| `daily_used` | `number` |  |
| `domain_mode` | `string` | Which domain pool to use. |
| `domains` | `table` | Required when `domain_mode` is `specific`. |
| `id` | `string` |  |
| `inbox` | `string` |  |
| `inboxes` | `table` |  |
| `output_format` | `string` | Template string for each line of output. |
| `parseCode` | `boolean` | When `true` (default), embeds `?parseCode=true` in every OTP URL. |
| `since` | `number` | Unix timestamp in milliseconds. |
| `started_at` | `string` |  |
| `success` | `boolean` |  |
| `test_id` | `string` | Optional custom test ID. |
| `username_style` | `string` | Username generation style. |

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
| `date` | `string` |  |
| `from` | `string` |  |
| `has_attachment` | `boolean` |  |
| `id` | `string` |  |
| `otp` | `string` | The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value). |
| `subject` | `string` |  |
| `verification_link` | `string` |  |

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
| `createdAt` | `string` |  |
| `failureCount` | `number` |  |
| `id` | `string` |  |
| `inbox` | `string` | The registered inbox to subscribe to. |
| `url` | `string` | The HTTPS URL to receive the POST request. |

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
| `credits` | `table` |  |
| `period` | `table` |  |
| `plan` | `string` |  |
| `rate_limit` | `table` |  |
| `requests` | `table` |  |

#### Example: Load

```lua
local usage, err = client:Usage():load()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

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

Automatic retry of transient failures with exponential backoff.

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

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

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
├── schema.lua               -- Generated option + entity specs
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
local domain = client:Domain()
domain:list()

-- domain:data_get() now returns the domain data from the last list
-- domain:match_get() returns the last match criteria
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
