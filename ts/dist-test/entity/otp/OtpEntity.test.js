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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "from", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "inbox", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "message", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "message_id", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "otp", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "date-time", "name": "received_at", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "format": "float", "name": "score", "req": false, "short": "Confidence score (0.0 to 1.0) of the extracted OTP.", "type": "`$NUMBER`", "index$": 6 }, { "active": true, "name": "subject", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "verification_link", "req": false, "type": "`$STRING`", "index$": 8 }], "name": "otp", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "inbox_id", "orig": "inbox", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": false, "kind": "query", "name": "parse_code", "orig": "parse_code", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "kind": "query", "name": "since", "orig": "since", "reqd": false, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /v1/inboxes/{inbox}/otp", "json": "{\"operationId\":\"getOtp\",\"parameters\":[{\"in\":\"path\",\"name\":\"inbox\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Unix timestamp in milliseconds. Only OTPs from messages received after this timestamp are returned.\\n\",\"in\":\"query\",\"name\":\"since\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"When `true`, includes messages where `otp` is null and triggers on-demand extraction from stored text. Use for API-generated inboxes.\\n\",\"in\":\"query\",\"name\":\"parseCode\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"from\":{\"nullable\":true,\"type\":\"string\"},\"inbox\":{\"type\":\"string\"},\"message\":{\"nullable\":true,\"type\":\"string\"},\"message_id\":{\"nullable\":true,\"type\":\"string\"},\"otp\":{\"nullable\":true,\"type\":\"string\"},\"received_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"score\":{\"description\":\"Confidence score (0.0 to 1.0) of the extracted OTP.\",\"format\":\"float\",\"nullable\":true,\"type\":\"number\"},\"subject\":{\"nullable\":true,\"type\":\"string\"},\"verification_link\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Success (OTP found or null)\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"403\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"plan_required\",\"plan_restriction\",\"domain_not_verified\",\"domain_not_found\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Plan too low — requires Growth plan ($89/mo) or above\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/inboxes/{inbox}/otp", "rename": { "param": { "inbox": "inbox_id" } }, "segments": [{ "lit": "v1" }, { "lit": "inboxes" }, { "var": "inbox_id" }, { "lit": "otp" }], "select": { "exist": ["inbox_id", "parse_code", "since"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": false, "kind": "query", "name": "parse_code", "orig": "parse_code", "reqd": false, "type": "`$BOOLEAN`" }, { "active": true, "example": 1716900000000, "kind": "query", "name": "since", "orig": "since", "reqd": false, "type": "`$INTEGER`" }, { "active": true, "example": "fceotp_24f1add500d18150a02c62e40b395828226a79ab", "kind": "query", "name": "token", "orig": "token", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "GET /v1/otp/public", "json": "{\"operationId\":\"getOtpPublic\",\"parameters\":[{\"description\":\"Per-inbox OTP token (format `fceotp_…`). Generated by `POST /v1/inboxes/generate`.\",\"in\":\"query\",\"name\":\"token\",\"required\":true,\"schema\":{\"example\":\"fceotp_24f1add500d18150a02c62e40b395828226a79ab\",\"type\":\"string\"}},{\"description\":\"Unix timestamp in milliseconds. Only OTPs from messages received **after** this timestamp are returned. Use the timestamp captured just before triggering the verification email to skip stale codes.\\n\",\"in\":\"query\",\"name\":\"since\",\"required\":false,\"schema\":{\"example\":1716900000000,\"type\":\"integer\"}},{\"description\":\"When `true`, triggers on-demand OTP extraction from stored email text. Required for API-generated inboxes (fast-save path stores `otp: null`). The Inbox Generator embeds this flag in OTP URLs by default.\\n\",\"in\":\"query\",\"name\":\"parseCode\",\"required\":false,\"schema\":{\"default\":false,\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"from\":{\"nullable\":true,\"type\":\"string\"},\"inbox\":{\"type\":\"string\"},\"message\":{\"nullable\":true,\"type\":\"string\"},\"message_id\":{\"nullable\":true,\"type\":\"string\"},\"otp\":{\"nullable\":true,\"type\":\"string\"},\"received_at\":{\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"score\":{\"description\":\"Confidence score (0.0 to 1.0) of the extracted OTP.\",\"format\":\"float\",\"nullable\":true,\"type\":\"number\"},\"subject\":{\"nullable\":true,\"type\":\"string\"},\"verification_link\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"OTP found or null\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"token_not_found\",\"type\":\"string\"},\"message\":{\"example\":\"Token not found or expired.\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Token not found or expired\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded (per-second or monthly quota)\",\"headers\":{\"Retry-After\":{\"schema\":{\"description\":\"Seconds to wait before retrying\",\"type\":\"integer\"}}}}},\"security\":[],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/otp/public", "segments": [{ "lit": "v1" }, { "lit": "otp" }, { "lit": "public" }], "select": { "$action": "public", "exist": ["parse_code", "since", "token"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["inbox"]] }, "key$": "otp", "name__orig": "otp", "Name": "Otp", "name_": "otp", "name-": "otp", "NAME": "OTP", "index$": 7 }, { "active": true, "entity": "otp", "key$": "BasicOtpFlow", "kind": "basic", "name": "BasicOtpFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "otp_ref01", "srcdatavar": "otp_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-otp_ref01" } }], "index$": 0 }] }, 'Otp');
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