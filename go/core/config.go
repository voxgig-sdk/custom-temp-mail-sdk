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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mx_record",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "txt_record",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verified",
						"req": true,
						"type": "`$BOOLEAN`",
					},
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
								"parts": []any{
									"v1",
									"custom-domains",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"parts": []any{
									"v1",
									"custom-domains",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mx_record",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "txt_record",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verified",
						"req": true,
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
								"parts": []any{
									"v1",
									"custom-domains",
									"{domain}",
									"verify",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_in_days",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "expiring_soon",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "tags",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tier",
						"req": true,
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
								"parts": []any{
									"v1",
									"domains",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expired",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "expires_at",
						"op": map[string]any{
							"list": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
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
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "tags",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "tier",
						"req": true,
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
								"parts": []any{
									"v1",
									"domains",
									"all",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"parts": []any{
									"v1",
									"inboxes",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"inbox": "`reqdata`",
									},
									"res": "`body`",
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
								"parts": []any{
									"v1",
									"inboxes",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"parts": []any{
									"v1",
									"me",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
						"name": "received_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "score",
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
								"parts": []any{
									"v1",
									"otp",
									"public",
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
								"parts": []any{
									"v1",
									"plans",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "custom_firstnames",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "custom_surnames",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domains",
						"type": "`$ARRAY`",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "parseCode",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "since",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "started_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "success",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "test_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username_style",
						"type": "`$STRING`",
					},
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
								"select": map[string]any{
									"exist": []any{
										"inbox_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/v1/inboxes/generate",
								"parts": []any{
									"v1",
									"inboxes",
									"generate",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"name": "inbox",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"v1",
									"webhooks",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"v1",
									"webhooks",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
								"parts": []any{
									"v1",
									"webhooks",
									"{id}",
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
								"parts": []any{
									"v1",
									"usage",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
