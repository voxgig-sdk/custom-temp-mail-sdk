"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PublicV1DashboardAnalyticsEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CUSTOM_TEMP_MAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CustomTempMailSDK.test();
        const ent = testsdk.PublicV1DashboardAnalytics();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'public_v1_dashboard_analytics.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "analyzed_at": { "a": true, "fo": "date-time", "h": "Analyzed At", "n": "analyzed_at", "r": false, "t": "`$STRING`", "key$": "analyzed_at", "index$": 0 }, "duration_hours": { "a": true, "h": "Duration Hours", "n": "duration_hours", "r": false, "t": "`$INTEGER`", "key$": "duration_hours", "index$": 1 }, "event_count": { "a": true, "h": "Event Count", "n": "event_count", "r": false, "t": "`$INTEGER`", "key$": "event_count", "index$": 2 }, "events": { "a": true, "h": "Events", "n": "events", "r": false, "t": "`$ARRAY`", "key$": "events", "index$": 3 }, "inbox": { "a": true, "h": "Inbox", "n": "inbox", "r": false, "t": "`$STRING`", "key$": "inbox", "index$": 4 }, "insights": { "a": true, "h": "Insights", "n": "insights", "r": false, "t": "`$ARRAY`", "key$": "insights", "index$": 5 } }, "name": "public_v1_dashboard_analytics", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/inboxes/{inbox}/timeline", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "test@ditube.info", "k": "param", "n": "inbox_id", "or": "inbox", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "test_id", "or": "test_id", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/inboxes/{inbox}/timeline", "q": { "exist": ["inbox_id", "test_id"] }, "r": { "param": { "inbox": "inbox_id" } }, "s": [{ "lit": "v1" }, { "lit": "inboxes" }, { "var": "inbox_id" }, { "lit": "timeline" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/inboxes/{inbox}/insights", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "test@ditube.info", "k": "param", "n": "inbox_id", "or": "inbox", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/inboxes/{inbox}/insights", "q": { "exist": ["inbox_id"] }, "r": { "param": { "inbox": "inbox_id" } }, "s": [{ "lit": "v1" }, { "lit": "inboxes" }, { "var": "inbox_id" }, { "lit": "insights" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.inbox"]] }, "key$": "public_v1_dashboard_analytics", "name__orig": "public_v1_dashboard_analytics", "Name": "PublicV1DashboardAnalytics", "name_": "public_v1_dashboard_analytics", "name-": "public-v1-dashboard-analytics", "NAME": "PUBLIC_V1_DASHBOARD_ANALYTICS", "index$": 9 }, { "active": true, "entity": "public_v1_dashboard_analytics", "key$": "BasicPublicV1DashboardAnalyticsFlow", "kind": "basic", "name": "BasicPublicV1DashboardAnalyticsFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "public_v1_dashboard_analytics_ref01", "srcdatavar": "public_v1_dashboard_analytics_ref01_data", "suffix": "_dt0" }, "m": { "id": "public_v1_dashboard_analytics01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-public_v1_dashboard_analytics_ref01" } }], "index$": 0 }] }, 'PublicV1DashboardAnalytics', { "GET /v1/inboxes/{inbox}/timeline": { "protocol": "http", "operationId": "getTimeline", "responses": { "200": { "description": "Success", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "example": true, "key$": "success", "type": "boolean" }, "data": { "key$": "data", "properties": { "duration_hours": { "type": "integer", "key$": "duration_hours" }, "event_count": { "type": "integer", "key$": "event_count" }, "events": { "items": { "properties": { "id": { "type": "string" }, "inbox": { "type": "string" }, "latency_ms": { "type": "integer" }, "metadata": { "properties": { "error": { "type": "string" }, "from": { "type": "string" }, "message_id": { "type": "string" }, "otp": { "type": "string" }, "raw_snippet": { "type": "string" }, "score": { "type": "number" }, "subject": { "type": "string" }, "verification_link": { "type": "string" } }, "type": "object" }, "test_run_id": { "type": "string" }, "timestamp": { "type": "integer" }, "type": { "enum": ["inbox_created", "test_started", "smtp_rcpt_received", "email_received", "email_parsed", "otp_extracted", "webhook_sent", "websocket_sent", "error"], "type": "string" } }, "type": "object" }, "type": "array", "key$": "events" }, "inbox": { "type": "string", "key$": "inbox" } }, "type": "object", "index$": 0 } } } } } }, "400": { "description": "Missing inbox parameter", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["missing_field", "invalid_inbox"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error400Inbox" } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "403": { "description": "Plan too low — Growth or Enterprise required", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["plan_required", "plan_restriction", "domain_not_verified", "domain_not_found"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true } }, "x-ref": "#/components/schemas/Error403Plan" } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "inbox", "in": "path", "required": true, "description": "The inbox to get timeline for (e.g. `test@ditube.info`).", "schema": { "type": "string" }, "example": "test@ditube.info", "index$": 0 }, { "name": "test_id", "in": "query", "required": false, "description": "Optional test ID to filter the timeline events by a specific test run.", "schema": { "type": "string" }, "index$": 1 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } }, "GET /v1/inboxes/{inbox}/insights": { "protocol": "http", "operationId": "getInsights", "responses": { "200": { "description": "Success", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "example": true, "key$": "success", "type": "boolean" }, "data": { "key$": "data", "properties": { "analyzed_at": { "format": "date-time", "type": "string", "key$": "analyzed_at" }, "inbox": { "type": "string", "key$": "inbox" }, "insights": { "items": { "properties": { "message": { "example": "Email took >3s", "type": "string" }, "type": { "example": "slow_delivery", "type": "string" } }, "type": "object" }, "type": "array", "key$": "insights" } }, "type": "object", "index$": 0 } } } } } }, "400": { "description": "Missing inbox parameter", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["missing_field", "invalid_inbox"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error400Inbox" } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "403": { "description": "Plan too low — Growth or Enterprise required", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["plan_required", "plan_restriction", "domain_not_verified", "domain_not_found"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true } }, "x-ref": "#/components/schemas/Error403Plan" } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "inbox", "in": "path", "required": true, "description": "The inbox to get insights for (e.g. `test@ditube.info`).", "schema": { "type": "string" }, "example": "test@ditube.info", "index$": 0 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let public_v1_dashboard_analytics_ref01_data = Object.values(setup.data.existing.public_v1_dashboard_analytics)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const public_v1_dashboard_analytics_ref01_ent = client.PublicV1DashboardAnalytics();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/public_v1_dashboard_analytics/PublicV1DashboardAnalyticsTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CustomTempMailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['public_v1_dashboard_analytics01', 'public_v1_dashboard_analytics02', 'public_v1_dashboard_analytics03', 'inbox01', 'inbox02', 'inbox03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_DASHBOARD_ANALYTICS_ENTID': idmap,
        'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
        'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
        'CUSTOM_TEMP_MAIL_APIKEY': '',
    });
    idmap = env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_DASHBOARD_ANALYTICS_ENTID'];
    const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_DASHBOARD_ANALYTICS_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.CustomTempMailSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.CUSTOM_TEMP_MAIL_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PublicV1DashboardAnalyticsEntity.test.js.map