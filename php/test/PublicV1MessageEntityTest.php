<?php
declare(strict_types=1);

// PublicV1Message entity test

require_once __DIR__ . '/../customtempmail_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PublicV1MessageEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = CustomTempMailSDK::test(null, null);
        $ent = $testsdk->PublicV1Message(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = public_v1_message_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "public_v1_message." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CUSTOMTEMPMAIL_TEST_PUBLIC_V__MESSAGE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $public_v1_message_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.public_v1_message")));
        $public_v1_message_ref01_data = null;
        if (count($public_v1_message_ref01_data_raw) > 0) {
            $public_v1_message_ref01_data = Helpers::to_map($public_v1_message_ref01_data_raw[0][1]);
        }

        // LOAD
        $public_v1_message_ref01_ent = $client->PublicV1Message(null);
        $public_v1_message_ref01_match_dt0 = [];
        $public_v1_message_ref01_data_dt0_loaded = $public_v1_message_ref01_ent->load($public_v1_message_ref01_match_dt0, null);
        $this->assertNotNull($public_v1_message_ref01_data_dt0_loaded);

    }
}

function public_v1_message_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/public_v1_message/PublicV1MessageTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = CustomTempMailSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["public_v1_message01", "public_v1_message02", "public_v1_message03", "inbox01", "inbox02", "inbox03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CUSTOMTEMPMAIL_TEST_PUBLIC_V__MESSAGE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CUSTOMTEMPMAIL_TEST_PUBLIC_V__MESSAGE_ENTID" => $idmap,
        "CUSTOMTEMPMAIL_TEST_LIVE" => "FALSE",
        "CUSTOMTEMPMAIL_TEST_EXPLAIN" => "FALSE",
        "CUSTOMTEMPMAIL_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CUSTOMTEMPMAIL_TEST_PUBLIC_V__MESSAGE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["CUSTOMTEMPMAIL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["CUSTOMTEMPMAIL_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new CustomTempMailSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["CUSTOMTEMPMAIL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["CUSTOMTEMPMAIL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
