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
(0, node_test_1.describe)('DomainEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CUSTOM_TEMP_MAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CustomTempMailSDK.test();
        const ent = testsdk.Domain();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'domain.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "domain": { "a": true, "h": "Domain", "n": "domain", "r": true, "sh": "Bare domain name (no leading @).", "t": "`$STRING`", "key$": "domain", "index$": 0 }, "expires_at": { "a": true, "fo": "date", "h": "Expires At", "n": "expires_at", "r": false, "sh": "ISO 8601 date when the domain registration expires at the registrar.", "t": "`$STRING`", "key$": "expires_at", "index$": 1 }, "expires_in_days": { "a": true, "h": "Expires In Days", "n": "expires_in_days", "r": false, "sh": "Days remaining until expiry.", "t": "`$INTEGER`", "key$": "expires_in_days", "index$": 2 }, "expiring_soon": { "a": true, "h": "Expiring Soon", "n": "expiring_soon", "r": false, "sh": "True when the domain expires within 30 days.", "t": "`$BOOLEAN`", "key$": "expiring_soon", "index$": 3 }, "tags": { "a": true, "h": "Tags", "n": "tags", "r": true, "sh": "`new` — recently added, shown for ~30 days.", "t": "`$ARRAY`", "key$": "tags", "index$": 4 }, "tier": { "a": true, "h": "Tier", "n": "tier", "r": true, "sh": "`free` — available on all plans.", "t": "`$STRING`", "key$": "tier", "index$": 5 } }, "name": "domain", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/domains", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v1/domains", "q": {}, "r": {}, "s": [{ "lit": "v1" }, { "lit": "domains" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "domain", "name__orig": "domain", "Name": "Domain", "name_": "domain", "name-": "domain", "NAME": "DOMAIN", "index$": 2 }, { "active": true, "entity": "domain", "key$": "BasicDomainFlow", "kind": "basic", "name": "BasicDomainFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "domain_ref01" } }], "index$": 0 }] }, 'Domain', { "GET /v1/domains": { "protocol": "http", "operationId": "listDomains", "responses": { "200": { "description": "Success", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "example": true, "key$": "success", "type": "boolean" }, "count": { "description": "Total number of domains returned.", "example": 10, "key$": "count", "type": "integer" }, "note": { "description": "Human-readable note about plan gating.", "example": "Upgrade to Growth plan to access additional pro domains.", "key$": "note", "type": "string" }, "data": { "items": { "properties": { "domain": { "description": "Bare domain name (no leading @).", "example": "ditube.info", "type": "string", "key$": "domain" }, "expires_at": { "description": "ISO 8601 date when the domain registration expires at the registrar.\nOnly present when `expiring_soon` is true (within 30 days).\n", "example": "2026-04-01", "format": "date", "nullable": true, "type": "string", "key$": "expires_at" }, "expires_in_days": { "description": "Days remaining until expiry. Only present when `expiring_soon` is true.", "example": 25, "nullable": true, "type": "integer", "key$": "expires_in_days" }, "expiring_soon": { "description": "True when the domain expires within 30 days. Omitted entirely for\nhealthy domains to keep the payload lean. When true, migrate inboxes\nto a different domain or your own custom domain.\n", "example": true, "nullable": true, "type": "boolean", "key$": "expiring_soon" }, "tags": { "description": "`new` — recently added, shown for ~30 days.\n`popular` — high-traffic domain.\n`featured` — pinned at top of domain picker.\n", "example": ["popular"], "items": { "enum": ["new", "popular", "featured"], "type": "string" }, "type": "array", "key$": "tags" }, "tier": { "description": "`free` — available on all plans.\n`pro` — requires Growth or Enterprise plan.\n", "enum": ["free", "pro"], "type": "string", "key$": "tier" } }, "required": ["domain", "tier", "tags"], "type": "object", "x-ref": "#/components/schemas/DomainEntry", "index$": 0 }, "key$": "data", "type": "array" } }, "x-ref": "#/components/schemas/DomainsListResponse" }, "examples": { "free_plan": { "summary": "Free / Developer / Startup plan", "value": { "success": true, "count": 10, "note": "Upgrade to Growth plan to access additional pro domains.", "data": [{ "domain": "ditube.info", "tier": "free", "tags": ["popular"] }, { "domain": "ditplay.info", "tier": "free", "tags": ["popular"] }, { "domain": "ditapi.info", "tier": "free", "tags": [] }, { "domain": "getnotify.io", "tier": "free", "tags": ["new"], "expires_at": "2026-04-01", "expires_in_days": 25, "expiring_soon": true }] } }, "growth_plan": { "summary": "Growth / Enterprise plan", "value": { "success": true, "count": 14, "note": "Growth/Enterprise plan: free + pro domains included.", "data": [{ "domain": "ditube.info", "tier": "free", "tags": ["popular"] }, { "domain": "ditmail.pro", "tier": "pro", "tags": ["new", "featured"] }, { "domain": "mock-api.pro", "tier": "pro", "tags": ["new", "featured"] }] } } } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let domain_ref01_data = Object.values(setup.data.existing.domain)[0];
        // LIST
        const domain_ref01_ent = client.Domain();
        const domain_ref01_match = {};
        const domain_ref01_list = (await domain_ref01_ent.list(domain_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/domain/DomainTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CustomTempMailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['domain01', 'domain02', 'domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CUSTOM_TEMP_MAIL_TEST_DOMAIN_ENTID': idmap,
        'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
        'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
        'CUSTOM_TEMP_MAIL_APIKEY': '',
    });
    idmap = env['CUSTOM_TEMP_MAIL_TEST_DOMAIN_ENTID'];
    const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_DOMAIN_ENTID'];
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
//# sourceMappingURL=DomainEntity.test.js.map