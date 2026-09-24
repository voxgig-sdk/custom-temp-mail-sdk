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
(0, node_test_1.describe)('OtpEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CUSTOM_TEMP_MAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CustomTempMailSDK.test();
        const ent = testsdk.Otp();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'otp.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "from": { "a": true, "h": "From", "n": "from", "r": false, "t": "`$STRING`", "key$": "from", "index$": 0 }, "inbox": { "a": true, "h": "Inbox", "n": "inbox", "r": false, "t": "`$STRING`", "key$": "inbox", "index$": 1 }, "message": { "a": true, "h": "Message", "n": "message", "r": false, "t": "`$STRING`", "key$": "message", "index$": 2 }, "message_id": { "a": true, "h": "Message Id", "n": "message_id", "r": false, "t": "`$STRING`", "key$": "message_id", "index$": 3 }, "otp": { "a": true, "h": "Otp", "n": "otp", "r": false, "t": "`$STRING`", "key$": "otp", "index$": 4 }, "received_at": { "a": true, "fo": "date-time", "h": "Received At", "n": "received_at", "r": false, "t": "`$STRING`", "key$": "received_at", "index$": 5 }, "score": { "a": true, "fo": "float", "h": "Score", "n": "score", "r": false, "sh": "Confidence score (0.0 to 1.0) of the extracted OTP.", "t": "`$NUMBER`", "key$": "score", "index$": 6 }, "subject": { "a": true, "h": "Subject", "n": "subject", "r": false, "t": "`$STRING`", "key$": "subject", "index$": 7 }, "verification_link": { "a": true, "h": "Verification Link", "n": "verification_link", "r": false, "t": "`$STRING`", "key$": "verification_link", "index$": 8 } }, "name": "otp", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/inboxes/{inbox}/otp", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "inbox_id", "or": "inbox", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "k": "query", "n": "parse_code", "or": "parse_code", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "since", "or": "since", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/inboxes/{inbox}/otp", "q": { "exist": ["inbox_id", "parse_code", "since"] }, "r": { "param": { "inbox": "inbox_id" } }, "s": [{ "lit": "v1" }, { "lit": "inboxes" }, { "var": "inbox_id" }, { "lit": "otp" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/otp/public", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": false, "k": "query", "n": "parse_code", "or": "parse_code", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": 1716900000000, "k": "query", "n": "since", "or": "since", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "fceotp_24f1add500d18150a02c62e40b395828226a79ab", "k": "query", "n": "token", "or": "token", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v1/otp/public", "q": { "$action": "public", "exist": ["parse_code", "since", "token"] }, "r": {}, "s": [{ "lit": "v1" }, { "lit": "otp" }, { "lit": "public" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.inbox"]] }, "key$": "otp", "name__orig": "otp", "Name": "Otp", "name_": "otp", "name-": "otp", "NAME": "OTP", "index$": 7 }, { "active": true, "entity": "otp", "key$": "BasicOtpFlow", "kind": "basic", "name": "BasicOtpFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "otp_ref01", "srcdatavar": "otp_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-otp_ref01" } }], "index$": 0 }] }, 'Otp', { "GET /v1/inboxes/{inbox}/otp": { "protocol": "http", "operationId": "getOtp", "responses": { "200": { "description": "Success (OTP found or null)", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "example": true, "key$": "success", "type": "boolean" }, "data": { "key$": "data", "properties": { "from": { "nullable": true, "type": "string", "key$": "from" }, "inbox": { "type": "string", "key$": "inbox" }, "message": { "nullable": true, "type": "string", "key$": "message" }, "message_id": { "nullable": true, "type": "string", "key$": "message_id" }, "otp": { "nullable": true, "type": "string", "key$": "otp" }, "received_at": { "format": "date-time", "nullable": true, "type": "string", "key$": "received_at" }, "score": { "description": "Confidence score (0.0 to 1.0) of the extracted OTP.", "format": "float", "nullable": true, "type": "number", "key$": "score" }, "subject": { "nullable": true, "type": "string", "key$": "subject" }, "verification_link": { "nullable": true, "type": "string", "key$": "verification_link" } }, "type": "object", "index$": 0 } }, "x-ref": "#/components/schemas/OtpResponse" } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "403": { "description": "Plan too low — requires Growth plan ($89/mo) or above", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["plan_required", "plan_restriction", "domain_not_verified", "domain_not_found"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true } }, "x-ref": "#/components/schemas/Error403Plan" } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "inbox", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "since", "in": "query", "required": false, "description": "Unix timestamp in milliseconds. Only OTPs from messages received after this timestamp are returned.\n", "schema": { "type": "integer" }, "index$": 1 }, { "name": "parseCode", "in": "query", "required": false, "description": "When `true`, includes messages where `otp` is null and triggers on-demand extraction from stored text. Use for API-generated inboxes.\n", "schema": { "type": "boolean", "default": false }, "index$": 2 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } }, "GET /v1/otp/public": { "protocol": "http", "operationId": "getOtpPublic", "responses": { "200": { "description": "OTP found or null", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "example": true, "key$": "success", "type": "boolean" }, "data": { "key$": "data", "properties": { "from": { "nullable": true, "type": "string", "key$": "from" }, "inbox": { "type": "string", "key$": "inbox" }, "message": { "nullable": true, "type": "string", "key$": "message" }, "message_id": { "nullable": true, "type": "string", "key$": "message_id" }, "otp": { "nullable": true, "type": "string", "key$": "otp" }, "received_at": { "format": "date-time", "nullable": true, "type": "string", "key$": "received_at" }, "score": { "description": "Confidence score (0.0 to 1.0) of the extracted OTP.", "format": "float", "nullable": true, "type": "number", "key$": "score" }, "subject": { "nullable": true, "type": "string", "key$": "subject" }, "verification_link": { "nullable": true, "type": "string", "key$": "verification_link" } }, "type": "object", "index$": 0 } }, "x-ref": "#/components/schemas/OtpResponse" } } } }, "404": { "description": "Token not found or expired", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "example": "token_not_found" }, "message": { "type": "string", "example": "Token not found or expired." } } } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "token", "in": "query", "required": true, "description": "Per-inbox OTP token (format `fceotp_…`). Generated by `POST /v1/inboxes/generate`.", "schema": { "type": "string", "example": "fceotp_24f1add500d18150a02c62e40b395828226a79ab" }, "index$": 0 }, { "name": "since", "in": "query", "required": false, "description": "Unix timestamp in milliseconds. Only OTPs from messages received **after** this timestamp are returned. Use the timestamp captured just before triggering the verification email to skip stale codes.\n", "schema": { "type": "integer", "example": 1716900000000 }, "index$": 1 }, { "name": "parseCode", "in": "query", "required": false, "description": "When `true`, triggers on-demand OTP extraction from stored email text. Required for API-generated inboxes (fast-save path stores `otp: null`). The Inbox Generator embeds this flag in OTP URLs by default.\n", "schema": { "type": "boolean", "default": false }, "index$": 2 }], "security": [], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let otp_ref01_data = Object.values(setup.data.existing.otp)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const otp_ref01_ent = client.Otp();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/otp/OtpTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CustomTempMailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['otp01', 'otp02', 'otp03', 'inbox01', 'inbox02', 'inbox03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CUSTOM_TEMP_MAIL_TEST_OTP_ENTID': idmap,
        'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
        'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
        'CUSTOM_TEMP_MAIL_APIKEY': '',
    });
    idmap = env['CUSTOM_TEMP_MAIL_TEST_OTP_ENTID'];
    const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_OTP_ENTID'];
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
//# sourceMappingURL=OtpEntity.test.js.map