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
						"name": "added_at",
						"title": "Added At",
						"type": "`$STRING`",
						"short": "ISO 8601 timestamp when the domain was added.",
						"format": "date-time",
					},
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"req": true,
						"short": "Bare domain name (no leading @).",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mx_record",
						"title": "Mx Record",
						"type": "`$STRING`",
						"req": true,
						"short": "The MX record value to add at your registrar.",
					},
					map[string]any{
						"name": "txt_record",
						"title": "Txt Record",
						"type": "`$STRING`",
						"req": true,
						"short": "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.",
					},
					map[string]any{
						"name": "verified",
						"title": "Verified",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "`true` — MX and TXT records confirmed.",
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
								"parts": []any{
									"v1",
									"custom-domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"v1",
									"custom-domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/custom-domains/{domain}",
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
								"parts": []any{
									"v1",
									"custom-domains",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"domain": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "mail.acme.com",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"name": "added_at",
						"title": "Added At",
						"type": "`$STRING`",
						"short": "ISO 8601 timestamp when the domain was added.",
						"format": "date-time",
					},
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"req": true,
						"short": "Bare domain name (no leading @).",
					},
					map[string]any{
						"name": "mx_record",
						"title": "Mx Record",
						"type": "`$STRING`",
						"req": true,
						"short": "The MX record value to add at your registrar.",
					},
					map[string]any{
						"name": "txt_record",
						"title": "Txt Record",
						"type": "`$STRING`",
						"req": true,
						"short": "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.",
					},
					map[string]any{
						"name": "verified",
						"title": "Verified",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "`true` — MX and TXT records confirmed.",
					},
				},
				"name": "custom_domain_verify",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"v1",
									"custom-domains",
									"{domain}",
									"verify",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "domain",
											"orig": "domain",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "mail.acme.com",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"domain",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.custom_domain",
						},
					},
				},
			},
			"domain": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"req": true,
						"short": "Bare domain name (no leading @).",
					},
					map[string]any{
						"name": "expires_at",
						"title": "Expires At",
						"type": "`$STRING`",
						"short": "ISO 8601 date when the domain registration expires at the registrar.",
						"format": "date",
					},
					map[string]any{
						"name": "expires_in_days",
						"title": "Expires In Days",
						"type": "`$INTEGER`",
						"short": "Days remaining until expiry.",
					},
					map[string]any{
						"name": "expiring_soon",
						"title": "Expiring Soon",
						"type": "`$BOOLEAN`",
						"short": "True when the domain expires within 30 days.",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"req": true,
						"short": "`new` — recently added, shown for ~30 days.",
					},
					map[string]any{
						"name": "tier",
						"title": "Tier",
						"type": "`$STRING`",
						"req": true,
						"short": "`free` — available on all plans.",
					},
				},
				"name": "domain",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"v1",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Domain",
						"type": "`$STRING`",
						"req": true,
						"short": "Bare domain name (no leading @).",
					},
					map[string]any{
						"name": "expired",
						"title": "Expired",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "True when the domain has already passed its expiry date.",
					},
					map[string]any{
						"name": "expires_at",
						"title": "Expires At",
						"type": "`$STRING`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "ISO 8601 date when the domain registration expires at the registrar.",
						"format": "date",
					},
					map[string]any{
						"name": "expires_in_days",
						"title": "Expires In Days",
						"type": "`$INTEGER`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"short": "Days remaining until expiry.",
					},
					map[string]any{
						"name": "expiring_soon",
						"title": "Expiring Soon",
						"type": "`$BOOLEAN`",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$BOOLEAN`",
							},
						},
						"short": "True when the domain expires within 30 days.",
					},
					map[string]any{
						"name": "tags",
						"title": "Tags",
						"type": "`$ARRAY`",
						"req": true,
						"short": "`new` — recently added, shown for ~30 days.",
					},
					map[string]any{
						"name": "tier",
						"title": "Tier",
						"type": "`$STRING`",
						"req": true,
						"short": "`free` — available on all plans.",
					},
				},
				"name": "domains_all",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"v1",
									"domains",
									"all",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "inbox",
						"title": "Inbox",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"format": "email",
					},
					map[string]any{
						"name": "inboxes",
						"title": "Inboxes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "isTesting",
						"title": "Is Testing",
						"type": "`$BOOLEAN`",
						"short": "Flag this inbox for testing purposes to enable zero-latency event timelines in the Auth Flow Debugger.",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
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
								"parts": []any{
									"v1",
									"inboxes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"inbox": "`reqdata`",
									},
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"v1",
									"inboxes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Api Inbox Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "api_inboxes",
						"title": "Api Inboxes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "app_inbox_count",
						"title": "App Inbox Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "app_inboxes",
						"title": "App Inboxes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "credits",
						"title": "Credits",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "custom_domain_count",
						"title": "Custom Domain Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "custom_domains",
						"title": "Custom Domains",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "features",
						"title": "Features",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "plan",
						"title": "Plan",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rate_limits",
						"title": "Rate Limits",
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
								"parts": []any{
									"v1",
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Attachments",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "count",
						"title": "Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "has_attachment",
						"title": "Has Attachment",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_more",
						"title": "Has More",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "html",
						"title": "Html",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inbox",
						"title": "Inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "otp",
						"title": "Otp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subject",
						"title": "Subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verification_link",
						"title": "Verification Link",
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
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/messages",
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
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"messages",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "inbox_id",
											"orig": "inbox",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "before",
											"orig": "before",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before",
										"inbox_id",
										"limit",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/messages/{id}",
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
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"messages",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "inbox_id",
											"orig": "inbox",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"inbox_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.inbox",
						},
					},
				},
			},
			"otp": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inbox",
						"title": "Inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message_id",
						"title": "Message Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "otp",
						"title": "Otp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "received_at",
						"title": "Received At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "score",
						"title": "Score",
						"type": "`$NUMBER`",
						"short": "Confidence score (0.0 to 1.0) of the extracted OTP.",
						"format": "float",
					},
					map[string]any{
						"name": "subject",
						"title": "Subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verification_link",
						"title": "Verification Link",
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
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/otp",
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
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"otp",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "inbox_id",
											"orig": "inbox",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "parse_code",
											"orig": "parse_code",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "since",
											"orig": "since",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
										"parse_code",
										"since",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"v1",
									"otp",
									"public",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "parse_code",
											"orig": "parse_code",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "since",
											"orig": "since",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 1716900000000,
										},
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "fceotp_24f1add500d18150a02c62e40b395828226a79ab",
										},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.inbox",
						},
					},
				},
			},
			"plan": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "credit_packages",
						"title": "Credit Packages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "plans",
						"title": "Plans",
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
								"parts": []any{
									"v1",
									"plans",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"name": "analyzed_at",
						"title": "Analyzed At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "duration_hours",
						"title": "Duration Hours",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "event_count",
						"title": "Event Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "events",
						"title": "Events",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "inbox",
						"title": "Inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "insights",
						"title": "Insights",
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
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/timeline",
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
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"timeline",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "inbox_id",
											"orig": "inbox",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "test@ditube.info",
										},
									},
									"query": []any{
										map[string]any{
											"name": "test_id",
											"orig": "test_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
										"test_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/insights",
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
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"insights",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "inbox_id",
											"orig": "inbox",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "test@ditube.info",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.inbox",
						},
					},
				},
			},
			"public_v1_inbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "count",
						"title": "Count",
						"type": "`$INTEGER`",
						"short": "Number of inboxes to generate (1–500 depending on plan).",
					},
					map[string]any{
						"name": "custom_firstnames",
						"title": "Custom Firstnames",
						"type": "`$ARRAY`",
						"short": "Custom first-name pool for `firstname.surname` style.",
					},
					map[string]any{
						"name": "custom_surnames",
						"title": "Custom Surnames",
						"type": "`$ARRAY`",
						"short": "Custom surname pool for `firstname.surname` style.",
					},
					map[string]any{
						"name": "daily_limit",
						"title": "Daily Limit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "daily_remaining",
						"title": "Daily Remaining",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "daily_used",
						"title": "Daily Used",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "domain_mode",
						"title": "Domain Mode",
						"type": "`$STRING`",
						"short": "Which domain pool to use.",
					},
					map[string]any{
						"name": "domains",
						"title": "Domains",
						"type": "`$ARRAY`",
						"short": "Required when `domain_mode` is `specific`.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inbox",
						"title": "Inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inboxes",
						"title": "Inboxes",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "output_format",
						"title": "Output Format",
						"type": "`$STRING`",
						"short": "Template string for each line of output.",
					},
					map[string]any{
						"name": "parseCode",
						"title": "Parse Code",
						"type": "`$BOOLEAN`",
						"short": "When `true` (default), embeds `?parseCode=true` in every OTP URL.",
					},
					map[string]any{
						"name": "since",
						"title": "Since",
						"type": "`$INTEGER`",
						"short": "Unix timestamp in milliseconds.",
					},
					map[string]any{
						"name": "started_at",
						"title": "Started At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "success",
						"title": "Success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "test_id",
						"title": "Test Id",
						"type": "`$STRING`",
						"short": "Optional custom test ID.",
					},
					map[string]any{
						"name": "username_style",
						"title": "Username Style",
						"type": "`$STRING`",
						"short": "Username generation style.",
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
								"kind": "http",
								"method": "POST",
								"orig": "/v1/inboxes/{inbox}/tests",
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
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"tests",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "inbox_id",
											"orig": "inbox",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "test@ditube.info",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"v1",
									"inboxes",
									"generate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/inboxes/{inbox}",
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
								"parts": []any{
									"v1",
									"inboxes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "inbox",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.inbox",
						},
					},
				},
			},
			"public_v1_message": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "has_attachment",
						"title": "Has Attachment",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "otp",
						"title": "Otp",
						"type": "`$STRING`",
						"short": "The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value).",
					},
					map[string]any{
						"name": "subject",
						"title": "Subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verification_link",
						"title": "Verification Link",
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
								"kind": "http",
								"method": "GET",
								"orig": "/v1/inboxes/{inbox}/wait",
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
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"wait",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "inbox_id",
											"orig": "inbox",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "since",
											"orig": "since",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "timeout",
											"orig": "timeout",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 30,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
										"since",
										"timeout",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/v1/inboxes/{inbox}/messages/{id}",
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
								"parts": []any{
									"v1",
									"inboxes",
									"{inbox_id}",
									"messages",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"inbox": "inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "inbox_id",
											"orig": "inbox",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"inbox_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.inbox",
						},
					},
				},
			},
			"public_v1_webhook": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "failureCount",
						"title": "Failure Count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inbox",
						"title": "Inbox",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The registered inbox to subscribe to.",
						"format": "email",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "The HTTPS URL to receive the POST request.",
						"format": "uri",
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
								"parts": []any{
									"v1",
									"webhooks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"v1",
									"webhooks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"v1",
									"webhooks",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Credits",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "period",
						"title": "Period",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "plan",
						"title": "Plan",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rate_limit",
						"title": "Rate Limit",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "requests",
						"title": "Requests",
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
								"parts": []any{
									"v1",
									"usage",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
