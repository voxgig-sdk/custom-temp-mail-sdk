# CustomTempMail SDK configuration

module CustomTempMailConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "CustomTempMail",
        "slug" => "custom-temp-mail",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://api2.freecustom.email",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "custom_domain" => {},
          "custom_domain_verify" => {},
          "domain" => {},
          "domains_all" => {},
          "inbox" => {},
          "men" => {},
          "message" => {},
          "otp" => {},
          "plan" => {},
          "public_v1_dashboard_analytics" => {},
          "public_v1_inbox" => {},
          "public_v1_message" => {},
          "public_v1_webhook" => {},
          "usage" => {},
        },
      },
      "entity" => {
        "custom_domain" => {
          "fields" => [
            {
              "name" => "added_at",
              "title" => "Added At",
              "type" => "`$STRING`",
              "short" => "ISO 8601 timestamp when the domain was added.",
              "format" => "date-time",
            },
            {
              "name" => "domain",
              "title" => "Domain",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Bare domain name (no leading @).",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "mx_record",
              "title" => "Mx Record",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The MX record value to add at your registrar.",
            },
            {
              "name" => "txt_record",
              "title" => "Txt Record",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.",
            },
            {
              "name" => "verified",
              "title" => "Verified",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "`true` — MX and TXT records confirmed.",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "custom_domain",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/custom-domains",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "custom-domains",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "custom-domains",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/custom-domains",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "custom-domains",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "custom-domains",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/v1/custom-domains/{domain}",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "custom-domains",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "custom-domains",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "domain" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "domain",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "mail.acme.com",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "custom_domain_verify" => {
          "fields" => [
            {
              "name" => "added_at",
              "title" => "Added At",
              "type" => "`$STRING`",
              "short" => "ISO 8601 timestamp when the domain was added.",
              "format" => "date-time",
            },
            {
              "name" => "domain",
              "title" => "Domain",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Bare domain name (no leading @).",
            },
            {
              "name" => "mx_record",
              "title" => "Mx Record",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The MX record value to add at your registrar.",
            },
            {
              "name" => "txt_record",
              "title" => "Txt Record",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.",
            },
            {
              "name" => "verified",
              "title" => "Verified",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "`true` — MX and TXT records confirmed.",
            },
          ],
          "name" => "custom_domain_verify",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/custom-domains/{domain}/verify",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "custom-domains",
                    },
                    {
                      "var" => "domain",
                    },
                    {
                      "lit" => "verify",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "custom-domains",
                    "{domain}",
                    "verify",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "domain",
                        "orig" => "domain",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "mail.acme.com",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "domain",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "$.main.kit.entity.custom_domain",
              ],
            ],
          },
        },
        "domain" => {
          "fields" => [
            {
              "name" => "domain",
              "title" => "Domain",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Bare domain name (no leading @).",
            },
            {
              "name" => "expires_at",
              "title" => "Expires At",
              "type" => "`$STRING`",
              "short" => "ISO 8601 date when the domain registration expires at the registrar.",
              "format" => "date",
            },
            {
              "name" => "expires_in_days",
              "title" => "Expires In Days",
              "type" => "`$INTEGER`",
              "short" => "Days remaining until expiry.",
            },
            {
              "name" => "expiring_soon",
              "title" => "Expiring Soon",
              "type" => "`$BOOLEAN`",
              "short" => "True when the domain expires within 30 days.",
            },
            {
              "name" => "tags",
              "title" => "Tags",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "`new` — recently added, shown for ~30 days.",
            },
            {
              "name" => "tier",
              "title" => "Tier",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "`free` — available on all plans.",
            },
          ],
          "name" => "domain",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/domains",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "domains",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "domains",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "domains_all" => {
          "fields" => [
            {
              "name" => "domain",
              "title" => "Domain",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Bare domain name (no leading @).",
            },
            {
              "name" => "expired",
              "title" => "Expired",
              "type" => "`$BOOLEAN`",
              "req" => true,
              "short" => "True when the domain has already passed its expiry date.",
            },
            {
              "name" => "expires_at",
              "title" => "Expires At",
              "type" => "`$STRING`",
              "op" => {
                "list" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "ISO 8601 date when the domain registration expires at the registrar.",
              "format" => "date",
            },
            {
              "name" => "expires_in_days",
              "title" => "Expires In Days",
              "type" => "`$INTEGER`",
              "op" => {
                "list" => {
                  "req" => true,
                  "type" => "`$INTEGER`",
                },
              },
              "short" => "Days remaining until expiry.",
            },
            {
              "name" => "expiring_soon",
              "title" => "Expiring Soon",
              "type" => "`$BOOLEAN`",
              "op" => {
                "list" => {
                  "req" => true,
                  "type" => "`$BOOLEAN`",
                },
              },
              "short" => "True when the domain expires within 30 days.",
            },
            {
              "name" => "tags",
              "title" => "Tags",
              "type" => "`$ARRAY`",
              "req" => true,
              "short" => "`new` — recently added, shown for ~30 days.",
            },
            {
              "name" => "tier",
              "title" => "Tier",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "`free` — available on all plans.",
            },
          ],
          "name" => "domains_all",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/domains/all",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "domains",
                    },
                    {
                      "lit" => "all",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "domains",
                    "all",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "inbox" => {
          "fields" => [
            {
              "name" => "count",
              "title" => "Count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "inbox",
              "title" => "Inbox",
              "type" => "`$STRING`",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "format" => "email",
            },
            {
              "name" => "inboxes",
              "title" => "Inboxes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "isTesting",
              "title" => "Is Testing",
              "type" => "`$BOOLEAN`",
              "short" => "Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger.",
            },
            {
              "name" => "message",
              "title" => "Message",
              "type" => "`$STRING`",
            },
            {
              "name" => "success",
              "title" => "Success",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "inbox",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/inboxes",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => {
                      "inbox" => "`reqdata`",
                    },
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "men" => {
          "fields" => [
            {
              "name" => "api_inbox_count",
              "title" => "Api Inbox Count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "api_inboxes",
              "title" => "Api Inboxes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "app_inbox_count",
              "title" => "App Inbox Count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "app_inboxes",
              "title" => "App Inboxes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "credits",
              "title" => "Credits",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "custom_domain_count",
              "title" => "Custom Domain Count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "custom_domains",
              "title" => "Custom Domains",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "features",
              "title" => "Features",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "plan",
              "title" => "Plan",
              "type" => "`$STRING`",
            },
            {
              "name" => "rate_limits",
              "title" => "Rate Limits",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "men",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/me",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "me",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "me",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "message" => {
          "fields" => [
            {
              "name" => "attachments",
              "title" => "Attachments",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "count",
              "title" => "Count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "from",
              "title" => "From",
              "type" => "`$STRING`",
            },
            {
              "name" => "has_attachment",
              "title" => "Has Attachment",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "has_more",
              "title" => "Has More",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "html",
              "title" => "Html",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "inbox",
              "title" => "Inbox",
              "type" => "`$STRING`",
            },
            {
              "name" => "messages",
              "title" => "Messages",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "otp",
              "title" => "Otp",
              "type" => "`$STRING`",
            },
            {
              "name" => "subject",
              "title" => "Subject",
              "type" => "`$STRING`",
            },
            {
              "name" => "text",
              "title" => "Text",
              "type" => "`$STRING`",
            },
            {
              "name" => "to",
              "title" => "To",
              "type" => "`$STRING`",
            },
            {
              "name" => "verification_link",
              "title" => "Verification Link",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "message",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/messages",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                    {
                      "var" => "inbox_id",
                    },
                    {
                      "lit" => "messages",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                    "{inbox_id}",
                    "messages",
                  ],
                  "rename" => {
                    "param" => {
                      "inbox" => "inbox_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "before",
                        "orig" => "before",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 20,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "before",
                      "inbox_id",
                      "limit",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/messages/{id}",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                    {
                      "var" => "inbox_id",
                    },
                    {
                      "lit" => "messages",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                    "{inbox_id}",
                    "messages",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "inbox" => "inbox_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                      {
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                      "inbox_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "$.main.kit.entity.inbox",
              ],
            ],
          },
        },
        "otp" => {
          "fields" => [
            {
              "name" => "from",
              "title" => "From",
              "type" => "`$STRING`",
            },
            {
              "name" => "inbox",
              "title" => "Inbox",
              "type" => "`$STRING`",
            },
            {
              "name" => "message",
              "title" => "Message",
              "type" => "`$STRING`",
            },
            {
              "name" => "message_id",
              "title" => "Message Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "otp",
              "title" => "Otp",
              "type" => "`$STRING`",
            },
            {
              "name" => "received_at",
              "title" => "Received At",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "score",
              "title" => "Score",
              "type" => "`$NUMBER`",
              "short" => "Confidence score (0.0 to 1.0) of the extracted OTP.",
              "format" => "float",
            },
            {
              "name" => "subject",
              "title" => "Subject",
              "type" => "`$STRING`",
            },
            {
              "name" => "verification_link",
              "title" => "Verification Link",
              "type" => "`$STRING`",
            },
          ],
          "name" => "otp",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/otp",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                    {
                      "var" => "inbox_id",
                    },
                    {
                      "lit" => "otp",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                    "{inbox_id}",
                    "otp",
                  ],
                  "rename" => {
                    "param" => {
                      "inbox" => "inbox_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "parse_code",
                        "orig" => "parse_code",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                        "example" => false,
                      },
                      {
                        "name" => "since",
                        "orig" => "since",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "inbox_id",
                      "parse_code",
                      "since",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/otp/public",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "otp",
                    },
                    {
                      "lit" => "public",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "otp",
                    "public",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "parse_code",
                        "orig" => "parse_code",
                        "type" => "`$BOOLEAN`",
                        "kind" => "query",
                        "example" => false,
                      },
                      {
                        "name" => "since",
                        "orig" => "since",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 1716900000000,
                      },
                      {
                        "name" => "token",
                        "orig" => "token",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "fceotp_24f1add500d18150a02c62e40b395828226a79ab",
                      },
                    ],
                  },
                  "select" => {
                    "$action" => "public",
                    "exist" => [
                      "parse_code",
                      "since",
                      "token",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "$.main.kit.entity.inbox",
              ],
            ],
          },
        },
        "plan" => {
          "fields" => [
            {
              "name" => "credit_packages",
              "title" => "Credit Packages",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "plans",
              "title" => "Plans",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "plan",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/plans",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "plans",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "plans",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "public_v1_dashboard_analytics" => {
          "fields" => [
            {
              "name" => "analyzed_at",
              "title" => "Analyzed At",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "duration_hours",
              "title" => "Duration Hours",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "event_count",
              "title" => "Event Count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "events",
              "title" => "Events",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "inbox",
              "title" => "Inbox",
              "type" => "`$STRING`",
            },
            {
              "name" => "insights",
              "title" => "Insights",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "public_v1_dashboard_analytics",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/timeline",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                    {
                      "var" => "inbox_id",
                    },
                    {
                      "lit" => "timeline",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                    "{inbox_id}",
                    "timeline",
                  ],
                  "rename" => {
                    "param" => {
                      "inbox" => "inbox_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "test@ditube.info",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "test_id",
                        "orig" => "test_id",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "inbox_id",
                      "test_id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/insights",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                    {
                      "var" => "inbox_id",
                    },
                    {
                      "lit" => "insights",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                    "{inbox_id}",
                    "insights",
                  ],
                  "rename" => {
                    "param" => {
                      "inbox" => "inbox_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "test@ditube.info",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "inbox_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "$.main.kit.entity.inbox",
              ],
            ],
          },
        },
        "public_v1_inbox" => {
          "fields" => [
            {
              "name" => "count",
              "title" => "Count",
              "type" => "`$INTEGER`",
              "short" => "Number of inboxes to generate (1–500 depending on plan).",
            },
            {
              "name" => "custom_firstnames",
              "title" => "Custom Firstnames",
              "type" => "`$ARRAY`",
              "short" => "Custom first-name pool for `firstname.surname` style.",
            },
            {
              "name" => "custom_surnames",
              "title" => "Custom Surnames",
              "type" => "`$ARRAY`",
              "short" => "Custom surname pool for `firstname.surname` style.",
            },
            {
              "name" => "daily_limit",
              "title" => "Daily Limit",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "daily_remaining",
              "title" => "Daily Remaining",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "daily_used",
              "title" => "Daily Used",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "domain_mode",
              "title" => "Domain Mode",
              "type" => "`$STRING`",
              "short" => "Which domain pool to use.",
            },
            {
              "name" => "domains",
              "title" => "Domains",
              "type" => "`$ARRAY`",
              "short" => "Required when `domain_mode` is `specific`.",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "inbox",
              "title" => "Inbox",
              "type" => "`$STRING`",
            },
            {
              "name" => "inboxes",
              "title" => "Inboxes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "output_format",
              "title" => "Output Format",
              "type" => "`$STRING`",
              "short" => "Template string for each line of output.",
            },
            {
              "name" => "parseCode",
              "title" => "Parse Code",
              "type" => "`$BOOLEAN`",
              "short" => "When `true` (default), embeds `?parseCode=true` in every OTP URL.",
            },
            {
              "name" => "since",
              "title" => "Since",
              "type" => "`$INTEGER`",
              "short" => "Unix timestamp in milliseconds.",
            },
            {
              "name" => "started_at",
              "title" => "Started At",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "success",
              "title" => "Success",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "test_id",
              "title" => "Test Id",
              "type" => "`$STRING`",
              "short" => "Optional custom test ID.",
            },
            {
              "name" => "username_style",
              "title" => "Username Style",
              "type" => "`$STRING`",
              "short" => "Username generation style.",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "public_v1_inbox",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/inboxes/{inbox}/tests",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                    {
                      "var" => "inbox_id",
                    },
                    {
                      "lit" => "tests",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                    "{inbox_id}",
                    "tests",
                  ],
                  "rename" => {
                    "param" => {
                      "inbox" => "inbox_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "test@ditube.info",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "inbox_id",
                    ],
                  },
                },
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/inboxes/generate",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                    {
                      "lit" => "generate",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                    "generate",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/v1/inboxes/{inbox}",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "inbox" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "inbox",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "$.main.kit.entity.inbox",
              ],
            ],
          },
        },
        "public_v1_message" => {
          "fields" => [
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "from",
              "title" => "From",
              "type" => "`$STRING`",
            },
            {
              "name" => "has_attachment",
              "title" => "Has Attachment",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "otp",
              "title" => "Otp",
              "type" => "`$STRING`",
              "short" => "The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value).",
            },
            {
              "name" => "subject",
              "title" => "Subject",
              "type" => "`$STRING`",
            },
            {
              "name" => "verification_link",
              "title" => "Verification Link",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "public_v1_message",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/wait",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                    {
                      "var" => "inbox_id",
                    },
                    {
                      "lit" => "wait",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                    "{inbox_id}",
                    "wait",
                  ],
                  "rename" => {
                    "param" => {
                      "inbox" => "inbox_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                    "query" => [
                      {
                        "name" => "since",
                        "orig" => "since",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "timeout",
                        "orig" => "timeout",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 30,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "inbox_id",
                      "since",
                      "timeout",
                    ],
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/v1/inboxes/{inbox}/messages/{id}",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "inboxes",
                    },
                    {
                      "var" => "inbox_id",
                    },
                    {
                      "lit" => "messages",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "inboxes",
                    "{inbox_id}",
                    "messages",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "inbox" => "inbox_id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                      {
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                      "inbox_id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "$.main.kit.entity.inbox",
              ],
            ],
          },
        },
        "public_v1_webhook" => {
          "fields" => [
            {
              "name" => "createdAt",
              "title" => "Created At",
              "type" => "`$STRING`",
              "format" => "date-time",
            },
            {
              "name" => "failureCount",
              "title" => "Failure Count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "inbox",
              "title" => "Inbox",
              "type" => "`$STRING`",
              "req" => true,
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "short" => "The registered inbox to subscribe to.",
              "format" => "email",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "req" => true,
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "short" => "The HTTPS URL to receive the POST request.",
              "format" => "uri",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "public_v1_webhook",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/webhooks",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "webhooks",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "webhooks",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/webhooks",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "webhooks",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "webhooks",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/v1/webhooks/{id}",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "webhooks",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "webhooks",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "usage" => {
          "fields" => [
            {
              "name" => "credits",
              "title" => "Credits",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "period",
              "title" => "Period",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "plan",
              "title" => "Plan",
              "type" => "`$STRING`",
            },
            {
              "name" => "rate_limit",
              "title" => "Rate Limit",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "requests",
              "title" => "Requests",
              "type" => "`$OBJECT`",
            },
          ],
          "name" => "usage",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/usage",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "usage",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "usage",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                  "args" => {},
                  "select" => {},
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    CustomTempMailFeatures.make_feature(name)
  end
end
