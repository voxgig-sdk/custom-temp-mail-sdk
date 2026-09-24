# FreeCustom.Email API

**Last updated:** May 2026 Disposable email infrastructure for developers. All routes require `Authorization: Bearer fce_&lt;key&gt;` (developer API key), except `GET /v1/plans` and `GET /v1/otp/public` which are public. ## IMAP &amp; POP3 (Growth/Enterprise) In addition to the HTTP API, Growth and Enterprise plans can read inboxes via standard mail protocols (TLS only): | Protocol | Host | Port | Auth | |----------|------|------|------| | IMAP4rev1 | imap.freecustom.email | 993 | username = inbox address, password = fce_ key | | POP3 | pop.freecustom.email | 995 | username = inbox address, password = fce_ key | Connecting and listing messages are free. Fetching a message body (IMAP FETCH / POP3 RETR) costs 1 request from the monthly quota. Docs: https://freecustom.email/api/docs/imap

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 14 entities and 25 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### CustomDomain

Results: Domain was already added (idempotent); Domain added, configure the DNS records and then call the verify endpoint; Success; Domain removed.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `added_at`: ISO 8601 timestamp when the domain was added.
- `domain`: Bare domain name (no leading @).
- `mx_record`: The MX record value to add at your registrar.
- `txt_record`: The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.
- `verified`: `true`, MX and TXT records confirmed. Inboxes can be registered. `false`, DNS records not yet verified. Call the verify endpoint.

### CustomDomainVerify

Results: Verification succeeded (or domain was already verified).

SDK operations: `create`.

Key fields to recognise:

- `added_at`: ISO 8601 timestamp when the domain was added.
- `domain`: Bare domain name (no leading @).
- `mx_record`: The MX record value to add at your registrar.
- `txt_record`: The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.
- `verified`: `true`, MX and TXT records confirmed. Inboxes can be registered. `false`, DNS records not yet verified. Call the verify endpoint.

### Domain

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `domain`: Bare domain name (no leading @).
- `expires_at`: ISO 8601 date when the domain registration expires at the registrar. Only present when `expiring_soon` is true (within 30 days).
- `expires_in_days`: Days remaining until expiry. Only present when `expiring_soon` is true.
- `expiring_soon`: True when the domain expires within 30 days. Omitted entirely for healthy domains to keep the payload lean. When true, migrate inboxes to a different domain or your own custom domain.
- `tags`: `new`, recently added, shown for ~30 days. `popular`, high-traffic domain. `featured`, pinned at top of domain picker.

### DomainsAll

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `domain`: Bare domain name (no leading @).
- `expired`: True when the domain has already passed its expiry date.
- `expires_at`: ISO 8601 date when the domain registration expires at the registrar. Only present when `expiring_soon` is true (within 30 days).
- `expires_in_days`: Days remaining until expiry. Only present when `expiring_soon` is true.
- `expiring_soon`: True when the domain expires within 30 days. Omitted entirely for healthy domains to keep the payload lean. When true, migrate inboxes to a different domain or your own custom domain.

### Inbox

Results: Inbox was already registered (idempotent); Inbox registered; Success.

SDK operations: `create`, `load`.

Key fields to recognise:

- `isTesting`: Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger.

### Men

Results: Success.

SDK operations: `load`.

### Message

Results: Success.

SDK operations: `load`.

Key fields to recognise:

- `otp`: The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/&#123;inbox&#125;/otp` to read the value).

### Otp

Results: Success (OTP found or null); OTP found or null.

SDK operations: `load`.

Key fields to recognise:

- `score`: Confidence score (0.0 to 1.0) of the extracted OTP.

### Plan

Results: Success.

SDK operations: `load`.

### PublicV1DashboardAnalytics

Results: Success.

SDK operations: `load`.

### PublicV1Inbox

Results: Test started; Inboxes generated; Unregistered.

SDK operations: `create`, `remove`.

Key fields to recognise:

- `count`: Number of inboxes to generate (1–500 depending on plan).
- `custom_firstnames`: Custom first-name pool for `firstname.surname` style.
- `custom_surnames`: Custom surname pool for `firstname.surname` style.
- `domain_mode`: Which domain pool to use.
- `domains`: Required when `domain_mode` is `specific`.

### PublicV1Message

Results: New message received; Message deleted.

SDK operations: `load`, `remove`.

Key fields to recognise:

- `otp`: The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/&#123;inbox&#125;/otp` to read the value).

### PublicV1Webhook

Results: Webhook registered; Success; Webhook unregistered.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `inbox`: The registered inbox to subscribe to.
- `url`: The HTTPS URL to receive the POST request.

### Usage

Results: Success.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| CustomDomain | `create` | `POST /v1/custom-domains` | Required |
| CustomDomain | `list` | `GET /v1/custom-domains` | Required |
| CustomDomain | `remove` | `DELETE /v1/custom-domains/{domain}` | Required |
| CustomDomainVerify | `create` | `POST /v1/custom-domains/{domain}/verify` | Required |
| Domain | `list` | `GET /v1/domains` | Required |
| DomainsAll | `list` | `GET /v1/domains/all` | Required |
| Inbox | `create` | `POST /v1/inboxes` | Required |
| Inbox | `load` | `GET /v1/inboxes` | Required |
| Men | `load` | `GET /v1/me` | Required |
| Message | `load` | `GET /v1/inboxes/{inbox}/messages` | Required |
| Message | `load` | `GET /v1/inboxes/{inbox}/messages/{id}` | Required |
| Otp | `load` | `GET /v1/inboxes/{inbox}/otp` | Required |
| Otp | `load` | `GET /v1/otp/public` | Not required |
| Plan | `load` | `GET /v1/plans` | Not required |
| PublicV1DashboardAnalytics | `load` | `GET /v1/inboxes/{inbox}/timeline` | Required |
| PublicV1DashboardAnalytics | `load` | `GET /v1/inboxes/{inbox}/insights` | Required |
| PublicV1Inbox | `create` | `POST /v1/inboxes/{inbox}/tests` | Required |
| PublicV1Inbox | `create` | `POST /v1/inboxes/generate` | Required |
| PublicV1Inbox | `remove` | `DELETE /v1/inboxes/{inbox}` | Required |
| PublicV1Message | `load` | `GET /v1/inboxes/{inbox}/wait` | Required |
| PublicV1Message | `remove` | `DELETE /v1/inboxes/{inbox}/messages/{id}` | Required |
| PublicV1Webhook | `create` | `POST /v1/webhooks` | Required |
| PublicV1Webhook | `list` | `GET /v1/webhooks` | Required |
| PublicV1Webhook | `remove` | `DELETE /v1/webhooks/{id}` | Required |
| Usage | `load` | `GET /v1/usage` | Required |

## Connect to the API

- Production: `https://api2.freecustom.email`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Developer API key as Bearer token (for example `Bearer fce_xxx`)

API key as query parameter (alternative to Bearer header)

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

A read request without required parameters or authentication is `GET /v1/plans`. For example:

```sh
curl --fail-with-body --silent --show-error 'https://api2.freecustom.email/v1/plans'
```

Inspect the response using the Plan reference. This checks the public route; authenticated operations need their own credentials and request data.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `custom-temp-mail_list`: List records for an entity. Supported entities: `custom_domain`, `domain`, `domains_all`, `public_v1_webhook`.
- `custom-temp-mail_load`: Load one record for an entity. Supported entities: `inbox`, `men`, `message`, `otp`, `plan`, `public_v1_dashboard_analytics`, `public_v1_message`, `usage`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

