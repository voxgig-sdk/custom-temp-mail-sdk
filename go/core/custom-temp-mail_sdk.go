package core

import (
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/custom-temp-mail-sdk/go/utility/struct"
)

type CustomTempMailSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewCustomTempMailSDK(options map[string]any) *CustomTempMailSDK {
	sdk := &CustomTempMailSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *CustomTempMailSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *CustomTempMailSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *CustomTempMailSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *CustomTempMailSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *CustomTempMailSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *CustomTempMailSDK) opAllowed(op string) bool {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return strings.Contains(allowOp, op)
}

func (sdk *CustomTempMailSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("CustomTempMailSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *CustomTempMailSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

func (sdk *CustomTempMailSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("CustomTempMailSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// CustomDomain returns a CustomDomain entity bound to this client.
// Idiomatic usage: client.CustomDomain(nil).List(nil, nil) or
// client.CustomDomain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) CustomDomain(data map[string]any) CustomTempMailEntity {
	return NewCustomDomainEntityFunc(sdk, data)
}


// CustomDomainVerify returns a CustomDomainVerify entity bound to this client.
// Idiomatic usage: client.CustomDomainVerify(nil).List(nil, nil) or
// client.CustomDomainVerify(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) CustomDomainVerify(data map[string]any) CustomTempMailEntity {
	return NewCustomDomainVerifyEntityFunc(sdk, data)
}


// Domain returns a Domain entity bound to this client.
// Idiomatic usage: client.Domain(nil).List(nil, nil) or
// client.Domain(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) Domain(data map[string]any) CustomTempMailEntity {
	return NewDomainEntityFunc(sdk, data)
}


// DomainsAll returns a DomainsAll entity bound to this client.
// Idiomatic usage: client.DomainsAll(nil).List(nil, nil) or
// client.DomainsAll(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) DomainsAll(data map[string]any) CustomTempMailEntity {
	return NewDomainsAllEntityFunc(sdk, data)
}


// Inbox returns a Inbox entity bound to this client.
// Idiomatic usage: client.Inbox(nil).List(nil, nil) or
// client.Inbox(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) Inbox(data map[string]any) CustomTempMailEntity {
	return NewInboxEntityFunc(sdk, data)
}


// Men returns a Men entity bound to this client.
// Idiomatic usage: client.Men(nil).List(nil, nil) or
// client.Men(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) Men(data map[string]any) CustomTempMailEntity {
	return NewMenEntityFunc(sdk, data)
}


// Message returns a Message entity bound to this client.
// Idiomatic usage: client.Message(nil).List(nil, nil) or
// client.Message(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) Message(data map[string]any) CustomTempMailEntity {
	return NewMessageEntityFunc(sdk, data)
}


// Otp returns a Otp entity bound to this client.
// Idiomatic usage: client.Otp(nil).List(nil, nil) or
// client.Otp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) Otp(data map[string]any) CustomTempMailEntity {
	return NewOtpEntityFunc(sdk, data)
}


// Plan returns a Plan entity bound to this client.
// Idiomatic usage: client.Plan(nil).List(nil, nil) or
// client.Plan(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) Plan(data map[string]any) CustomTempMailEntity {
	return NewPlanEntityFunc(sdk, data)
}


// PublicV1DashboardAnalytics returns a PublicV1DashboardAnalytics entity bound to this client.
// Idiomatic usage: client.PublicV1DashboardAnalytics(nil).List(nil, nil) or
// client.PublicV1DashboardAnalytics(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) PublicV1DashboardAnalytics(data map[string]any) CustomTempMailEntity {
	return NewPublicV1DashboardAnalyticsEntityFunc(sdk, data)
}


// PublicV1Inbox returns a PublicV1Inbox entity bound to this client.
// Idiomatic usage: client.PublicV1Inbox(nil).List(nil, nil) or
// client.PublicV1Inbox(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) PublicV1Inbox(data map[string]any) CustomTempMailEntity {
	return NewPublicV1InboxEntityFunc(sdk, data)
}


// PublicV1Message returns a PublicV1Message entity bound to this client.
// Idiomatic usage: client.PublicV1Message(nil).List(nil, nil) or
// client.PublicV1Message(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) PublicV1Message(data map[string]any) CustomTempMailEntity {
	return NewPublicV1MessageEntityFunc(sdk, data)
}


// PublicV1Webhook returns a PublicV1Webhook entity bound to this client.
// Idiomatic usage: client.PublicV1Webhook(nil).List(nil, nil) or
// client.PublicV1Webhook(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) PublicV1Webhook(data map[string]any) CustomTempMailEntity {
	return NewPublicV1WebhookEntityFunc(sdk, data)
}


// Usage returns a Usage entity bound to this client.
// Idiomatic usage: client.Usage(nil).List(nil, nil) or
// client.Usage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *CustomTempMailSDK) Usage(data map[string]any) CustomTempMailEntity {
	return NewUsageEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *CustomTempMailSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewCustomTempMailSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
