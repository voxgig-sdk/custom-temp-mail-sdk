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
(0, node_test_1.describe)('MenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CUSTOM_TEMP_MAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CustomTempMailSDK.test();
        const ent = testsdk.Men();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'men.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "api_inbox_count", "req": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "api_inboxes", "req": false, "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "app_inbox_count", "req": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "app_inboxes", "req": false, "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "credits", "req": false, "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "custom_domain_count", "req": false, "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "custom_domains", "req": false, "type": "`$ARRAY`", "index$": 6 }, { "active": true, "name": "features", "req": false, "type": "`$OBJECT`", "index$": 7 }, { "active": true, "name": "plan", "req": false, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "rate_limits", "req": false, "type": "`$OBJECT`", "index$": 9 }], "name": "men", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /v1/me", "json": "{\"operationId\":\"getMe\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"api_inbox_count\":{\"type\":\"integer\"},\"api_inboxes\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"app_inbox_count\":{\"type\":\"integer\"},\"app_inboxes\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"credits\":{\"example\":25000,\"type\":\"integer\"},\"custom_domain_count\":{\"type\":\"integer\"},\"custom_domains\":{\"items\":{\"description\":\"A custom domain added to your account.\",\"properties\":{\"added_at\":{\"description\":\"ISO 8601 timestamp when the domain was added.\",\"example\":\"2026-01-15T10:00:00.000Z\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"domain\":{\"description\":\"Bare domain name (no leading @).\",\"example\":\"mail.acme.com\",\"type\":\"string\"},\"mx_record\":{\"description\":\"The MX record value to add at your registrar.\",\"example\":\"mx.freecustom.email\",\"type\":\"string\"},\"txt_record\":{\"description\":\"The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.\",\"example\":\"freecustomemail-verification=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4\",\"type\":\"string\"},\"verified\":{\"description\":\"`true` — MX and TXT records confirmed. Inboxes can be registered.\\n`false` — DNS records not yet verified. Call the verify endpoint.\\n\",\"example\":true,\"type\":\"boolean\"}},\"required\":[\"domain\",\"verified\",\"mx_record\",\"txt_record\"],\"type\":\"object\"},\"type\":\"array\"},\"features\":{\"properties\":{\"attachments\":{\"type\":\"boolean\"},\"custom_domains\":{\"type\":\"boolean\"},\"max_attachment_size_mb\":{\"type\":\"integer\"},\"max_ws_connections\":{\"type\":\"integer\"},\"otp_extraction\":{\"type\":\"boolean\"},\"websocket\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"plan\":{\"example\":\"startup\",\"type\":\"string\"},\"rate_limits\":{\"properties\":{\"requests_per_month\":{\"type\":\"integer\"},\"requests_per_second\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"},\"success\":{\"example\":true,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Success\",\"headers\":{\"X-API-Plan\":{\"schema\":{\"example\":\"startup\",\"type\":\"string\"}},\"X-RateLimit-Limit-Month\":{\"schema\":{\"example\":250000,\"type\":\"integer\"}},\"X-RateLimit-Limit-Second\":{\"schema\":{\"example\":25,\"type\":\"integer\"}},\"X-RateLimit-Remaining-Month\":{\"schema\":{\"example\":248770,\"type\":\"integer\"}},\"X-RateLimit-Remaining-Second\":{\"schema\":{\"example\":24,\"type\":\"integer\"}}}},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"enum\":[\"unauthorized\",\"key_revoked\"],\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Missing or invalid API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"},\"error\":{\"enum\":[\"rate_limit_exceeded\",\"monthly_quota_exceeded\"],\"type\":\"string\"},\"hint\":{\"nullable\":true,\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"},\"upgrade_url\":{\"format\":\"uri\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"}},\"security\":[{\"BearerAuth\":[]}],\"securitySchemes\":{\"ApiKeyQuery\":{\"description\":\"API key as query parameter (alternative to Bearer header)\",\"in\":\"query\",\"name\":\"api_key\",\"type\":\"apiKey\"},\"BearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"Developer API key as Bearer token (e.g. `Bearer fce_xxx`)\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/v1/me", "segments": [{ "lit": "v1" }, { "lit": "me" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "men", "name__orig": "men", "Name": "Men", "name_": "men", "name-": "men", "NAME": "MEN", "index$": 5 }, { "active": true, "entity": "men", "key$": "BasicMenFlow", "kind": "basic", "name": "BasicMenFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "men_ref01", "srcdatavar": "men_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-men_ref01" } }], "index$": 0 }] }, 'Men');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let men_ref01_data = Object.values(setup.data.existing.men)[0];
        // LOAD
        const men_ref01_ent = client.Men();
        const men_ref01_match_dt0 = {};
        const men_ref01_data_dt0 = (await men_ref01_ent.load(men_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != men_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/men/MenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CustomTempMailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['men01', 'men02', 'men03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CUSTOM_TEMP_MAIL_TEST_MEN_ENTID': idmap,
        'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
        'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
        'CUSTOM_TEMP_MAIL_APIKEY': '',
    });
    idmap = env['CUSTOM_TEMP_MAIL_TEST_MEN_ENTID'];
    const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_MEN_ENTID'];
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
//# sourceMappingURL=MenEntity.test.js.map