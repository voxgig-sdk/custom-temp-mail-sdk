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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "date", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "from", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "has_attachment", "req": false, "type": "`$BOOLEAN`", "index$": 2 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "otp", "req": false, "short": "The extracted OTP code, or `__DETECTED__` on plans below Growth (upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value).", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "subject", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "verification_link", "req": false, "type": "`$STRING`", "index$": 6 }], "id": { "field": "id", "name": "id" }, "name": "public_v1_message", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "inbox_id", "orig": "inbox", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "since", "orig": "since", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": 30, "kind": "query", "name": "timeout", "orig": "timeout", "reqd": false, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /v1/inboxes/{inbox}/wait", "json": "{\"operationId\":\"waitMessage\",\"parameters\":[{\"in\":\"path\",\"name\":\"inbox\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Max seconds to wait (10-60 recommended, default 30).\",\"in\":\"query\",\"name\":\"timeout\",\"schema\":{\"default\":30,\"maximum\":60,\"minimum\":1,\"type\":\"integer\"}},{\"description\":\"Last seen message ID. Return immediately if a newer message exists, otherwise wait.\",\"in\":\"query\",\"name\":\"since\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"date\":{\"format\":\"date-time\",\"type\":\"string\"},\"from\":{\"type\":\"string\"},\"has_attachment\":{\"type\":\"boolean\"},\"id\":{\"type\":\"string\"},\"otp\":{\"description\":\"The extracted OTP code, or `__DETECTED__` on plans below Growth\\n(upgrade or use `GET /v1/inboxes/{inbox}/otp` to read the value).\\n\",\"nullable\":true,\"type\":\"string\"},\"subject\":{\"type\":\"string\"},\"verification_link\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"message\":{\"example\":\"New message received\",\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"New message received\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"plan_required\",\"plan_restriction\",\"domain_not_verified\",\"domain_not_found\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Plan too low — requires Developer plan or above\"},\"408\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"Timeout reached\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Timeout reached\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/inboxes/{inbox}/wait", "rename": { "param": { "inbox": "inbox_id" } }, "segments": [{ "lit": "v1" }, { "lit": "inboxes" }, { "var": "inbox_id" }, { "lit": "wait" }], "select": { "exist": ["inbox_id", "since", "timeout"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "inbox_id", "orig": "inbox", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "DELETE /v1/inboxes/{inbox}/messages/{id}", "json": "{\"operationId\":\"deleteMessage\",\"parameters\":[{\"in\":\"path\",\"name\":\"inbox\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"type\":\"string\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Message deleted\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"not_found\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}}},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/v1/inboxes/{inbox}/messages/{id}", "rename": { "param": { "inbox": "inbox_id" } }, "segments": [{ "lit": "v1" }, { "lit": "inboxes" }, { "var": "inbox_id" }, { "lit": "messages" }, { "var": "id" }], "select": { "exist": ["id", "inbox_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["inbox"]] }, "key$": "public_v1_message", "name__orig": "public_v1_message", "Name": "PublicV1Message", "name_": "public_v1_message", "name-": "public-v1-message", "NAME": "PUBLIC_V1_MESSAGE", "index$": 11 }, { "active": true, "entity": "public_v1_message", "key$": "BasicPublicV1MessageFlow", "kind": "basic", "name": "BasicPublicV1MessageFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "public_v1_message_ref01", "srcdatavar": "public_v1_message_ref01_data", "suffix": "_dt0" }, "match": { "id": "public_v1_message01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-public_v1_message_ref01" } }], "index$": 0 }] }, 'PublicV1Message');
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