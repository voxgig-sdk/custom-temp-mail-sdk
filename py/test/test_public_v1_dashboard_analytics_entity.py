# PublicV1DashboardAnalytics entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from customtempmail_sdk import CustomTempMailSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPublicV1DashboardAnalyticsEntity:

    def test_should_create_instance(self):
        testsdk = CustomTempMailSDK.test(None, None)
        ent = testsdk.PublicV1DashboardAnalytics(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _public_v1_dashboard_analytics_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "public_v1_dashboard_analytics." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set CUSTOMTEMPMAIL_TEST_PUBLIC_V__DASHBOARD_ANALYTICS_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        public_v1_dashboard_analytics_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.public_v1_dashboard_analytics")))
        public_v1_dashboard_analytics_ref01_data = None
        if len(public_v1_dashboard_analytics_ref01_data_raw) > 0:
            public_v1_dashboard_analytics_ref01_data = helpers.to_map(public_v1_dashboard_analytics_ref01_data_raw[0][1])

        # LOAD
        public_v1_dashboard_analytics_ref01_ent = client.PublicV1DashboardAnalytics(None)
        public_v1_dashboard_analytics_ref01_match_dt0 = {}
        public_v1_dashboard_analytics_ref01_data_dt0_loaded = public_v1_dashboard_analytics_ref01_ent.load(public_v1_dashboard_analytics_ref01_match_dt0, None)
        assert public_v1_dashboard_analytics_ref01_data_dt0_loaded is not None



def _public_v1_dashboard_analytics_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/public_v1_dashboard_analytics/PublicV1DashboardAnalyticsTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = CustomTempMailSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["public_v1_dashboard_analytics01", "public_v1_dashboard_analytics02", "public_v1_dashboard_analytics03", "inbox01", "inbox02", "inbox03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "CUSTOMTEMPMAIL_TEST_PUBLIC_V__DASHBOARD_ANALYTICS_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "CUSTOMTEMPMAIL_TEST_PUBLIC_V__DASHBOARD_ANALYTICS_ENTID": idmap,
        "CUSTOMTEMPMAIL_TEST_LIVE": "FALSE",
        "CUSTOMTEMPMAIL_TEST_EXPLAIN": "FALSE",
        "CUSTOMTEMPMAIL_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("CUSTOMTEMPMAIL_TEST_PUBLIC_V__DASHBOARD_ANALYTICS_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("CUSTOMTEMPMAIL_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("CUSTOMTEMPMAIL_APIKEY"),
            },
            extra or {},
        ])
        client = CustomTempMailSDK(helpers.to_map(merged_opts))

    _live = env.get("CUSTOMTEMPMAIL_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("CUSTOMTEMPMAIL_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
