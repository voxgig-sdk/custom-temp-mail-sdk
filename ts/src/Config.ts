
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'CustomTempMail',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://api2.freecustom.email',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      custom_domain: {
      },

      custom_domain_verify: {
      },

      domain: {
      },

      domains_all: {
      },

      inbox: {
      },

      men: {
      },

      message: {
      },

      otp: {
      },

      plan: {
      },

      public_v1_dashboard_analytics: {
      },

      public_v1_inbox: {
      },

      public_v1_message: {
      },

      public_v1_webhook: {
      },

      usage: {
      },

    }
  }


  entity = {
    "custom_domain": {
      "fields": [
        {
          "active": true,
          "name": "added_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "domain",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "mx_record",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "txt_record",
          "req": true,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "verified",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 4
        }
      ],
      "name": "custom_domain",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/v1/custom-domains",
              "parts": [
                "v1",
                "custom-domains"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/custom-domains",
              "parts": [
                "v1",
                "custom-domains"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "mail.acme.com",
                    "kind": "param",
                    "name": "id",
                    "orig": "domain",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/v1/custom-domains/{domain}",
              "parts": [
                "v1",
                "custom-domains",
                "{id}"
              ],
              "rename": {
                "param": {
                  "domain": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "custom_domain_verify": {
      "fields": [
        {
          "active": true,
          "name": "added_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "domain",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "mx_record",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "txt_record",
          "req": true,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "verified",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 4
        }
      ],
      "name": "custom_domain_verify",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "mail.acme.com",
                    "kind": "param",
                    "name": "domain",
                    "orig": "domain",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/v1/custom-domains/{domain}/verify",
              "parts": [
                "v1",
                "custom-domains",
                "{domain}",
                "verify"
              ],
              "select": {
                "exist": [
                  "domain"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        }
      },
      "relations": {
        "ancestors": [
          [
            "custom_domain"
          ]
        ]
      }
    },
    "domain": {
      "fields": [
        {
          "active": true,
          "name": "domain",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "expires_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "expires_in_days",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "expiring_soon",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 3
        },
        {
          "active": true,
          "name": "tags",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 4
        },
        {
          "active": true,
          "name": "tier",
          "req": true,
          "type": "`$STRING`",
          "index$": 5
        }
      ],
      "name": "domain",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/domains",
              "parts": [
                "v1",
                "domains"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "domains_all": {
      "fields": [
        {
          "active": true,
          "name": "domain",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "expired",
          "req": true,
          "type": "`$BOOLEAN`",
          "index$": 1
        },
        {
          "active": true,
          "name": "expires_at",
          "op": {
            "list": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "expires_in_days",
          "op": {
            "list": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "expiring_soon",
          "op": {
            "list": {
              "req": true,
              "type": "`$BOOLEAN`"
            }
          },
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 4
        },
        {
          "active": true,
          "name": "tags",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 5
        },
        {
          "active": true,
          "name": "tier",
          "req": true,
          "type": "`$STRING`",
          "index$": 6
        }
      ],
      "name": "domains_all",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/domains/all",
              "parts": [
                "v1",
                "domains",
                "all"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "inbox": {
      "fields": [
        {
          "active": true,
          "name": "count",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "inbox",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "inboxes",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "isTesting",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 3
        },
        {
          "active": true,
          "name": "message",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "success",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 5
        }
      ],
      "name": "inbox",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/v1/inboxes",
              "parts": [
                "v1",
                "inboxes"
              ],
              "select": {},
              "transform": {
                "req": {
                  "inbox": "`reqdata`"
                },
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/inboxes",
              "parts": [
                "v1",
                "inboxes"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "men": {
      "fields": [
        {
          "active": true,
          "name": "api_inbox_count",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "api_inboxes",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "app_inbox_count",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "app_inboxes",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "credits",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "custom_domain_count",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "custom_domains",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 6
        },
        {
          "active": true,
          "name": "features",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 7
        },
        {
          "active": true,
          "name": "plan",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "rate_limits",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 9
        }
      ],
      "name": "men",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/me",
              "parts": [
                "v1",
                "me"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "message": {
      "fields": [
        {
          "active": true,
          "name": "attachments",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "count",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "from",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "has_attachment",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 4
        },
        {
          "active": true,
          "name": "has_more",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 5
        },
        {
          "active": true,
          "name": "html",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "inbox",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "messages",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 9
        },
        {
          "active": true,
          "name": "otp",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "subject",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        },
        {
          "active": true,
          "name": "text",
          "req": false,
          "type": "`$STRING`",
          "index$": 12
        },
        {
          "active": true,
          "name": "to",
          "req": false,
          "type": "`$STRING`",
          "index$": 13
        },
        {
          "active": true,
          "name": "verification_link",
          "req": false,
          "type": "`$STRING`",
          "index$": 14
        }
      ],
      "name": "message",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "inbox_id",
                    "orig": "inbox",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "before",
                    "orig": "before",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 20,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/inboxes/{inbox}/messages",
              "parts": [
                "v1",
                "inboxes",
                "{inbox_id}",
                "messages"
              ],
              "rename": {
                "param": {
                  "inbox": "inbox_id"
                }
              },
              "select": {
                "exist": [
                  "before",
                  "inbox_id",
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "inbox_id",
                    "orig": "inbox",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/inboxes/{inbox}/messages/{id}",
              "parts": [
                "v1",
                "inboxes",
                "{inbox_id}",
                "messages",
                "{id}"
              ],
              "rename": {
                "param": {
                  "inbox": "inbox_id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "inbox_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 1
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "inbox"
          ]
        ]
      }
    },
    "otp": {
      "fields": [
        {
          "active": true,
          "name": "from",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "inbox",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "message",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "message_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "otp",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "received_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "score",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "subject",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "verification_link",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        }
      ],
      "name": "otp",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "inbox_id",
                    "orig": "inbox",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "parse_code",
                    "orig": "parse_code",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "since",
                    "orig": "since",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/inboxes/{inbox}/otp",
              "parts": [
                "v1",
                "inboxes",
                "{inbox_id}",
                "otp"
              ],
              "rename": {
                "param": {
                  "inbox": "inbox_id"
                }
              },
              "select": {
                "exist": [
                  "inbox_id",
                  "parse_code",
                  "since"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": false,
                    "kind": "query",
                    "name": "parse_code",
                    "orig": "parse_code",
                    "reqd": false,
                    "type": "`$BOOLEAN`"
                  },
                  {
                    "active": true,
                    "example": 1716900000000,
                    "kind": "query",
                    "name": "since",
                    "orig": "since",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": "fceotp_24f1add500d18150a02c62e40b395828226a79ab",
                    "kind": "query",
                    "name": "token",
                    "orig": "token",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/otp/public",
              "parts": [
                "v1",
                "otp",
                "public"
              ],
              "select": {
                "$action": "public",
                "exist": [
                  "parse_code",
                  "since",
                  "token"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 1
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "inbox"
          ]
        ]
      }
    },
    "plan": {
      "fields": [
        {
          "active": true,
          "name": "credit_packages",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "plans",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        }
      ],
      "name": "plan",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/plans",
              "parts": [
                "v1",
                "plans"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "public_v1_dashboard_analytics": {
      "fields": [
        {
          "active": true,
          "name": "analyzed_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "duration_hours",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "event_count",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 2
        },
        {
          "active": true,
          "name": "events",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "inbox",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "insights",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 5
        }
      ],
      "name": "public_v1_dashboard_analytics",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "test@ditube.info",
                    "kind": "param",
                    "name": "inbox_id",
                    "orig": "inbox",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "test_id",
                    "orig": "test_id",
                    "reqd": false,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/inboxes/{inbox}/timeline",
              "parts": [
                "v1",
                "inboxes",
                "{inbox_id}",
                "timeline"
              ],
              "rename": {
                "param": {
                  "inbox": "inbox_id"
                }
              },
              "select": {
                "exist": [
                  "inbox_id",
                  "test_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "test@ditube.info",
                    "kind": "param",
                    "name": "inbox_id",
                    "orig": "inbox",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/inboxes/{inbox}/insights",
              "parts": [
                "v1",
                "inboxes",
                "{inbox_id}",
                "insights"
              ],
              "rename": {
                "param": {
                  "inbox": "inbox_id"
                }
              },
              "select": {
                "exist": [
                  "inbox_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 1
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "inbox"
          ]
        ]
      }
    },
    "public_v1_inbox": {
      "fields": [
        {
          "active": true,
          "name": "count",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "custom_firstnames",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "custom_surnames",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "daily_limit",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "daily_remaining",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        },
        {
          "active": true,
          "name": "daily_used",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "domain_mode",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "domains",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 7
        },
        {
          "active": true,
          "name": "inbox",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "inboxes",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 9
        },
        {
          "active": true,
          "name": "output_format",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "parseCode",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 11
        },
        {
          "active": true,
          "name": "since",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 12
        },
        {
          "active": true,
          "name": "started_at",
          "req": false,
          "type": "`$STRING`",
          "index$": 13
        },
        {
          "active": true,
          "name": "success",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 14
        },
        {
          "active": true,
          "name": "test_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 15
        },
        {
          "active": true,
          "name": "username_style",
          "req": false,
          "type": "`$STRING`",
          "index$": 16
        }
      ],
      "name": "public_v1_inbox",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "test@ditube.info",
                    "kind": "param",
                    "name": "inbox_id",
                    "orig": "inbox",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/v1/inboxes/{inbox}/tests",
              "parts": [
                "v1",
                "inboxes",
                "{inbox_id}",
                "tests"
              ],
              "rename": {
                "param": {
                  "inbox": "inbox_id"
                }
              },
              "select": {
                "exist": [
                  "inbox_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/v1/inboxes/generate",
              "parts": [
                "v1",
                "inboxes",
                "generate"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 1
            }
          ],
          "key$": "create"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "inbox",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/v1/inboxes/{inbox}",
              "parts": [
                "v1",
                "inboxes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "inbox": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": [
          [
            "inbox"
          ]
        ]
      }
    },
    "public_v1_message": {
      "fields": [
        {
          "active": true,
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "from",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "has_attachment",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 2
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "otp",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "subject",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "verification_link",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        }
      ],
      "name": "public_v1_message",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "inbox_id",
                    "orig": "inbox",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "kind": "query",
                    "name": "since",
                    "orig": "since",
                    "reqd": false,
                    "type": "`$STRING`"
                  },
                  {
                    "active": true,
                    "example": 30,
                    "kind": "query",
                    "name": "timeout",
                    "orig": "timeout",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/inboxes/{inbox}/wait",
              "parts": [
                "v1",
                "inboxes",
                "{inbox_id}",
                "wait"
              ],
              "rename": {
                "param": {
                  "inbox": "inbox_id"
                }
              },
              "select": {
                "exist": [
                  "inbox_id",
                  "since",
                  "timeout"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "inbox_id",
                    "orig": "inbox",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/v1/inboxes/{inbox}/messages/{id}",
              "parts": [
                "v1",
                "inboxes",
                "{inbox_id}",
                "messages",
                "{id}"
              ],
              "rename": {
                "param": {
                  "inbox": "inbox_id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "inbox_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": [
          [
            "inbox"
          ]
        ]
      }
    },
    "public_v1_webhook": {
      "fields": [
        {
          "active": true,
          "name": "createdAt",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "failureCount",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "inbox",
          "op": {
            "list": {
              "req": false,
              "type": "`$STRING`"
            }
          },
          "req": true,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "url",
          "op": {
            "list": {
              "req": false,
              "type": "`$STRING`"
            }
          },
          "req": true,
          "type": "`$STRING`",
          "index$": 4
        }
      ],
      "name": "public_v1_webhook",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/v1/webhooks",
              "parts": [
                "v1",
                "webhooks"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/webhooks",
              "parts": [
                "v1",
                "webhooks"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/v1/webhooks/{id}",
              "parts": [
                "v1",
                "webhooks",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "usage": {
      "fields": [
        {
          "active": true,
          "name": "credits",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 0
        },
        {
          "active": true,
          "name": "period",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 1
        },
        {
          "active": true,
          "name": "plan",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "rate_limit",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 3
        },
        {
          "active": true,
          "name": "requests",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 4
        }
      ],
      "name": "usage",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/v1/usage",
              "parts": [
                "v1",
                "usage"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "index$": 0
            }
          ],
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

