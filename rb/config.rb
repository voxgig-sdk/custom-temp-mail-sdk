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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "short" => "ISO 8601 timestamp when the domain was added.",
              "type" => "`$STRING`",
            },
            {
              "name" => "domain",
              "req" => true,
              "short" => "Bare domain name (no leading @).",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "mx_record",
              "req" => true,
              "short" => "The MX record value to add at your registrar.",
              "type" => "`$STRING`",
            },
            {
              "name" => "txt_record",
              "req" => true,
              "short" => "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.",
              "type" => "`$STRING`",
            },
            {
              "name" => "verified",
              "req" => true,
              "short" => "`true` — MX and TXT records confirmed.",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "custom_domain",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/custom-domains",
                  "parts" => [
                    "v1",
                    "custom-domains",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/custom-domains",
                  "parts" => [
                    "v1",
                    "custom-domains",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "mail.acme.com",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "domain",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/v1/custom-domains/{domain}",
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
              "short" => "ISO 8601 timestamp when the domain was added.",
              "type" => "`$STRING`",
            },
            {
              "name" => "domain",
              "req" => true,
              "short" => "Bare domain name (no leading @).",
              "type" => "`$STRING`",
            },
            {
              "name" => "mx_record",
              "req" => true,
              "short" => "The MX record value to add at your registrar.",
              "type" => "`$STRING`",
            },
            {
              "name" => "txt_record",
              "req" => true,
              "short" => "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.",
              "type" => "`$STRING`",
            },
            {
              "name" => "verified",
              "req" => true,
              "short" => "`true` — MX and TXT records confirmed.",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "custom_domain_verify",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "mail.acme.com",
                        "kind" => "param",
                        "name" => "domain",
                        "orig" => "domain",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/custom-domains/{domain}/verify",
                  "parts" => [
                    "v1",
                    "custom-domains",
                    "{domain}",
                    "verify",
                  ],
                  "select" => {
                    "exist" => [
                      "domain",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "custom_domain",
              ],
            ],
          },
        },
        "domain" => {
          "fields" => [
            {
              "name" => "domain",
              "req" => true,
              "short" => "Bare domain name (no leading @).",
              "type" => "`$STRING`",
            },
            {
              "name" => "expires_at",
              "short" => "ISO 8601 date when the domain registration expires at the registrar.",
              "type" => "`$STRING`",
            },
            {
              "name" => "expires_in_days",
              "short" => "Days remaining until expiry.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "expiring_soon",
              "short" => "True when the domain expires within 30 days.",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "tags",
              "req" => true,
              "short" => "`new` — recently added, shown for ~30 days.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "tier",
              "req" => true,
              "short" => "`free` — available on all plans.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "domain",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/domains",
                  "parts" => [
                    "v1",
                    "domains",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
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
              "req" => true,
              "short" => "Bare domain name (no leading @).",
              "type" => "`$STRING`",
            },
            {
              "name" => "expired",
              "req" => true,
              "short" => "True when the domain has already passed its expiry date.",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "expires_at",
              "op" => {
                "list" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "ISO 8601 date when the domain registration expires at the registrar.",
              "type" => "`$STRING`",
            },
            {
              "name" => "expires_in_days",
              "op" => {
                "list" => {
                  "req" => true,
                  "type" => "`$INTEGER`",
                },
              },
              "short" => "Days remaining until expiry.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "expiring_soon",
              "op" => {
                "list" => {
                  "req" => true,
                  "type" => "`$BOOLEAN`",
                },
              },
              "short" => "True when the domain expires within 30 days.",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "tags",
              "req" => true,
              "short" => "`new` — recently added, shown for ~30 days.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "tier",
              "req" => true,
              "short" => "`free` — available on all plans.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "domains_all",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/domains/all",
                  "parts" => [
                    "v1",
                    "domains",
                    "all",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
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
              "type" => "`$INTEGER`",
            },
            {
              "name" => "inbox",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "type" => "`$STRING`",
            },
            {
              "name" => "inboxes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "isTesting",
              "short" => "Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger.",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "message",
              "type" => "`$STRING`",
            },
            {
              "name" => "success",
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
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/inboxes",
                  "parts" => [
                    "v1",
                    "inboxes",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => {
                      "inbox" => "`reqdata`",
                    },
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes",
                  "parts" => [
                    "v1",
                    "inboxes",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
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
              "type" => "`$INTEGER`",
            },
            {
              "name" => "api_inboxes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "app_inbox_count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "app_inboxes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "credits",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "custom_domain_count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "custom_domains",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "features",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "plan",
              "type" => "`$STRING`",
            },
            {
              "name" => "rate_limits",
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
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/me",
                  "parts" => [
                    "v1",
                    "me",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
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
              "type" => "`$ARRAY`",
            },
            {
              "name" => "count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "date",
              "type" => "`$STRING`",
            },
            {
              "name" => "from",
              "type" => "`$STRING`",
            },
            {
              "name" => "has_attachment",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "has_more",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "html",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "inbox",
              "type" => "`$STRING`",
            },
            {
              "name" => "messages",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "otp",
              "type" => "`$STRING`",
            },
            {
              "name" => "subject",
              "type" => "`$STRING`",
            },
            {
              "name" => "text",
              "type" => "`$STRING`",
            },
            {
              "name" => "to",
              "type" => "`$STRING`",
            },
            {
              "name" => "verification_link",
              "type" => "`$STRING`",
            },
          ],
          "name" => "message",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "before",
                        "orig" => "before",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/messages",
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
                  "select" => {
                    "exist" => [
                      "before",
                      "inbox_id",
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/messages/{id}",
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
                  "select" => {
                    "exist" => [
                      "id",
                      "inbox_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "inbox",
              ],
            ],
          },
        },
        "otp" => {
          "fields" => [
            {
              "name" => "from",
              "type" => "`$STRING`",
            },
            {
              "name" => "inbox",
              "type" => "`$STRING`",
            },
            {
              "name" => "message",
              "type" => "`$STRING`",
            },
            {
              "name" => "message_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "otp",
              "type" => "`$STRING`",
            },
            {
              "name" => "received_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "score",
              "short" => "Confidence score (0.0 to 1.0) of the extracted OTP.",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "subject",
              "type" => "`$STRING`",
            },
            {
              "name" => "verification_link",
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
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "parse_code",
                        "orig" => "parse_code",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "since",
                        "orig" => "since",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/otp",
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
                  "select" => {
                    "exist" => [
                      "inbox_id",
                      "parse_code",
                      "since",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => false,
                        "kind" => "query",
                        "name" => "parse_code",
                        "orig" => "parse_code",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 1716900000000,
                        "kind" => "query",
                        "name" => "since",
                        "orig" => "since",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "fceotp_24f1add500d18150a02c62e40b395828226a79ab",
                        "kind" => "query",
                        "name" => "token",
                        "orig" => "token",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/otp/public",
                  "parts" => [
                    "v1",
                    "otp",
                    "public",
                  ],
                  "select" => {
                    "$action" => "public",
                    "exist" => [
                      "parse_code",
                      "since",
                      "token",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "inbox",
              ],
            ],
          },
        },
        "plan" => {
          "fields" => [
            {
              "name" => "credit_packages",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "plans",
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
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/plans",
                  "parts" => [
                    "v1",
                    "plans",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "duration_hours",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "event_count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "events",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "inbox",
              "type" => "`$STRING`",
            },
            {
              "name" => "insights",
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
                  "args" => {
                    "params" => [
                      {
                        "example" => "test@ditube.info",
                        "kind" => "param",
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "test_id",
                        "orig" => "test_id",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/timeline",
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
                  "select" => {
                    "exist" => [
                      "inbox_id",
                      "test_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "test@ditube.info",
                        "kind" => "param",
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/insights",
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
                  "select" => {
                    "exist" => [
                      "inbox_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "inbox",
              ],
            ],
          },
        },
        "public_v1_inbox" => {
          "fields" => [
            {
              "name" => "count",
              "short" => "Number of inboxes to generate (1–500 depending on plan).",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "custom_firstnames",
              "short" => "Custom first-name pool for `firstname.surname` style.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "custom_surnames",
              "short" => "Custom surname pool for `firstname.surname` style.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "daily_limit",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "daily_remaining",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "daily_used",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "domain_mode",
              "short" => "Which domain pool to use.",
              "type" => "`$STRING`",
            },
            {
              "name" => "domains",
              "short" => "Required when `domain_mode` is `specific`.",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "inbox",
              "type" => "`$STRING`",
            },
            {
              "name" => "inboxes",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "output_format",
              "short" => "Template string for each line of output.",
              "type" => "`$STRING`",
            },
            {
              "name" => "parseCode",
              "short" => "When `true` (default), embeds `?parseCode=true` in every OTP URL.",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "since",
              "short" => "Unix timestamp in milliseconds.",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "started_at",
              "type" => "`$STRING`",
            },
            {
              "name" => "success",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "test_id",
              "short" => "Optional custom test ID.",
              "type" => "`$STRING`",
            },
            {
              "name" => "username_style",
              "short" => "Username generation style.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "public_v1_inbox",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "test@ditube.info",
                        "kind" => "param",
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/inboxes/{inbox}/tests",
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
                  "select" => {
                    "exist" => [
                      "inbox_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/inboxes/generate",
                  "parts" => [
                    "v1",
                    "inboxes",
                    "generate",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "inbox",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/v1/inboxes/{inbox}",
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "inbox",
              ],
            ],
          },
        },
        "public_v1_message" => {
          "fields" => [
            {
              "name" => "date",
              "type" => "`$STRING`",
            },
            {
              "name" => "from",
              "type" => "`$STRING`",
            },
            {
              "name" => "has_attachment",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "otp",
              "short" => "The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value).",
              "type" => "`$STRING`",
            },
            {
              "name" => "subject",
              "type" => "`$STRING`",
            },
            {
              "name" => "verification_link",
              "type" => "`$STRING`",
            },
          ],
          "name" => "public_v1_message",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "since",
                        "orig" => "since",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 30,
                        "kind" => "query",
                        "name" => "timeout",
                        "orig" => "timeout",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/inboxes/{inbox}/wait",
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
                  "select" => {
                    "exist" => [
                      "inbox_id",
                      "since",
                      "timeout",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "inbox_id",
                        "orig" => "inbox",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/v1/inboxes/{inbox}/messages/{id}",
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
                  "select" => {
                    "exist" => [
                      "id",
                      "inbox_id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "inbox",
              ],
            ],
          },
        },
        "public_v1_webhook" => {
          "fields" => [
            {
              "name" => "createdAt",
              "type" => "`$STRING`",
            },
            {
              "name" => "failureCount",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "inbox",
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "The registered inbox to subscribe to.",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "op" => {
                "list" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "short" => "The HTTPS URL to receive the POST request.",
              "type" => "`$STRING`",
            },
          ],
          "name" => "public_v1_webhook",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/v1/webhooks",
                  "parts" => [
                    "v1",
                    "webhooks",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/webhooks",
                  "parts" => [
                    "v1",
                    "webhooks",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/v1/webhooks/{id}",
                  "parts" => [
                    "v1",
                    "webhooks",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
              "type" => "`$OBJECT`",
            },
            {
              "name" => "period",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "plan",
              "type" => "`$STRING`",
            },
            {
              "name" => "rate_limit",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "requests",
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
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/usage",
                  "parts" => [
                    "v1",
                    "usage",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.data`",
                  },
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
