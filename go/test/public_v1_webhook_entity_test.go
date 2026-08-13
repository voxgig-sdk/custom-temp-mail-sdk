package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/custom-temp-mail-sdk/go"
	"github.com/voxgig-sdk/custom-temp-mail-sdk/go/core"

	vs "github.com/voxgig-sdk/custom-temp-mail-sdk/go/utility/struct"
)

func TestPublicV1WebhookEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PublicV1Webhook(nil)
		if ent == nil {
			t.Fatal("expected non-nil PublicV1WebhookEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"public_v1_webhook": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.PublicV1Webhook(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.MakeConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.PublicV1Webhook(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := public_v1_webhookBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "public_v1_webhook." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		publicV1WebhookRef01Ent := client.PublicV1Webhook(nil)
		publicV1WebhookRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "public_v1_webhook"}, setup.data), "public_v1_webhook_ref01"))

		publicV1WebhookRef01DataResult, err := publicV1WebhookRef01Ent.Create(publicV1WebhookRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		publicV1WebhookRef01Data = core.ToMapAny(entityData(publicV1WebhookRef01DataResult))
		if publicV1WebhookRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if publicV1WebhookRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		publicV1WebhookRef01Match := map[string]any{}

		publicV1WebhookRef01ListResult, err := publicV1WebhookRef01Ent.List(publicV1WebhookRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		publicV1WebhookRef01List, publicV1WebhookRef01ListOk := publicV1WebhookRef01ListResult.([]any)
		if !publicV1WebhookRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", publicV1WebhookRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(publicV1WebhookRef01List), map[string]any{"id": publicV1WebhookRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// REMOVE
		publicV1WebhookRef01MatchRm0 := map[string]any{
			"id": publicV1WebhookRef01Data["id"],
		}
		_, err = publicV1WebhookRef01Ent.Remove(publicV1WebhookRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		publicV1WebhookRef01MatchRt0 := map[string]any{}

		publicV1WebhookRef01ListRt0Result, err := publicV1WebhookRef01Ent.List(publicV1WebhookRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		publicV1WebhookRef01ListRt0, publicV1WebhookRef01ListRt0Ok := publicV1WebhookRef01ListRt0Result.([]any)
		if !publicV1WebhookRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", publicV1WebhookRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(publicV1WebhookRef01ListRt0), map[string]any{"id": publicV1WebhookRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func public_v1_webhookBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "public_v1_webhook", "PublicV1WebhookTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read public_v1_webhook test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse public_v1_webhook test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"public_v1_webhook01", "public_v1_webhook02", "public_v1_webhook03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID": idmap,
		"CUSTOM_TEMP_MAIL_TEST_LIVE":      "FALSE",
		"CUSTOM_TEMP_MAIL_TEST_EXPLAIN":   "FALSE",
		"CUSTOM_TEMP_MAIL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CUSTOM_TEMP_MAIL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["CUSTOM_TEMP_MAIL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewCustomTempMailSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CUSTOM_TEMP_MAIL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CUSTOM_TEMP_MAIL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
