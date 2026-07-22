# CustomTempMail Golang SDK



The Golang SDK for the CustomTempMail API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.CustomDomain(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/custom-temp-mail-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/custom-temp-mail-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/custom-temp-mail-sdk/go=../custom-temp-mail-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/custom-temp-mail-sdk/go"
)

func main() {
    client := sdk.NewCustomTempMailSDK(map[string]any{
        "apikey": os.Getenv("CUSTOM_TEMP_MAIL_APIKEY"),
    })

    // List customDomain records — the value is the array of records itself.
    customDomains, err := client.CustomDomain(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range customDomains.([]any) {
        fmt.Println(item)
    }

    // Create a customDomain.
    created, err := client.CustomDomain(nil).Create(map[string]any{"data": map[string]any{}, "domain": "example_domain", "mx_record": "example_mx_record", "txt_record": "example_txt_record", "verified": true}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Remove a customDomain.
    removed, err := client.CustomDomain(nil).Remove(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
customdomains, err := client.CustomDomain(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = customdomains
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

customDomain, err := client.CustomDomain(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(customDomain) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewCustomTempMailSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewCustomTempMailSDK

```go
func NewCustomTempMailSDK(options map[string]any) *CustomTempMailSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *CustomTempMailSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### CustomTempMailSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `CustomDomain` | `(data map[string]any) CustomTempMailEntity` | Create a CustomDomain entity instance. |
| `CustomDomainVerify` | `(data map[string]any) CustomTempMailEntity` | Create a CustomDomainVerify entity instance. |
| `Domain` | `(data map[string]any) CustomTempMailEntity` | Create a Domain entity instance. |
| `DomainsAll` | `(data map[string]any) CustomTempMailEntity` | Create a DomainsAll entity instance. |
| `Inbox` | `(data map[string]any) CustomTempMailEntity` | Create an Inbox entity instance. |
| `Men` | `(data map[string]any) CustomTempMailEntity` | Create a Men entity instance. |
| `Message` | `(data map[string]any) CustomTempMailEntity` | Create a Message entity instance. |
| `Otp` | `(data map[string]any) CustomTempMailEntity` | Create an Otp entity instance. |
| `Plan` | `(data map[string]any) CustomTempMailEntity` | Create a Plan entity instance. |
| `PublicV1DashboardAnalytics` | `(data map[string]any) CustomTempMailEntity` | Create a PublicV1DashboardAnalytics entity instance. |
| `PublicV1Inbox` | `(data map[string]any) CustomTempMailEntity` | Create a PublicV1Inbox entity instance. |
| `PublicV1Message` | `(data map[string]any) CustomTempMailEntity` | Create a PublicV1Message entity instance. |
| `PublicV1Webhook` | `(data map[string]any) CustomTempMailEntity` | Create a PublicV1Webhook entity instance. |
| `Usage` | `(data map[string]any) CustomTempMailEntity` | Create an Usage entity instance. |

### Entity interface (CustomTempMailEntity)

All entities implement the `CustomTempMailEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    customDomain, err := client.CustomDomain(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // customDomain is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### CustomDomain

| Field | Description |
| --- | --- |
| `"added_at"` |  |
| `"data"` |  |
| `"domain"` |  |
| `"message"` |  |
| `"mx_record"` |  |
| `"success"` |  |
| `"txt_record"` |  |
| `"verified"` |  |

Operations: Create, List, Remove.

API path: `/v1/custom-domains`

#### CustomDomainVerify

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"message"` |  |
| `"success"` |  |
| `"verified"` |  |

Operations: Create.

API path: `/v1/custom-domains/{domain}/verify`

#### Domain

| Field | Description |
| --- | --- |
| `"domain"` |  |
| `"expires_at"` |  |
| `"expires_in_day"` |  |
| `"expiring_soon"` |  |
| `"tag"` |  |
| `"tier"` |  |

Operations: List.

API path: `/v1/domains`

#### DomainsAll

| Field | Description |
| --- | --- |
| `"domain"` |  |
| `"expired"` |  |
| `"expires_at"` |  |
| `"expires_in_day"` |  |
| `"expiring_soon"` |  |
| `"tag"` |  |
| `"tier"` |  |

Operations: List.

API path: `/v1/domains/all`

#### Inbox

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"inbox"` |  |
| `"is_testing"` |  |
| `"message"` |  |
| `"success"` |  |

Operations: Create, Load.

API path: `/v1/inboxes`

#### Men

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"success"` |  |

Operations: Load.

API path: `/v1/me`

#### Message

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"success"` |  |

Operations: Load.

API path: `/v1/inboxes/{inbox}/messages`

#### Otp

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"success"` |  |

Operations: Load.

API path: `/v1/inboxes/{inbox}/otp`

#### Plan

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"success"` |  |

Operations: Load.

API path: `/v1/plans`

#### PublicV1DashboardAnalytics

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"success"` |  |

Operations: Load.

API path: `/v1/inboxes/{inbox}/timeline`

#### PublicV1Inbox

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"custom_firstname"` |  |
| `"custom_surname"` |  |
| `"daily_limit"` |  |
| `"daily_remaining"` |  |
| `"daily_used"` |  |
| `"data"` |  |
| `"domain"` |  |
| `"domain_mode"` |  |
| `"inbox"` |  |
| `"output_format"` |  |
| `"parse_code"` |  |
| `"since"` |  |
| `"success"` |  |
| `"test_id"` |  |
| `"username_style"` |  |

Operations: Create, Remove.

API path: `/v1/inboxes/{inbox}/tests`

#### PublicV1Message

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"message"` |  |
| `"success"` |  |

Operations: Load, Remove.

API path: `/v1/inboxes/{inbox}/wait`

#### PublicV1Webhook

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"failure_count"` |  |
| `"id"` |  |
| `"inbox"` |  |
| `"url"` |  |

Operations: Create, List, Remove.

API path: `/v1/webhooks`

#### Usage

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"success"` |  |

Operations: Load.

API path: `/v1/usage`



## Entities


### CustomDomain

Create an instance: `customDomain := client.CustomDomain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `string` |  |
| `data` | `map[string]any` |  |
| `domain` | `string` |  |
| `message` | `string` |  |
| `mx_record` | `string` |  |
| `success` | `bool` |  |
| `txt_record` | `string` |  |
| `verified` | `bool` |  |

#### Example: List

```go
customDomains, err := client.CustomDomain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(customDomains) // the array of records
```

#### Example: Create

```go
result, err := client.CustomDomain(nil).Create(map[string]any{
    "data": map[string]any{},
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


### CustomDomainVerify

Create an instance: `customDomainVerify := client.CustomDomainVerify(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `message` | `string` |  |
| `success` | `bool` |  |
| `verified` | `bool` |  |

#### Example: Create

```go
result, err := client.CustomDomainVerify(nil).Create(map[string]any{
    "domain": "example_domain",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Domain

Create an instance: `domain := client.Domain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `expires_at` | `string` |  |
| `expires_in_day` | `int` |  |
| `expiring_soon` | `bool` |  |
| `tag` | `[]any` |  |
| `tier` | `string` |  |

#### Example: List

```go
domains, err := client.Domain(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(domains) // the array of records
```


### DomainsAll

Create an instance: `domainsAll := client.DomainsAll(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` |  |
| `expired` | `bool` |  |
| `expires_at` | `string` |  |
| `expires_in_day` | `int` |  |
| `expiring_soon` | `bool` |  |
| `tag` | `[]any` |  |
| `tier` | `string` |  |

#### Example: List

```go
domainsAlls, err := client.DomainsAll(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainsAlls) // the array of records
```


### Inbox

Create an instance: `inbox := client.Inbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `inbox` | `string` |  |
| `is_testing` | `bool` |  |
| `message` | `string` |  |
| `success` | `bool` |  |

#### Example: Load

```go
inbox, err := client.Inbox(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(inbox) // the loaded record
```

#### Example: Create

```go
result, err := client.Inbox(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Men

Create an instance: `men := client.Men(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `success` | `bool` |  |

#### Example: Load

```go
men, err := client.Men(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(men) // the loaded record
```


### Message

Create an instance: `message := client.Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `success` | `bool` |  |

#### Example: Load

```go
message, err := client.Message(nil).Load(map[string]any{"id": "message_id", "inbox_id": "inbox_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(message) // the loaded record
```


### Otp

Create an instance: `otp := client.Otp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `success` | `bool` |  |

#### Example: Load

```go
otp, err := client.Otp(nil).Load(map[string]any{"inbox_id": "inbox_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(otp) // the loaded record
```


### Plan

Create an instance: `plan := client.Plan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `success` | `bool` |  |

#### Example: Load

```go
plan, err := client.Plan(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(plan) // the loaded record
```


### PublicV1DashboardAnalytics

Create an instance: `publicV1DashboardAnalytics := client.PublicV1DashboardAnalytics(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `success` | `bool` |  |

#### Example: Load

```go
publicV1DashboardAnalytics, err := client.PublicV1DashboardAnalytics(nil).Load(map[string]any{"inbox_id": "inbox_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(publicV1DashboardAnalytics) // the loaded record
```


### PublicV1Inbox

Create an instance: `publicV1Inbox := client.PublicV1Inbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` |  |
| `custom_firstname` | `[]any` |  |
| `custom_surname` | `[]any` |  |
| `daily_limit` | `int` |  |
| `daily_remaining` | `int` |  |
| `daily_used` | `int` |  |
| `data` | `map[string]any` |  |
| `domain` | `[]any` |  |
| `domain_mode` | `string` |  |
| `inbox` | `[]any` |  |
| `output_format` | `string` |  |
| `parse_code` | `bool` |  |
| `since` | `int` |  |
| `success` | `bool` |  |
| `test_id` | `string` |  |
| `username_style` | `string` |  |

#### Example: Create

```go
result, err := client.PublicV1Inbox(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### PublicV1Message

Create an instance: `publicV1Message := client.PublicV1Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `message` | `string` |  |
| `success` | `bool` |  |

#### Example: Load

```go
publicV1Message, err := client.PublicV1Message(nil).Load(map[string]any{"inbox_id": "inbox_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(publicV1Message) // the loaded record
```


### PublicV1Webhook

Create an instance: `publicV1Webhook := client.PublicV1Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `failure_count` | `int` |  |
| `id` | `string` |  |
| `inbox` | `string` |  |
| `url` | `string` |  |

#### Example: List

```go
publicV1Webhooks, err := client.PublicV1Webhook(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(publicV1Webhooks) // the array of records
```

#### Example: Create

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


### Usage

Create an instance: `usage := client.Usage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `map[string]any` |  |
| `success` | `bool` |  |

#### Example: Load

```go
usage, err := client.Usage(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(usage) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/custom-temp-mail-sdk/go/
├── custom-temp-mail.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/custom-temp-mail-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
customdomain := client.CustomDomain(nil)
customdomain.List(nil, nil)

// customdomain.Data() now returns the customdomain data from the last list
// customdomain.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
