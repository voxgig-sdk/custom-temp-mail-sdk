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

func TestCustomDomainVerifyEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CustomDomainVerify(nil)
		if ent == nil {
			t.Fatal("expected non-nil CustomDomainVerifyEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := custom_domain_verifyBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "custom_domain_verify." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		customDomainVerifyRef01Ent := client.CustomDomainVerify(nil)
		customDomainVerifyRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "custom_domain_verify"}), "custom_domain_verify_ref01"))
		customDomainVerifyRef01Data["domain"] = setup.idmap["domain01"]

		customDomainVerifyRef01DataResult, err := customDomainVerifyRef01Ent.Create(customDomainVerifyRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		customDomainVerifyRef01Data = core.ToMapAny(entityData(customDomainVerifyRef01DataResult))
		if customDomainVerifyRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func custom_domain_verifyBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "custom_domain_verify", "CustomDomainVerifyTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read custom_domain_verify test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse custom_domain_verify test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"custom_domain_verify01", "custom_domain_verify02", "custom_domain_verify03", "custom_domain01", "custom_domain02", "custom_domain03", "domain01"},
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
	entidEnvRaw := os.Getenv("CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID": idmap,
		"CUSTOM_TEMP_MAIL_TEST_LIVE":      "FALSE",
		"CUSTOM_TEMP_MAIL_TEST_EXPLAIN":   "FALSE",
		"CUSTOM_TEMP_MAIL_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_VERIFY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CUSTOM_TEMP_MAIL_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["CUSTOM_TEMP_MAIL_APIKEY"],
			},
			extraOpts,
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
