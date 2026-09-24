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
(0, node_test_1.describe)('PublicV1InboxEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CUSTOM_TEMP_MAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CustomTempMailSDK.test();
        const ent = testsdk.PublicV1Inbox();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE;
        for (const op of ['create', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'public_v1_inbox.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "count": { "a": true, "h": "Count", "n": "count", "r": false, "sh": "Number of inboxes to generate (1–500 depending on plan).", "t": "`$INTEGER`", "key$": "count", "index$": 0 }, "custom_firstnames": { "a": true, "h": "Custom Firstnames", "n": "custom_firstnames", "r": false, "sh": "Custom first-name pool for `firstname.surname` style.", "t": "`$ARRAY`", "key$": "custom_firstnames", "index$": 1 }, "custom_surnames": { "a": true, "h": "Custom Surnames", "n": "custom_surnames", "r": false, "sh": "Custom surname pool for `firstname.surname` style.", "t": "`$ARRAY`", "key$": "custom_surnames", "index$": 2 }, "daily_limit": { "a": true, "h": "Daily Limit", "n": "daily_limit", "r": false, "t": "`$INTEGER`", "key$": "daily_limit", "index$": 3 }, "daily_remaining": { "a": true, "h": "Daily Remaining", "n": "daily_remaining", "r": false, "t": "`$INTEGER`", "key$": "daily_remaining", "index$": 4 }, "daily_used": { "a": true, "h": "Daily Used", "n": "daily_used", "r": false, "t": "`$INTEGER`", "key$": "daily_used", "index$": 5 }, "domain_mode": { "a": true, "h": "Domain Mode", "n": "domain_mode", "r": false, "sh": "Which domain pool to use.", "t": "`$STRING`", "key$": "domain_mode", "index$": 6 }, "domains": { "a": true, "h": "Domains", "n": "domains", "r": false, "sh": "Required when `domain_mode` is `specific`.", "t": "`$ARRAY`", "key$": "domains", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 8 }, "inbox": { "a": true, "h": "Inbox", "n": "inbox", "r": false, "t": "`$STRING`", "key$": "inbox", "index$": 9 }, "inboxes": { "a": true, "h": "Inboxes", "n": "inboxes", "r": false, "t": "`$ARRAY`", "key$": "inboxes", "index$": 10 }, "output_format": { "a": true, "h": "Output Format", "n": "output_format", "r": false, "sh": "Template string for each line of output.", "t": "`$STRING`", "key$": "output_format", "index$": 11 }, "parseCode": { "a": true, "h": "Parse Code", "n": "parseCode", "r": false, "sh": "When `true` (default), embeds `?parseCode=true` in every OTP URL.", "t": "`$BOOLEAN`", "key$": "parseCode", "index$": 12 }, "since": { "a": true, "h": "Since", "n": "since", "r": false, "sh": "Unix timestamp in milliseconds.", "t": "`$INTEGER`", "key$": "since", "index$": 13 }, "started_at": { "a": true, "fo": "date-time", "h": "Started At", "n": "started_at", "r": false, "t": "`$STRING`", "key$": "started_at", "index$": 14 }, "success": { "a": true, "h": "Success", "n": "success", "r": false, "t": "`$BOOLEAN`", "key$": "success", "index$": 15 }, "test_id": { "a": true, "h": "Test Id", "n": "test_id", "r": false, "sh": "Optional custom test ID.", "t": "`$STRING`", "key$": "test_id", "index$": 16 }, "username_style": { "a": true, "h": "Username Style", "n": "username_style", "r": false, "sh": "Username generation style.", "t": "`$STRING`", "key$": "username_style", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "public_v1_inbox", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/inboxes/{inbox}/tests", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "test@ditube.info", "k": "param", "n": "inbox_id", "or": "inbox", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v1/inboxes/{inbox}/tests", "q": { "exist": ["inbox_id"] }, "r": { "param": { "inbox": "inbox_id" } }, "s": [{ "lit": "v1" }, { "lit": "inboxes" }, { "var": "inbox_id" }, { "lit": "tests" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v1/inboxes/generate", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/inboxes/generate", "q": {}, "r": {}, "s": [{ "lit": "v1" }, { "lit": "inboxes" }, { "lit": "generate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v1/inboxes/{inbox}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "inbox", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v1/inboxes/{inbox}", "q": { "exist": ["id"] }, "r": { "param": { "inbox": "id" } }, "s": [{ "lit": "v1" }, { "lit": "inboxes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.inbox"]] }, "key$": "public_v1_inbox", "name__orig": "public_v1_inbox", "Name": "PublicV1Inbox", "name_": "public_v1_inbox", "name-": "public-v1-inbox", "NAME": "PUBLIC_V1_INBOX", "index$": 10 }, { "active": true, "entity": "public_v1_inbox", "key$": "BasicPublicV1InboxFlow", "kind": "basic", "name": "BasicPublicV1InboxFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "public_v1_inbox_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "public_v1_inbox_ref01", "suffix": "_rm0" }, "m": { "id": "public_v1_inbox01" }, "o": "remove", "s": [], "v": [], "index$": 1 }] }, 'PublicV1Inbox', { "POST /v1/inboxes/{inbox}/tests": { "protocol": "http", "operationId": "startTestRun", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": { "test_id": { "type": "string", "description": "Optional custom test ID. If omitted, one will be generated.", "key$": "test_id" } }, "index$": 1 } } } }, "responses": { "200": { "description": "Test started", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true }, "data": { "type": "object", "properties": { "test_id": { "type": "string", "example": "signup-test-1", "key$": "test_id" }, "inbox": { "type": "string", "example": "test@ditube.info", "key$": "inbox" }, "started_at": { "type": "string", "format": "date-time", "example": "2026-03-04T10:00:00.000Z", "key$": "started_at" } }, "index$": 0 } } } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" } }, "parameters": [{ "name": "inbox", "in": "path", "required": true, "description": "The inbox to start a test for.", "schema": { "type": "string", "example": "test@ditube.info" }, "index$": 0 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } }, "POST /v1/inboxes/generate": { "protocol": "http", "operationId": "generateInboxes", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "count": { "type": "integer", "description": "Number of inboxes to generate (1–500 depending on plan).", "default": 1, "minimum": 1, "key$": "count" }, "username_style": { "type": "string", "description": "Username generation style. One of: `random_chars` (default), `digits_only`, `letters_only`, `name`, `noun_digits`, `firstname.surname`.\n", "default": "random_chars", "key$": "username_style" }, "domain_mode": { "type": "string", "description": "Which domain pool to use. One of: `any` (default), `free_only`, `pro_only`, `custom_only`, `specific`.\n", "default": "any", "key$": "domain_mode" }, "domains": { "type": "array", "items": { "type": "string" }, "description": "Required when `domain_mode` is `specific`. List of domains to use.", "key$": "domains" }, "output_format": { "type": "string", "description": "Template string for each line of output. Variables: `{email}`, `{username}`, `{domain}`, `{otp_url}`, `{token}`, `{api_key}`.\n", "default": "{email}----{otp_url}", "key$": "output_format" }, "since": { "type": "integer", "description": "Unix timestamp in milliseconds. When provided, it is embedded as `?since=` in every OTP URL so stale codes from previous sessions are ignored.\n", "key$": "since" }, "parseCode": { "type": "boolean", "description": "When `true` (default), embeds `?parseCode=true` in every OTP URL. This enables on-demand OTP extraction at poll time rather than at SMTP delivery — required for API inboxes since they use the fast-save path.\n", "default": true, "key$": "parseCode" }, "custom_firstnames": { "type": "array", "items": { "type": "string" }, "description": "Custom first-name pool for `firstname.surname` style.", "key$": "custom_firstnames" }, "custom_surnames": { "type": "array", "items": { "type": "string" }, "description": "Custom surname pool for `firstname.surname` style.", "key$": "custom_surnames" } }, "index$": 1 } } } }, "responses": { "200": { "description": "Inboxes generated", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true, "key$": "success" }, "count": { "type": "integer", "example": 5, "key$": "count" }, "daily_used": { "type": "integer", "nullable": true, "key$": "daily_used" }, "daily_limit": { "type": "integer", "nullable": true, "key$": "daily_limit" }, "daily_remaining": { "type": "integer", "nullable": true, "key$": "daily_remaining" }, "inboxes": { "type": "array", "items": { "type": "object", "properties": { "email": { "type": "string", "example": "jade.quasar21@addmy.space" }, "username": { "type": "string", "example": "jade.quasar21" }, "domain": { "type": "string", "example": "addmy.space" }, "token": { "type": "string", "example": "fceotp_24f1add500d18150a02c62e4…" }, "otp_url": { "type": "string", "example": "https://api2.freecustom.email/v1/otp/public?token=fceotp_…&since=1716900000000&parseCode=true" }, "formatted": { "type": "string", "example": "jade.quasar21@addmy.space----https://api2.freecustom.email/v1/otp/public?token=fceotp_…" } } }, "key$": "inboxes" } }, "index$": 0 } } } }, "400": { "description": "Invalid parameters" }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "403": { "description": "Plan too low or daily/batch limit exceeded", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["plan_required", "plan_restriction", "domain_not_verified", "domain_not_found"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true } }, "x-ref": "#/components/schemas/Error403Plan" } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } }, "DELETE /v1/inboxes/{inbox}": { "protocol": "http", "operationId": "deleteInbox", "responses": { "200": { "description": "Unregistered", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true }, "message": { "type": "string" } } } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "404": { "description": "Inbox not registered", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "example": "not_found" }, "message": { "type": "string" } } } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "inbox", "in": "path", "required": true, "description": "URL-encoded email address (e.g. test%40ditube.info)", "schema": { "type": "string" }, "index$": 0 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const public_v1_inbox_ref01_ent = client.PublicV1Inbox();
        let public_v1_inbox_ref01_data = setup.data.new.public_v1_inbox['public_v1_inbox_ref01'];
        public_v1_inbox_ref01_data = (await public_v1_inbox_ref01_ent.create(public_v1_inbox_ref01_data)).data();
        (0, node_assert_1.default)(null != public_v1_inbox_ref01_data.id);
        // REMOVE
        const public_v1_inbox_ref01_match_rm0 = { id: public_v1_inbox_ref01_data.id };
        await public_v1_inbox_ref01_ent.remove(public_v1_inbox_ref01_match_rm0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/public_v1_inbox/PublicV1InboxTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CustomTempMailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['public_v1_inbox01', 'public_v1_inbox02', 'public_v1_inbox03', 'inbox01', 'inbox02', 'inbox03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_INBOX_ENTID': idmap,
        'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
        'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
        'CUSTOM_TEMP_MAIL_APIKEY': '',
    });
    idmap = env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_INBOX_ENTID'];
    const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_INBOX_ENTID'];
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
//# sourceMappingURL=PublicV1InboxEntity.test.js.map