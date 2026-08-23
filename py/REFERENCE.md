# CustomTempMail Python SDK Reference

Complete API reference for the CustomTempMail Python SDK.


## CustomTempMailSDK

### Constructor

```python
from customtempmail_sdk import CustomTempMailSDK

client = CustomTempMailSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `CustomTempMailSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = CustomTempMailSDK.test()
```


### Instance Methods

#### `CustomDomain(data=None)`

Create a new `CustomDomainEntity` instance. Pass `None` for no initial data.

#### `CustomDomainVerify(data=None)`

Create a new `CustomDomainVerifyEntity` instance. Pass `None` for no initial data.

#### `Domain(data=None)`

Create a new `DomainEntity` instance. Pass `None` for no initial data.

#### `DomainsAll(data=None)`

Create a new `DomainsAllEntity` instance. Pass `None` for no initial data.

#### `Inbox(data=None)`

Create a new `InboxEntity` instance. Pass `None` for no initial data.

#### `Men(data=None)`

Create a new `MenEntity` instance. Pass `None` for no initial data.

#### `Message(data=None)`

Create a new `MessageEntity` instance. Pass `None` for no initial data.

#### `Otp(data=None)`

Create a new `OtpEntity` instance. Pass `None` for no initial data.

#### `Plan(data=None)`

Create a new `PlanEntity` instance. Pass `None` for no initial data.

#### `PublicV1DashboardAnalytics(data=None)`

Create a new `PublicV1DashboardAnalyticsEntity` instance. Pass `None` for no initial data.

#### `PublicV1Inbox(data=None)`

Create a new `PublicV1InboxEntity` instance. Pass `None` for no initial data.

#### `PublicV1Message(data=None)`

Create a new `PublicV1MessageEntity` instance. Pass `None` for no initial data.

#### `PublicV1Webhook(data=None)`

Create a new `PublicV1WebhookEntity` instance. Pass `None` for no initial data.

#### `Usage(data=None)`

Create a new `UsageEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CustomDomainEntity

```python
custom_domain = client.CustomDomain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `str` | No | ISO 8601 timestamp when the domain was added. |
| `domain` | `str` | Yes | Bare domain name (no leading @). |
| `mx_record` | `str` | Yes | The MX record value to add at your registrar. |
| `txt_record` | `str` | Yes | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `bool` | Yes | `true` — MX and TXT records confirmed. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CustomDomain().create({
    "domain": "example_domain",  # str
    "mx_record": "example_mx_record",  # str
    "txt_record": "example_txt_record",  # str
    "verified": True,  # bool
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.CustomDomain().list()
for custom_domain in results:
    print(custom_domain)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.CustomDomain().remove({"id": "id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CustomDomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CustomDomainVerifyEntity

```python
custom_domain_verify = client.CustomDomainVerify()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `added_at` | `str` | No | ISO 8601 timestamp when the domain was added. |
| `domain` | `str` | Yes | Bare domain name (no leading @). |
| `mx_record` | `str` | Yes | The MX record value to add at your registrar. |
| `txt_record` | `str` | Yes | The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. |
| `verified` | `bool` | Yes | `true` — MX and TXT records confirmed. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.CustomDomainVerify().create({
    "domain": "example_domain",  # str
    "mx_record": "example_mx_record",  # str
    "txt_record": "example_txt_record",  # str
    "verified": True,  # bool
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CustomDomainVerifyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainEntity

```python
domain = client.Domain()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `str` | Yes | Bare domain name (no leading @). |
| `expires_at` | `str` | No | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `int` | No | Days remaining until expiry. |
| `expiring_soon` | `bool` | No | True when the domain expires within 30 days. |
| `tags` | `list` | Yes | `new` — recently added, shown for ~30 days. |
| `tier` | `str` | Yes | `free` — available on all plans. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Domain().list()
for domain in results:
    print(domain)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainsAllEntity

```python
domains_all = client.DomainsAll()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `str` | Yes | Bare domain name (no leading @). |
| `expired` | `bool` | Yes | True when the domain has already passed its expiry date. |
| `expires_at` | `str` | No | ISO 8601 date when the domain registration expires at the registrar. |
| `expires_in_days` | `int` | No | Days remaining until expiry. |
| `expiring_soon` | `bool` | No | True when the domain expires within 30 days. |
| `tags` | `list` | Yes | `new` — recently added, shown for ~30 days. |
| `tier` | `str` | Yes | `free` — available on all plans. |

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

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DomainsAll().list()
for domains_all in results:
    print(domains_all)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainsAllEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InboxEntity

```python
inbox = client.Inbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No |  |
| `inbox` | `str` | No |  |
| `inboxes` | `list` | No |  |
| `isTesting` | `bool` | No | Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger. |
| `message` | `str` | No |  |
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Inbox().create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Inbox().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MenEntity

```python
men = client.Men()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `api_inbox_count` | `int` | No |  |
| `api_inboxes` | `list` | No |  |
| `app_inbox_count` | `int` | No |  |
| `app_inboxes` | `list` | No |  |
| `credits` | `int` | No |  |
| `custom_domain_count` | `int` | No |  |
| `custom_domains` | `list` | No |  |
| `features` | `dict` | No |  |
| `plan` | `str` | No |  |
| `rate_limits` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Men().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MessageEntity

```python
message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `attachments` | `list` | No |  |
| `count` | `int` | No |  |
| `date` | `str` | No |  |
| `from` | `str` | No |  |
| `has_attachment` | `bool` | No |  |
| `has_more` | `bool` | No |  |
| `html` | `str` | No |  |
| `id` | `str` | No |  |
| `inbox` | `str` | No |  |
| `messages` | `list` | No |  |
| `otp` | `str` | No |  |
| `subject` | `str` | No |  |
| `text` | `str` | No |  |
| `to` | `str` | No |  |
| `verification_link` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Message().load({"id": "message_id", "inbox_id": "inbox_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OtpEntity

```python
otp = client.Otp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `str` | No |  |
| `inbox` | `str` | No |  |
| `message` | `str` | No |  |
| `message_id` | `str` | No |  |
| `otp` | `str` | No |  |
| `received_at` | `str` | No |  |
| `score` | `float` | No | Confidence score (0.0 to 1.0) of the extracted OTP. |
| `subject` | `str` | No |  |
| `verification_link` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Otp().load({"inbox_id": "inbox_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OtpEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlanEntity

```python
plan = client.Plan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credit_packages` | `list` | No |  |
| `plans` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Plan().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlanEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PublicV1DashboardAnalyticsEntity

```python
public_v1_dashboard_analytics = client.PublicV1DashboardAnalytics()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyzed_at` | `str` | No |  |
| `duration_hours` | `int` | No |  |
| `event_count` | `int` | No |  |
| `events` | `list` | No |  |
| `inbox` | `str` | No |  |
| `insights` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PublicV1DashboardAnalytics().load({"inbox_id": "inbox_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicV1DashboardAnalyticsEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PublicV1InboxEntity

```python
public_v1_inbox = client.PublicV1Inbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `count` | `int` | No | Number of inboxes to generate (1–500 depending on plan). |
| `custom_firstnames` | `list` | No | Custom first-name pool for `firstname.surname` style. |
| `custom_surnames` | `list` | No | Custom surname pool for `firstname.surname` style. |
| `daily_limit` | `int` | No |  |
| `daily_remaining` | `int` | No |  |
| `daily_used` | `int` | No |  |
| `domain_mode` | `str` | No | Which domain pool to use. |
| `domains` | `list` | No | Required when `domain_mode` is `specific`. |
| `inbox` | `str` | No |  |
| `inboxes` | `list` | No |  |
| `output_format` | `str` | No | Template string for each line of output. |
| `parseCode` | `bool` | No | When `true` (default), embeds `?parseCode=true` in every OTP URL. |
| `since` | `int` | No | Unix timestamp in milliseconds. |
| `started_at` | `str` | No |  |
| `success` | `bool` | No |  |
| `test_id` | `str` | No | Optional custom test ID. |
| `username_style` | `str` | No | Username generation style. |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PublicV1Inbox().create({
})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.PublicV1Inbox().remove({"id": "id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicV1InboxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PublicV1MessageEntity

```python
public_v1_message = client.PublicV1Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `str` | No |  |
| `from` | `str` | No |  |
| `has_attachment` | `bool` | No |  |
| `id` | `str` | No |  |
| `otp` | `str` | No | The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value). |
| `subject` | `str` | No |  |
| `verification_link` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PublicV1Message().load({"inbox_id": "inbox_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.PublicV1Message().remove({"id": "id", "inbox_id": "inbox_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicV1MessageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PublicV1WebhookEntity

```python
public_v1_webhook = client.PublicV1Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | No |  |
| `failureCount` | `int` | No |  |
| `id` | `str` | No |  |
| `inbox` | `str` | Yes | The registered inbox to subscribe to. |
| `url` | `str` | Yes | The HTTPS URL to receive the POST request. |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `failureCount` | - | - | - |
| `id` | - | - | - |
| `inbox` | Yes | - | - |
| `url` | Yes | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PublicV1Webhook().create({
    "inbox": "example_inbox",  # str
    "url": "example_url",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PublicV1Webhook().list()
for public_v1_webhook in results:
    print(public_v1_webhook)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.PublicV1Webhook().remove({"id": "id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicV1WebhookEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UsageEntity

```python
usage = client.Usage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `credits` | `dict` | No |  |
| `period` | `dict` | No |  |
| `plan` | `str` | No |  |
| `rate_limit` | `dict` | No |  |
| `requests` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Usage().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UsageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = CustomTempMailSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

