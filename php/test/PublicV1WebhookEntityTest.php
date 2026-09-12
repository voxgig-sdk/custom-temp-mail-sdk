<?php
declare(strict_types=1);

// PublicV1Webhook entity test

require_once __DIR__ . '/../customtempmail_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PublicV1WebhookEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CustomTempMailSDK::test(null, null);
        $ent = $testsdk->PublicV1Webhook(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "public_v1_webhook" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = CustomTempMailSDK::test($seed, null);
        $seen = iterator_to_array($base->PublicV1Webhook(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = CustomTempMailConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = CustomTempMailSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->PublicV1Webhook(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = public_v1_webhook_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "public_v1_webhook." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $public_v1_webhook_ref01_ent = $client->PublicV1Webhook(null);
        $public_v1_webhook_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.public_v1_webhook"), "public_v1_webhook_ref01"));

        $public_v1_webhook_ref01_data_result = $public_v1_webhook_ref01_ent->create($public_v1_webhook_ref01_data, null);
        $public_v1_webhook_ref01_data = Helpers::to_map(is_object($public_v1_webhook_ref01_data_result) && method_exists($public_v1_webhook_ref01_data_result, 'data_get') ? $public_v1_webhook_ref01_data_result->data_get() : $public_v1_webhook_ref01_data_result);
        $this->assertNotNull($public_v1_webhook_ref01_data);
        $this->assertNotNull($public_v1_webhook_ref01_data["id"]);

        // LIST
        $public_v1_webhook_ref01_match = [];

        $public_v1_webhook_ref01_list_result = $public_v1_webhook_ref01_ent->list($public_v1_webhook_ref01_match, null);
        $this->assertIsArray($public_v1_webhook_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($public_v1_webhook_ref01_list_result),
            ["id" => $public_v1_webhook_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // REMOVE
        $public_v1_webhook_ref01_match_rm0 = [
            "id" => $public_v1_webhook_ref01_data["id"],
        ];
        $public_v1_webhook_ref01_ent->remove($public_v1_webhook_ref01_match_rm0, null);

        // LIST
        $public_v1_webhook_ref01_match_rt0 = [];

        $public_v1_webhook_ref01_list_rt0_result = $public_v1_webhook_ref01_ent->list($public_v1_webhook_ref01_match_rt0, null);
        $this->assertIsArray($public_v1_webhook_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($public_v1_webhook_ref01_list_rt0_result),
            ["id" => $public_v1_webhook_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function public_v1_webhook_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/public_v1_webhook/PublicV1WebhookTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CustomTempMailSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["public_v1_webhook01", "public_v1_webhook02", "public_v1_webhook03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID" => $idmap,
        "CUSTOM_TEMP_MAIL_TEST_LIVE" => "FALSE",
        "CUSTOM_TEMP_MAIL_TEST_EXPLAIN" => "FALSE",
        "CUSTOM_TEMP_MAIL_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_WEBHOOK_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["CUSTOM_TEMP_MAIL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["CUSTOM_TEMP_MAIL_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new CustomTempMailSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["CUSTOM_TEMP_MAIL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["CUSTOM_TEMP_MAIL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
