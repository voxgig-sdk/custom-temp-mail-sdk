# CustomTempMail Golang SDK



The Golang SDK for the CustomTempMail API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.CustomDomain(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
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
    created, err := client.CustomDomain(nil).Create(map[string]any{"domain": "example_domain", "mx_record": "example_mx_record", "txt_record": "example_txt_record", "verified": true}, nil)
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
domains, err := client.Domain(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = domains
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

domain, err := client.Domain(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(domain) // the returned mock data
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
| `"added_at"` | ISO 8601 timestamp when the domain was added. |
| `"domain"` | Bare domain name (no leading @). |
| `"id"` |  |
| `"mx_record"` | The MX record value to add at your registrar. |
| `"txt_record"` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `"verified"` | `true` — MX and TXT records confirmed. |

Operations: Create, List, Remove.

API path: `/v1/custom-domains`

#### CustomDomainVerify

| Field | Description |
| --- | --- |
| `"added_at"` | ISO 8601 timestamp when the domain was added. |
| `"domain"` | Bare domain name (no leading @). |
| `"mx_record"` | The MX record value to add at your registrar. |
| `"txt_record"` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `"verified"` | `true` — MX and TXT records confirmed. |

Operations: Create.

API path: `/v1/custom-domains/{domain}/verify`

#### Domain

| Field | Description |
| --- | --- |
| `"domain"` | Bare domain name (no leading @). |
| `"expires_at"` | ISO 8601 date when the domain registration expires at the registrar. |
| `"expires_in_days"` | Days remaining until expiry. |
| `"expiring_soon"` | True when the domain expires within 30 days. |
| `"tags"` | `new` — recently added, shown for ~30 days. |
| `"tier"` | `free` — available on all plans. |

Operations: List.

API path: `/v1/domains`

#### DomainsAll

| Field | Description |
| --- | --- |
| `"domain"` | Bare domain name (no leading @). |
| `"expired"` | True when the domain has already passed its expiry date. |
| `"expires_at"` | ISO 8601 date when the domain registration expires at the registrar. |
| `"expires_in_days"` | Days remaining until expiry. |
| `"expiring_soon"` | True when the domain expires within 30 days. |
| `"tags"` | `new` — recently added, shown for ~30 days. |
| `"tier"` | `free` — available on all plans. |

Operations: List.

API path: `/v1/domains/all`

#### Inbox

| Field | Description |
| --- | --- |
| `"count"` |  |
| `"inbox"` |  |
| `"inboxes"` |  |
| `"isTesting"` | Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger. |
| `"message"` |  |
| `"success"` |  |

Operations: Create, Load.

API path: `/v1/inboxes`

#### Men

| Field | Description |
| --- | --- |
| `"api_inbox_count"` |  |
| `"api_inboxes"` |  |
| `"app_inbox_count"` |  |
| `"app_inboxes"` |  |
| `"credits"` |  |
| `"custom_domain_count"` |  |
| `"custom_domains"` |  |
| `"features"` |  |
| `"plan"` |  |
| `"rate_limits"` |  |

Operations: Load.

API path: `/v1/me`

#### Message

| Field | Description |
| --- | --- |
| `"attachments"` |  |
| `"count"` |  |
| `"date"` |  |
| `"from"` |  |
| `"has_attachment"` |  |
| `"has_more"` |  |
| `"html"` |  |
| `"id"` |  |
| `"inbox"` |  |
| `"messages"` |  |
| `"otp"` |  |
| `"subject"` |  |
| `"text"` |  |
| `"to"` |  |
| `"verification_link"` |  |

Operations: Load.

API path: `/v1/inboxes/{inbox}/messages`

#### Otp

| Field | Description |
| --- | --- |
| `"from"` |  |
| `"inbox"` |  |
| `"message"` |  |
| `"message_id"` |  |
| `"otp"` |  |
| `"received_at"` |  |
| `"score"` | Confidence score (0.0 to 1.0) of the extracted OTP. |
| `"subject"` |  |
| `"verification_link"` |  |

Operations: Load.

API path: `/v1/inboxes/{inbox}/otp`

#### Plan

| Field | Description |
| --- | --- |
| `"credit_packages"` |  |
| `"plans"` |  |

Operations: Load.

API path: `/v1/plans`

#### PublicV1DashboardAnalytics

| Field | Description |
| --- | --- |
| `"analyzed_at"` |  |
| `"duration_hours"` |  |
| `"event_count"` |  |
| `"events"` |  |
| `"inbox"` |  |
| `"insights"` |  |

Operations: Load.

API path: `/v1/inboxes/{inbox}/timeline`

#### PublicV1Inbox

| Field | Description |
| --- | --- |
| `"count"` | Number of inboxes to generate (1–500 depending on plan). |
| `"custom_firstnames"` | Custom first-name pool for `firstname.surname` style. |
| `"custom_surnames"` | Custom surname pool for `firstname.surname` style. |
| `"daily_limit"` |  |
| `"daily_remaining"` |  |
| `"daily_used"` |  |
| `"domain_mode"` | Which domain pool to use. |
| `"domains"` | Required when `domain_mode` is `specific`. |
| `"id"` |  |
| `"inbox"` |  |
| `"inboxes"` |  |
| `"output_format"` | Template string for each line of output. |
| `"parseCode"` | When `true` (default), embeds `?parseCode=true` in every OTP URL. |
| `"since"` | Unix timestamp in milliseconds. |
| `"started_at"` |  |
| `"success"` |  |
| `"test_id"` | Optional custom test ID. |
| `"username_style"` | Username generation style. |

Operations: Create, Remove.

API path: `/v1/inboxes/{inbox}/tests`

#### PublicV1Message

| Field | Description |
| --- | --- |
| `"date"` |  |
| `"from"` |  |
| `"has_attachment"` |  |
| `"id"` |  |
| `"otp"` | The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value). |
| `"subject"` |  |
| `"verification_link"` |  |

Operations: Load, Remove.

API path: `/v1/inboxes/{inbox}/wait`

#### PublicV1Webhook

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"failureCount"` |  |
| `"id"` |  |
| `"inbox"` | The registered inbox to subscribe to. |
| `"url"` | The HTTPS URL to receive the POST request. |

Operations: Create, List, Remove.

API path: `/v1/webhooks`

#### Usage

| Field | Description |
| --- | --- |
| `"credits"` |  |
| `"period"` |  |
| `"plan"` |  |
| `"rate_limit"` |  |
| `"requests"` |  |

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
| `added_at` | `string` | ISO 8601 timestamp when the domain was added. |
| `domain` | `string` | Bare domain name (no leading @). |
| `id` | `string` |  |
| `mx_record` | `string` | The MX record value to add at your registrar. |
| `txt_record` | `string` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `bool` | `true` — MX and TXT records confirmed. |

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
| `added_at` | `string` | ISO 8601 timestamp when the domain was added. |
| `domain` | `string` | Bare domain name (no leading @). |
| `mx_record` | `string` | The MX record value to add at your registrar. |
| `txt_record` | `string` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `bool` | `true` — MX and TXT records confirmed. |

#### Example: Create

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


### Domain

Create an instance: `domain := client.Domain(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` | Bare domain name (no leading @). |
| `expires_at` | `string` | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `int` | Days remaining until expiry. |
| `expiring_soon` | `bool` | True when the domain expires within 30 days. |
| `tags` | `[]any` | `new` — recently added, shown for ~30 days. |
| `tier` | `string` | `free` — available on all plans. |

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
| `domain` | `string` | Bare domain name (no leading @). |
| `expired` | `bool` | True when the domain has already passed its expiry date. |
| `expires_at` | `string` | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `int` | Days remaining until expiry. |
| `expiring_soon` | `bool` | True when the domain expires within 30 days. |
| `tags` | `[]any` | `new` — recently added, shown for ~30 days. |
| `tier` | `string` | `free` — available on all plans. |

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
| `count` | `int` |  |
| `inbox` | `string` |  |
| `inboxes` | `[]any` |  |
| `isTesting` | `bool` | Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger. |
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
| `api_inbox_count` | `int` |  |
| `api_inboxes` | `[]any` |  |
| `app_inbox_count` | `int` |  |
| `app_inboxes` | `[]any` |  |
| `credits` | `int` |  |
| `custom_domain_count` | `int` |  |
| `custom_domains` | `[]any` |  |
| `features` | `map[string]any` |  |
| `plan` | `string` |  |
| `rate_limits` | `map[string]any` |  |

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
| `attachments` | `[]any` |  |
| `count` | `int` |  |
| `date` | `string` |  |
| `from` | `string` |  |
| `has_attachment` | `bool` |  |
| `has_more` | `bool` |  |
| `html` | `string` |  |
| `id` | `string` |  |
| `inbox` | `string` |  |
| `messages` | `[]any` |  |
| `otp` | `string` |  |
| `subject` | `string` |  |
| `text` | `string` |  |
| `to` | `string` |  |
| `verification_link` | `string` |  |

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
| `from` | `string` |  |
| `inbox` | `string` |  |
| `message` | `string` |  |
| `message_id` | `string` |  |
| `otp` | `string` |  |
| `received_at` | `string` |  |
| `score` | `float64` | Confidence score (0.0 to 1.0) of the extracted OTP. |
| `subject` | `string` |  |
| `verification_link` | `string` |  |

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
| `credit_packages` | `[]any` |  |
| `plans` | `[]any` |  |

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
| `analyzed_at` | `string` |  |
| `duration_hours` | `int` |  |
| `event_count` | `int` |  |
| `events` | `[]any` |  |
| `inbox` | `string` |  |
| `insights` | `[]any` |  |

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
| `count` | `int` | Number of inboxes to generate (1–500 depending on plan). |
| `custom_firstnames` | `[]any` | Custom first-name pool for `firstname.surname` style. |
| `custom_surnames` | `[]any` | Custom surname pool for `firstname.surname` style. |
| `daily_limit` | `int` |  |
| `daily_remaining` | `int` |  |
| `daily_used` | `int` |  |
| `domain_mode` | `string` | Which domain pool to use. |
| `domains` | `[]any` | Required when `domain_mode` is `specific`. |
| `id` | `string` |  |
| `inbox` | `string` |  |
| `inboxes` | `[]any` |  |
| `output_format` | `string` | Template string for each line of output. |
| `parseCode` | `bool` | When `true` (default), embeds `?parseCode=true` in every OTP URL. |
| `since` | `int` | Unix timestamp in milliseconds. |
| `started_at` | `string` |  |
| `success` | `bool` |  |
| `test_id` | `string` | Optional custom test ID. |
| `username_style` | `string` | Username generation style. |

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
| `date` | `string` |  |
| `from` | `string` |  |
| `has_attachment` | `bool` |  |
| `id` | `string` |  |
| `otp` | `string` | The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value). |
| `subject` | `string` |  |
| `verification_link` | `string` |  |

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
| `createdAt` | `string` |  |
| `failureCount` | `int` |  |
| `id` | `string` |  |
| `inbox` | `string` | The registered inbox to subscribe to. |
| `url` | `string` | The HTTPS URL to receive the POST request. |

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
| `credits` | `map[string]any` |  |
| `period` | `map[string]any` |  |
| `plan` | `string` |  |
| `rate_limit` | `map[string]any` |  |
| `requests` | `map[string]any` |  |

#### Example: Load

```go
usage, err := client.Usage(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(usage) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

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
domain := client.Domain(nil)
domain.List(nil, nil)

// domain.Data() now returns the domain data from the last list
// domain.Match() returns the last match criteria
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
