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
(0, node_test_1.describe)('PublicV1MessageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CUSTOM_TEMP_MAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CustomTempMailSDK.test();
        const ent = testsdk.PublicV1Message();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'public_v1_message.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "date": { "a": true, "fo": "date-time", "h": "Date", "n": "date", "r": false, "t": "`$STRING`", "key$": "date", "index$": 0 }, "from": { "a": true, "h": "From", "n": "from", "r": false, "t": "`$STRING`", "key$": "from", "index$": 1 }, "has_attachment": { "a": true, "h": "Has Attachment", "n": "has_attachment", "r": false, "t": "`$BOOLEAN`", "key$": "has_attachment", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 3 }, "otp": { "a": true, "h": "Otp", "n": "otp", "r": false, "sh": "The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value).", "t": "`$STRING`", "key$": "otp", "index$": 4 }, "subject": { "a": true, "h": "Subject", "n": "subject", "r": false, "t": "`$STRING`", "key$": "subject", "index$": 5 }, "verification_link": { "a": true, "h": "Verification Link", "n": "verification_link", "r": false, "t": "`$STRING`", "key$": "verification_link", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "public_v1_message", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/inboxes/{inbox}/wait", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "inbox_id", "or": "inbox", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "since", "or": "since", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 30, "k": "query", "n": "timeout", "or": "timeout", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/inboxes/{inbox}/wait", "q": { "exist": ["inbox_id", "since", "timeout"] }, "r": { "param": { "inbox": "inbox_id" } }, "s": [{ "lit": "v1" }, { "lit": "inboxes" }, { "var": "inbox_id" }, { "lit": "wait" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v1/inboxes/{inbox}/messages/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "inbox_id", "or": "inbox", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/v1/inboxes/{inbox}/messages/{id}", "q": { "exist": ["id", "inbox_id"] }, "r": { "param": { "inbox": "inbox_id" } }, "s": [{ "lit": "v1" }, { "lit": "inboxes" }, { "var": "inbox_id" }, { "lit": "messages" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.inbox"]] }, "key$": "public_v1_message", "name__orig": "public_v1_message", "Name": "PublicV1Message", "name_": "public_v1_message", "name-": "public-v1-message", "NAME": "PUBLIC_V1_MESSAGE", "index$": 11 }, { "active": true, "entity": "public_v1_message", "key$": "BasicPublicV1MessageFlow", "kind": "basic", "name": "BasicPublicV1MessageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "public_v1_message_ref01", "srcdatavar": "public_v1_message_ref01_data", "suffix": "_dt0" }, "m": { "id": "public_v1_message01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-public_v1_message_ref01" } }], "index$": 0 }] }, 'PublicV1Message', { "GET /v1/inboxes/{inbox}/wait": { "protocol": "http", "operationId": "waitMessage", "responses": { "200": { "description": "New message received", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "example": true, "key$": "success", "type": "boolean" }, "message": { "example": "New message received", "key$": "message", "type": "string" }, "data": { "key$": "data", "properties": { "date": { "format": "date-time", "type": "string", "key$": "date" }, "from": { "type": "string", "key$": "from" }, "has_attachment": { "type": "boolean", "key$": "has_attachment" }, "id": { "type": "string", "key$": "id" }, "otp": { "description": "The extracted OTP code, or `__DETECTED__` on plans below Growth\n(upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value).\n", "nullable": true, "type": "string", "key$": "otp" }, "subject": { "type": "string", "key$": "subject" }, "verification_link": { "nullable": true, "type": "string", "key$": "verification_link" } }, "type": "object", "x-ref": "#/components/schemas/MessageSummary", "index$": 0 } } } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "403": { "description": "Plan too low — requires Developer plan or above", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["plan_required", "plan_restriction", "domain_not_verified", "domain_not_found"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true } }, "x-ref": "#/components/schemas/Error403Plan" } } } }, "408": { "description": "Timeout reached", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "message": { "type": "string", "example": "Timeout reached" } } } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "inbox", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "timeout", "in": "query", "description": "Max seconds to wait (10-60 recommended, default 30).", "schema": { "type": "integer", "default": 30, "minimum": 1, "maximum": 60 }, "index$": 1 }, { "name": "since", "in": "query", "description": "Last seen message ID. Return immediately if a newer message exists, otherwise wait.", "schema": { "type": "string" }, "index$": 2 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } }, "DELETE /v1/inboxes/{inbox}/messages/{id}": { "protocol": "http", "operationId": "deleteMessage", "responses": { "200": { "description": "Message deleted", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true }, "message": { "type": "string" } } } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "404": { "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "example": "not_found" }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error404" } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "inbox", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }, { "name": "id", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 1 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let public_v1_message_ref01_data = Object.values(setup.data.existing.public_v1_message)[0];
        // LOAD
        const public_v1_message_ref01_ent = client.PublicV1Message();
        const public_v1_message_ref01_match_dt0 = {};
        public_v1_message_ref01_match_dt0.id = public_v1_message_ref01_data.id;
        const public_v1_message_ref01_data_dt0 = (await public_v1_message_ref01_ent.load(public_v1_message_ref01_match_dt0)).data();
        (0, node_assert_1.default)(public_v1_message_ref01_data_dt0.id === public_v1_message_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/public_v1_message/PublicV1MessageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CustomTempMailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['public_v1_message01', 'public_v1_message02', 'public_v1_message03', 'inbox01', 'inbox02', 'inbox03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_MESSAGE_ENTID': idmap,
        'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
        'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
        'CUSTOM_TEMP_MAIL_APIKEY': '',
    });
    idmap = env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_MESSAGE_ENTID'];
    const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_PUBLIC_V1_MESSAGE_ENTID'];
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
//# sourceMappingURL=PublicV1MessageEntity.test.js.map