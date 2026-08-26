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

func TestCustomDomainEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CustomDomain(nil)
		if ent == nil {
			t.Fatal("expected non-nil CustomDomainEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"custom_domain": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.CustomDomain(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.CustomDomain(nil).Stream("list", nil, nil) {
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
		setup := custom_domainBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "custom_domain." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		customDomainRef01Ent := client.CustomDomain(nil)
		customDomainRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "custom_domain"}, setup.data), "custom_domain_ref01"))

		customDomainRef01DataResult, err := customDomainRef01Ent.Create(customDomainRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		customDomainRef01Data = core.ToMapAny(entityData(customDomainRef01DataResult))
		if customDomainRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if customDomainRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		customDomainRef01Match := map[string]any{}

		customDomainRef01ListResult, err := customDomainRef01Ent.List(customDomainRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		customDomainRef01List, customDomainRef01ListOk := customDomainRef01ListResult.([]any)
		if !customDomainRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", customDomainRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(customDomainRef01List), map[string]any{"id": customDomainRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// REMOVE
		customDomainRef01MatchRm0 := map[string]any{
			"id": customDomainRef01Data["id"],
		}
		_, err = customDomainRef01Ent.Remove(customDomainRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		customDomainRef01MatchRt0 := map[string]any{}

		customDomainRef01ListRt0Result, err := customDomainRef01Ent.List(customDomainRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		customDomainRef01ListRt0, customDomainRef01ListRt0Ok := customDomainRef01ListRt0Result.([]any)
		if !customDomainRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", customDomainRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(customDomainRef01ListRt0), map[string]any{"id": customDomainRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func custom_domainBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "custom_domain", "CustomDomainTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read custom_domain test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse custom_domain test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"custom_domain01", "custom_domain02", "custom_domain03"},
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
	entidEnvRaw := os.Getenv("CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_ENTID": idmap,
		"CUSTOM_TEMP_MAIL_TEST_LIVE":      "FALSE",
		"CUSTOM_TEMP_MAIL_TEST_EXPLAIN":   "FALSE",
		"CUSTOM_TEMP_MAIL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_ENTID"])
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
