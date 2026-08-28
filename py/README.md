# CustomTempMail Python SDK



The Python SDK for the CustomTempMail API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CustomDomain()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/custom-temp-mail-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from customtempmail_sdk import CustomTempMailSDK

client = CustomTempMailSDK({
    "apikey": os.environ.get("CUSTOM_TEMP_MAIL_APIKEY"),
})
```

### 2. List customdomain records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    customdomains = client.CustomDomain().list()
    for customdomain in customdomains:
        print(customdomain)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a message

Message is nested under inbox, so provide the `inbox_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    message = client.Message().load({"inbox_id": "example_inbox_id"})
    print(message)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.CustomDomain().create({"domain": "example_domain", "mx_record": "example_mx_record", "txt_record": "example_txt_record", "verified": True})

# Remove
client.CustomDomain().remove({"id": "example_id"})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    domains = client.Domain().list()
    print(domains)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = CustomTempMailSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
domain = client.Domain().list()
# domain contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = CustomTempMailSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### CustomTempMailSDK

```python
from customtempmail_sdk import CustomTempMailSDK

client = CustomTempMailSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = CustomTempMailSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### CustomTempMailSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `custom_domain = client.CustomDomain()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `str` | ISO 8601 timestamp when the domain was added. |
| `domain` | `str` | Bare domain name (no leading @). |
| `id` | `str` |  |
| `mx_record` | `str` | The MX record value to add at your registrar. |
| `txt_record` | `str` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `bool` | `true` — MX and TXT records confirmed. |

#### Example: List

```python
custom_domains = client.CustomDomain().list()
```

#### Example: Create

```python
custom_domain = client.CustomDomain().create({
    "domain": "example_domain",  # str
    "mx_record": "example_mx_record",  # str
    "txt_record": "example_txt_record",  # str
    "verified": True,  # bool
})
```


### CustomDomainVerify

Create an instance: `custom_domain_verify = client.CustomDomainVerify()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `added_at` | `str` | ISO 8601 timestamp when the domain was added. |
| `domain` | `str` | Bare domain name (no leading @). |
| `mx_record` | `str` | The MX record value to add at your registrar. |
| `txt_record` | `str` | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `bool` | `true` — MX and TXT records confirmed. |

#### Example: Create

```python
custom_domain_verify = client.CustomDomainVerify().create({
    "domain": "example_domain",  # str
    "mx_record": "example_mx_record",  # str
    "txt_record": "example_txt_record",  # str
    "verified": True,  # bool
})
```


### Domain

Create an instance: `domain = client.Domain()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `str` | Bare domain name (no leading @). |
| `expires_at` | `str` | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `int` | Days remaining until expiry. |
| `expiring_soon` | `bool` | True when the domain expires within 30 days. |
| `tags` | `list` | `new` — recently added, shown for ~30 days. |
| `tier` | `str` | `free` — available on all plans. |

#### Example: List

```python
domains = client.Domain().list()
```


### DomainsAll

Create an instance: `domains_all = client.DomainsAll()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `str` | Bare domain name (no leading @). |
| `expired` | `bool` | True when the domain has already passed its expiry date. |
| `expires_at` | `str` | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `int` | Days remaining until expiry. |
| `expiring_soon` | `bool` | True when the domain expires within 30 days. |
| `tags` | `list` | `new` — recently added, shown for ~30 days. |
| `tier` | `str` | `free` — available on all plans. |

#### Example: List

```python
domains_alls = client.DomainsAll().list()
```


### Inbox

Create an instance: `inbox = client.Inbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` |  |
| `inbox` | `str` |  |
| `inboxes` | `list` |  |
| `isTesting` | `bool` | Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger. |
| `message` | `str` |  |
| `success` | `bool` |  |

#### Example: Load

```python
inbox = client.Inbox().load()
```

#### Example: Create

```python
inbox = client.Inbox().create({
})
```


### Men

Create an instance: `men = client.Men()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `api_inbox_count` | `int` |  |
| `api_inboxes` | `list` |  |
| `app_inbox_count` | `int` |  |
| `app_inboxes` | `list` |  |
| `credits` | `int` |  |
| `custom_domain_count` | `int` |  |
| `custom_domains` | `list` |  |
| `features` | `dict` |  |
| `plan` | `str` |  |
| `rate_limits` | `dict` |  |

#### Example: Load

```python
men = client.Men().load()
```


### Message

Create an instance: `message = client.Message()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `attachments` | `list` |  |
| `count` | `int` |  |
| `date` | `str` |  |
| `from` | `str` |  |
| `has_attachment` | `bool` |  |
| `has_more` | `bool` |  |
| `html` | `str` |  |
| `id` | `str` |  |
| `inbox` | `str` |  |
| `messages` | `list` |  |
| `otp` | `str` |  |
| `subject` | `str` |  |
| `text` | `str` |  |
| `to` | `str` |  |
| `verification_link` | `str` |  |

#### Example: Load

```python
message = client.Message().load({"id": "message_id", "inbox_id": "inbox_id"})
```


### Otp

Create an instance: `otp = client.Otp()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `str` |  |
| `inbox` | `str` |  |
| `message` | `str` |  |
| `message_id` | `str` |  |
| `otp` | `str` |  |
| `received_at` | `str` |  |
| `score` | `float` | Confidence score (0.0 to 1.0) of the extracted OTP. |
| `subject` | `str` |  |
| `verification_link` | `str` |  |

#### Example: Load

```python
otp = client.Otp().load({"inbox_id": "inbox_id"})
```


### Plan

Create an instance: `plan = client.Plan()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credit_packages` | `list` |  |
| `plans` | `list` |  |

#### Example: Load

```python
plan = client.Plan().load()
```


### PublicV1DashboardAnalytics

Create an instance: `public_v1_dashboard_analytics = client.PublicV1DashboardAnalytics()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyzed_at` | `str` |  |
| `duration_hours` | `int` |  |
| `event_count` | `int` |  |
| `events` | `list` |  |
| `inbox` | `str` |  |
| `insights` | `list` |  |

#### Example: Load

```python
public_v1_dashboard_analytics = client.PublicV1DashboardAnalytics().load({"inbox_id": "inbox_id"})
```


### PublicV1Inbox

Create an instance: `public_v1_inbox = client.PublicV1Inbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `count` | `int` | Number of inboxes to generate (1–500 depending on plan). |
| `custom_firstnames` | `list` | Custom first-name pool for `firstname.surname` style. |
| `custom_surnames` | `list` | Custom surname pool for `firstname.surname` style. |
| `daily_limit` | `int` |  |
| `daily_remaining` | `int` |  |
| `daily_used` | `int` |  |
| `domain_mode` | `str` | Which domain pool to use. |
| `domains` | `list` | Required when `domain_mode` is `specific`. |
| `id` | `str` |  |
| `inbox` | `str` |  |
| `inboxes` | `list` |  |
| `output_format` | `str` | Template string for each line of output. |
| `parseCode` | `bool` | When `true` (default), embeds `?parseCode=true` in every OTP URL. |
| `since` | `int` | Unix timestamp in milliseconds. |
| `started_at` | `str` |  |
| `success` | `bool` |  |
| `test_id` | `str` | Optional custom test ID. |
| `username_style` | `str` | Username generation style. |

#### Example: Create

```python
public_v1_inbox = client.PublicV1Inbox().create({
})
```


### PublicV1Message

Create an instance: `public_v1_message = client.PublicV1Message()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `str` |  |
| `from` | `str` |  |
| `has_attachment` | `bool` |  |
| `id` | `str` |  |
| `otp` | `str` | The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value). |
| `subject` | `str` |  |
| `verification_link` | `str` |  |

#### Example: Load

```python
public_v1_message = client.PublicV1Message().load({"inbox_id": "inbox_id"})
```


### PublicV1Webhook

Create an instance: `public_v1_webhook = client.PublicV1Webhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` |  |
| `failureCount` | `int` |  |
| `id` | `str` |  |
| `inbox` | `str` | The registered inbox to subscribe to. |
| `url` | `str` | The HTTPS URL to receive the POST request. |

#### Example: List

```python
public_v1_webhooks = client.PublicV1Webhook().list()
```

#### Example: Create

```python
public_v1_webhook = client.PublicV1Webhook().create({
    "inbox": "example_inbox",  # str
    "url": "example_url",  # str
})
```


### Usage

Create an instance: `usage = client.Usage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `credits` | `dict` |  |
| `period` | `dict` |  |
| `plan` | `str` |  |
| `rate_limit` | `dict` |  |
| `requests` | `dict` |  |

#### Example: Load

```python
usage = client.Usage().load()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── customtempmail_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`customtempmail_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
domain = client.Domain()
domain.list()

# domain.data_get() now returns the domain data from the last list
# domain.match_get() returns the last match criteria
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
