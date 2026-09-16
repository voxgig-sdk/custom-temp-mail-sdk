package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "CustomTempMail",
			"slug": "custom-temp-mail",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api2.freecustom.email",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"custom_domain": map[string]any{},
				"custom_domain_verify": map[string]any{},
				"domain": map[string]any{},
				"domains_all": map[string]any{},
				"inbox": map[string]any{},
				"men": map[string]any{},
				"message": map[string]any{},
				"otp": map[string]any{},
				"plan": map[string]any{},
				"public_v1_dashboard_analytics": map[string]any{},
				"public_v1_inbox": map[string]any{},
				"public_v1_message": map[string]any{},
				"public_v1_webhook": map[string]any{},
				"usage": map[string]any{},
			},
		},
		"entity": map[string]any{
			"custom_domain": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "added_at",
						"short": "ISO 8601 timestamp when the domain was added.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"req": true,
						"short": "Bare domain name (no leading @).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mx_record",
						"req": true,
						"short": "The MX record value to add at your registrar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "txt_record",
						"req": true,
						"short": "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verified",
						"req": true,
						"short": "`true` — MX and TXT records confirmed.",
						"type": "`$BOOLEAN`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "custom_domain",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/custom-domains",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "custom-domains",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"custom-domains",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/custom-domains",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "custom-domains",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"custom-domains",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "mail.acme.com",
											"kind": "param",
											"name": "id",
											"orig": "domain",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/custom-domains/{domain}",
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "custom-domains",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"custom-domains",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"custom_domain_verify": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "added_at",
						"short": "ISO 8601 timestamp when the domain was added.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"req": true,
						"short": "Bare domain name (no leading @).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mx_record",
						"req": true,
						"short": "The MX record value to add at your registrar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "txt_record",
						"req": true,
						"short": "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verified",
						"req": true,
						"short": "`true` — MX and TXT records confirmed.",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "custom_domain_verify",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "mail.acme.com",
											"kind": "param",
											"name": "domain",
											"orig": "domain",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/custom-domains/{domain}/verify",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "custom-domains",
									},
									map[string]any{
										"var": "domain",
									},
									map[string]any{
										"lit": "verify",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"custom-domains",
									"{domain}",
									"verify",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"custom_domain",
						},
					},
				},
			},
			"domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"req": true,
						"short": "Bare domain name (no leading @).",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
						"name": "expires_at",
						"short": "ISO 8601 date when the domain registration expires at the registrar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_in_days",
						"short": "Days remaining until expiry.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "expiring_soon",
						"short": "True when the domain expires within 30 days.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "tags",
						"req": true,
						"short": "`new` — recently added, shown for ~30 days.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tier",
						"req": true,
						"short": "`free` — available on all plans.",
						"type": "`$STRING`",
					},
				},
				"name": "domain",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/domains",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"domains",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domains_all": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"req": true,
						"short": "Bare domain name (no leading @).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expired",
						"req": true,
						"short": "True when the domain has already passed its expiry date.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"format": "date",
						"name": "expires_at",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "ISO 8601 date when the domain registration expires at the registrar.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_in_days",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"short": "Days remaining until expiry.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "expiring_soon",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$BOOLEAN`",
							},
						},
						"short": "True when the domain expires within 30 days.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "tags",
						"req": true,
						"short": "`new` — recently added, shown for ~30 days.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tier",
						"req": true,
						"short": "`free` — available on all plans.",
						"type": "`$STRING`",
					},
				},
				"name": "domains_all",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/domains/all",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "domains",
									},
									map[string]any{
										"lit": "all",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"domains",
									"all",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"inbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "email",
						"name": "inbox",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inboxes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "isTesting",
						"short": "Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "inbox",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/inboxes",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"inbox": "`reqdata`",
									},
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"inboxes",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"inboxes",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"men": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "api_inbox_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "api_inboxes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "app_inbox_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "app_inboxes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "credits",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "custom_domain_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "custom_domains",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "features",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "plan",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rate_limits",
						"type": "`$OBJECT`",
					},
				},
				"name": "men",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/me",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "me",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"me",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"message": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attachments",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "from",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "has_attachment",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_more",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "html",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "otp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "to",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verification_link",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "message",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "inbox_id",
											"orig": "inbox",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "before",
											"orig": "before",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/messages",
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
									map[string]any{
										"var": "inbox_id",
									},
									map[string]any{
										"lit": "messages",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before",
										"inbox_id",
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"messages",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "inbox_id",
											"orig": "inbox",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/messages/{id}",
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
									map[string]any{
										"var": "inbox_id",
									},
									map[string]any{
										"lit": "messages",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"messages",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"inbox",
						},
					},
				},
			},
			"otp": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "from",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "otp",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "received_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "float",
						"name": "score",
						"short": "Confidence score (0.0 to 1.0) of the extracted OTP.",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verification_link",
						"type": "`$STRING`",
					},
				},
				"name": "otp",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "inbox_id",
											"orig": "inbox",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "parse_code",
											"orig": "parse_code",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "since",
											"orig": "since",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/otp",
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
									map[string]any{
										"var": "inbox_id",
									},
									map[string]any{
										"lit": "otp",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
										"parse_code",
										"since",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"otp",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "parse_code",
											"orig": "parse_code",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 1716900000000,
											"kind": "query",
											"name": "since",
											"orig": "since",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "fceotp_24f1add500d18150a02c62e40b395828226a79ab",
											"kind": "query",
											"name": "token",
											"orig": "token",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/otp/public",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "otp",
									},
									map[string]any{
										"lit": "public",
									},
								},
								"select": map[string]any{
									"$action": "public",
									"exist": []any{
										"parse_code",
										"since",
										"token",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"otp",
									"public",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"inbox",
						},
					},
				},
			},
			"plan": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "credit_packages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "plans",
						"type": "`$ARRAY`",
					},
				},
				"name": "plan",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/plans",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "plans",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"plans",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"public_v1_dashboard_analytics": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "analyzed_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration_hours",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "event_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "events",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "insights",
						"type": "`$ARRAY`",
					},
				},
				"name": "public_v1_dashboard_analytics",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "test@ditube.info",
											"kind": "param",
											"name": "inbox_id",
											"orig": "inbox",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "test_id",
											"orig": "test_id",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/timeline",
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
									map[string]any{
										"var": "inbox_id",
									},
									map[string]any{
										"lit": "timeline",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
										"test_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"timeline",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "test@ditube.info",
											"kind": "param",
											"name": "inbox_id",
											"orig": "inbox",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/insights",
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
									map[string]any{
										"var": "inbox_id",
									},
									map[string]any{
										"lit": "insights",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"insights",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"inbox",
						},
					},
				},
			},
			"public_v1_inbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"short": "Number of inboxes to generate (1–500 depending on plan).",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "custom_firstnames",
						"short": "Custom first-name pool for `firstname.surname` style.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "custom_surnames",
						"short": "Custom surname pool for `firstname.surname` style.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "daily_limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "daily_remaining",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "daily_used",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "domain_mode",
						"short": "Which domain pool to use.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domains",
						"short": "Required when `domain_mode` is `specific`.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inboxes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "output_format",
						"short": "Template string for each line of output.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parseCode",
						"short": "When `true` (default), embeds `?parseCode=true` in every OTP URL.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "since",
						"short": "Unix timestamp in milliseconds.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "date-time",
						"name": "started_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "test_id",
						"short": "Optional custom test ID.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username_style",
						"short": "Username generation style.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "public_v1_inbox",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "test@ditube.info",
											"kind": "param",
											"name": "inbox_id",
											"orig": "inbox",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/inboxes/{inbox}/tests",
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
									map[string]any{
										"var": "inbox_id",
									},
									map[string]any{
										"lit": "tests",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"tests",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/inboxes/generate",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
									map[string]any{
										"lit": "generate",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"inboxes",
									"generate",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "inbox",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/inboxes/{inbox}",
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"inboxes",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"inbox",
						},
					},
				},
			},
			"public_v1_message": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "from",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "has_attachment",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "otp",
						"short": "The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value).",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verification_link",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "public_v1_message",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "inbox_id",
											"orig": "inbox",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "since",
											"orig": "since",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 30,
											"kind": "query",
											"name": "timeout",
											"orig": "timeout",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/wait",
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
									map[string]any{
										"var": "inbox_id",
									},
									map[string]any{
										"lit": "wait",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
										"since",
										"timeout",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"wait",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "inbox_id",
											"orig": "inbox",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/inboxes/{inbox}/messages/{id}",
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "inboxes",
									},
									map[string]any{
										"var": "inbox_id",
									},
									map[string]any{
										"lit": "messages",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"messages",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"inbox",
						},
					},
				},
			},
			"public_v1_webhook": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "createdAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "failureCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
						"name": "inbox",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "The registered inbox to subscribe to.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "The HTTPS URL to receive the POST request.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "public_v1_webhook",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/webhooks",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "webhooks",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"webhooks",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/webhooks",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "webhooks",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"webhooks",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/webhooks/{id}",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"v1",
									"webhooks",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"usage": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "credits",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "period",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "plan",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rate_limit",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "requests",
						"type": "`$OBJECT`",
					},
				},
				"name": "usage",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/v1/usage",
								"segments": []any{
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "usage",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"v1",
									"usage",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
