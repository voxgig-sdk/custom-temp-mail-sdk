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
(0, node_test_1.describe)('CustomDomainEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CUSTOM_TEMP_MAIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CUSTOM_TEMP_MAIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.CustomTempMailSDK.test();
        const ent = testsdk.CustomDomain();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CUSTOM_TEMP_MAIL_TEST_LIVE;
        for (const op of ['create', 'list', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'custom_domain.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "added_at": { "a": true, "fo": "date-time", "h": "Added At", "n": "added_at", "r": false, "sh": "ISO 8601 timestamp when the domain was added.", "t": "`$STRING`", "key$": "added_at", "index$": 0 }, "domain": { "a": true, "h": "Domain", "n": "domain", "r": true, "sh": "Bare domain name (no leading @).", "t": "`$STRING`", "key$": "domain", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "mx_record": { "a": true, "h": "Mx Record", "n": "mx_record", "r": true, "sh": "The MX record value to add at your registrar.", "t": "`$STRING`", "key$": "mx_record", "index$": 3 }, "txt_record": { "a": true, "h": "Txt Record", "n": "txt_record", "r": true, "sh": "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar.", "t": "`$STRING`", "key$": "txt_record", "index$": 4 }, "verified": { "a": true, "h": "Verified", "n": "verified", "r": true, "sh": "`true` — MX and TXT records confirmed.", "t": "`$BOOLEAN`", "key$": "verified", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "custom_domain", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/custom-domains", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/custom-domains", "q": {}, "r": {}, "s": [{ "lit": "v1" }, { "lit": "custom-domains" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/custom-domains", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v1/custom-domains", "q": {}, "r": {}, "s": [{ "lit": "v1" }, { "lit": "custom-domains" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v1/custom-domains/{domain}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "mail.acme.com", "k": "param", "n": "id", "or": "domain", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v1/custom-domains/{domain}", "q": { "exist": ["id"] }, "r": { "param": { "domain": "id" } }, "s": [{ "lit": "v1" }, { "lit": "custom-domains" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "custom_domain", "name__orig": "custom_domain", "Name": "CustomDomain", "name_": "custom_domain", "name-": "custom-domain", "NAME": "CUSTOM_DOMAIN", "index$": 0 }, { "active": true, "entity": "custom_domain", "key$": "BasicCustomDomainFlow", "kind": "basic", "name": "BasicCustomDomainFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "custom_domain_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "custom_domain_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "custom_domain_ref01", "suffix": "_rm0" }, "m": { "id": "custom_domain01" }, "o": "remove", "s": [], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "custom_domain_ref01" } }], "index$": 3 }] }, 'CustomDomain', { "POST /v1/custom-domains": { "protocol": "http", "operationId": "addCustomDomain", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["domain"], "properties": { "domain": { "type": "string", "description": "The bare domain name to add (no leading `@`, no protocol).", "example": "mail.acme.com", "key$": "domain" } }, "index$": 1 }, "example": { "domain": "mail.acme.com" } } } }, "responses": { "200": { "description": "Domain was already added (idempotent)", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true }, "message": { "type": "string", "example": "Domain already added." }, "data": { "type": "object", "required": ["domain", "verified", "mx_record", "txt_record"], "description": "A custom domain added to your account.", "properties": { "domain": { "description": "Bare domain name (no leading @).", "example": "mail.acme.com", "type": "string", "key$": "domain" }, "verified": { "description": "`true` — MX and TXT records confirmed. Inboxes can be registered.\n`false` — DNS records not yet verified. Call the verify endpoint.\n", "example": true, "type": "boolean", "key$": "verified" }, "mx_record": { "description": "The MX record value to add at your registrar.", "example": "mx.freecustom.email", "type": "string", "key$": "mx_record" }, "txt_record": { "description": "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.", "example": "freecustomemail-verification=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4", "type": "string", "key$": "txt_record" }, "added_at": { "description": "ISO 8601 timestamp when the domain was added.", "example": "2026-01-15T10:00:00.000Z", "format": "date-time", "nullable": true, "type": "string", "key$": "added_at" } }, "x-ref": "#/components/schemas/CustomDomainEntry", "index$": 0 } } } } } }, "201": { "description": "Domain added — configure the DNS records and then call the verify endpoint", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true }, "message": { "type": "string", "example": "Domain added. Configure the DNS records below, then call the verify endpoint." }, "data": { "type": "object", "allOf": [{ "type": "object", "required": ["domain", "verified", "mx_record", "txt_record"], "description": "A custom domain added to your account.", "properties": { "domain": { "description": "Bare domain name (no leading @).", "example": "mail.acme.com", "type": "string", "key$": "domain" }, "verified": { "description": "`true` — MX and TXT records confirmed. Inboxes can be registered.\n`false` — DNS records not yet verified. Call the verify endpoint.\n", "example": true, "type": "boolean", "key$": "verified" }, "mx_record": { "description": "The MX record value to add at your registrar.", "example": "mx.freecustom.email", "type": "string", "key$": "mx_record" }, "txt_record": { "description": "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.", "example": "freecustomemail-verification=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4", "type": "string", "key$": "txt_record" }, "added_at": { "description": "ISO 8601 timestamp when the domain was added.", "example": "2026-01-15T10:00:00.000Z", "format": "date-time", "nullable": true, "type": "string", "key$": "added_at" } }, "x-ref": "#/components/schemas/CustomDomainEntry" }], "properties": { "dns_records": { "type": "array", "description": "The two DNS records to add at your registrar (MX + TXT).", "items": { "type": "object", "required": ["type", "hostname", "value", "ttl"], "description": "A DNS record to add at your registrar.", "properties": { "type": { "type": "string", "enum": ["MX", "TXT"], "example": "MX" }, "hostname": { "type": "string", "description": "The DNS hostname / host field. `@` means the root of the domain.", "example": "@" }, "value": { "type": "string", "description": "The record value to enter in your DNS panel.", "example": "mx.freecustom.email" }, "priority": { "type": "string", "description": "MX priority. Only present for MX records.", "example": "10", "nullable": true }, "ttl": { "type": "string", "description": "Recommended TTL setting.", "example": "Auto" } }, "x-ref": "#/components/schemas/DnsRecord" } }, "next_step": { "type": "string", "description": "The API path to call once DNS records are live.", "example": "POST /v1/custom-domains/mail.acme.com/verify" } } } }, "x-ref": "#/components/schemas/CustomDomainAddedResponse" }, "example": { "success": true, "message": "Domain added. Configure the DNS records below, then call the verify endpoint.", "data": { "domain": "mail.acme.com", "verified": false, "mx_record": "mx.freecustom.email", "txt_record": "freecustomemail-verification=a1b2c3d4e5f6...", "added_at": "2026-03-11T12:00:00.000Z", "dns_records": [{ "type": "MX", "hostname": "@", "value": "mx.freecustom.email", "priority": "10", "ttl": "Auto" }, { "type": "TXT", "hostname": "@", "value": "freecustomemail-verification=a1b2c3d4e5f6...", "ttl": "Auto" }], "next_step": "POST /v1/custom-domains/mail.acme.com/verify" } } } } }, "400": { "description": "Missing or invalid domain name", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["missing_field", "invalid_domain", "limit_reached"] }, "message": { "type": "string" } } }, "examples": { "missing_field": { "value": { "success": false, "error": "missing_field", "message": "`domain` is required (e.g. \"mail.yourdomain.com\")." } }, "invalid_domain": { "value": { "success": false, "error": "invalid_domain", "message": "Must be a valid domain name (e.g. \"mail.yourdomain.com\")." } }, "limit_reached": { "value": { "success": false, "error": "limit_reached", "message": "Maximum of 10 custom domains reached." } } } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "403": { "description": "Plan too low — Growth or Enterprise required", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["plan_required", "plan_restriction", "domain_not_verified", "domain_not_found"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true } }, "x-ref": "#/components/schemas/Error403Plan" } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } }, "GET /v1/custom-domains": { "protocol": "http", "operationId": "listCustomDomains", "responses": { "200": { "description": "Success", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "example": true, "key$": "success", "type": "boolean" }, "count": { "description": "Number of custom domains in your account.", "example": 2, "key$": "count", "type": "integer" }, "data": { "items": { "description": "A custom domain added to your account.", "properties": { "added_at": { "description": "ISO 8601 timestamp when the domain was added.", "example": "2026-01-15T10:00:00.000Z", "format": "date-time", "nullable": true, "type": "string", "key$": "added_at" }, "domain": { "description": "Bare domain name (no leading @).", "example": "mail.acme.com", "type": "string", "key$": "domain" }, "mx_record": { "description": "The MX record value to add at your registrar.", "example": "mx.freecustom.email", "type": "string", "key$": "mx_record" }, "txt_record": { "description": "The full TXT record value (including the `freecustomemail-verification=` prefix) to add at your registrar. Unique per domain + account.", "example": "freecustomemail-verification=a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4", "type": "string", "key$": "txt_record" }, "verified": { "description": "`true` — MX and TXT records confirmed. Inboxes can be registered.\n`false` — DNS records not yet verified. Call the verify endpoint.\n", "example": true, "type": "boolean", "key$": "verified" } }, "required": ["domain", "verified", "mx_record", "txt_record"], "type": "object", "x-ref": "#/components/schemas/CustomDomainEntry", "index$": 0 }, "key$": "data", "type": "array" } }, "x-ref": "#/components/schemas/CustomDomainsListResponse" }, "example": { "success": true, "count": 2, "data": [{ "domain": "mail.acme.com", "verified": true, "mx_record": "mx.freecustom.email", "txt_record": "freecustomemail-verification=a1b2c3d4e5f6...", "added_at": "2026-01-15T10:00:00.000Z" }, { "domain": "staging.acme.com", "verified": false, "mx_record": "mx.freecustom.email", "txt_record": "freecustomemail-verification=9z8y7x6w5v4u...", "added_at": "2026-03-10T08:30:00.000Z" }] } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "403": { "description": "Plan too low — Growth or Enterprise required", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["plan_required", "plan_restriction", "domain_not_verified", "domain_not_found"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true } }, "x-ref": "#/components/schemas/Error403Plan" } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } }, "DELETE /v1/custom-domains/{domain}": { "protocol": "http", "operationId": "deleteCustomDomain", "responses": { "200": { "description": "Domain removed", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": true }, "message": { "type": "string", "example": "\"mail.acme.com\" removed." }, "inboxes_removed": { "type": "array", "description": "API inboxes that were automatically unregistered because they used\nthis domain. May be an empty array.\n", "items": { "type": "string" }, "example": ["support@mail.acme.com", "noreply@mail.acme.com"] } }, "x-ref": "#/components/schemas/CustomDomainDeletedResponse" }, "example": { "success": true, "message": "\"mail.acme.com\" removed.", "inboxes_removed": ["support@mail.acme.com", "noreply@mail.acme.com"] } } } }, "401": { "description": "Missing or invalid API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["unauthorized", "key_revoked"] }, "message": { "type": "string" } }, "x-ref": "#/components/schemas/Error401" } } }, "x-ref": "#/components/responses/Unauthorized" }, "403": { "description": "Plan too low", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["plan_required", "plan_restriction", "domain_not_verified", "domain_not_found"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true } }, "x-ref": "#/components/schemas/Error403Plan" } } } }, "404": { "description": "Domain not found in your account", "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "example": "domain_not_found" }, "message": { "type": "string" } } } } } }, "429": { "description": "Rate limit exceeded (per-second or monthly quota)", "headers": { "Retry-After": { "schema": { "type": "integer", "description": "Seconds to wait before retrying" } } }, "content": { "application/json": { "schema": { "type": "object", "properties": { "success": { "type": "boolean", "example": false }, "error": { "type": "string", "enum": ["rate_limit_exceeded", "monthly_quota_exceeded"] }, "message": { "type": "string" }, "upgrade_url": { "type": "string", "format": "uri", "nullable": true }, "credits_url": { "type": "string", "format": "uri", "nullable": true }, "hint": { "type": "string", "nullable": true } }, "x-ref": "#/components/schemas/Error429" } } }, "x-ref": "#/components/responses/RateLimited" } }, "parameters": [{ "name": "domain", "in": "path", "required": true, "description": "The bare domain name to remove (e.g. `mail.acme.com`).", "schema": { "type": "string", "example": "mail.acme.com" }, "index$": 0 }], "security": [{ "BearerAuth": [] }], "securitySource": "operation", "securitySchemes": { "BearerAuth": { "type": "http", "scheme": "bearer", "bearerFormat": "JWT", "description": "Developer API key as Bearer token (e.g. `Bearer fce_xxx`)" }, "ApiKeyQuery": { "type": "apiKey", "in": "query", "name": "api_key", "description": "API key as query parameter (alternative to Bearer header)" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const custom_domain_ref01_ent = client.CustomDomain();
        let custom_domain_ref01_data = setup.data.new.custom_domain['custom_domain_ref01'];
        custom_domain_ref01_data = (await custom_domain_ref01_ent.create(custom_domain_ref01_data)).data();
        (0, node_assert_1.default)(null != custom_domain_ref01_data.id);
        // LIST
        const custom_domain_ref01_match = {};
        const custom_domain_ref01_list = (await custom_domain_ref01_ent.list(custom_domain_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(custom_domain_ref01_list, { id: custom_domain_ref01_data.id })));
        // REMOVE
        const custom_domain_ref01_match_rm0 = { id: custom_domain_ref01_data.id };
        await custom_domain_ref01_ent.remove(custom_domain_ref01_match_rm0);
        // LIST
        const custom_domain_ref01_match_rt0 = {};
        const custom_domain_ref01_list_rt0 = (await custom_domain_ref01_ent.list(custom_domain_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(custom_domain_ref01_list_rt0, { id: custom_domain_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/custom_domain/CustomDomainTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.CustomTempMailSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['custom_domain01', 'custom_domain02', 'custom_domain03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_ENTID': idmap,
        'CUSTOM_TEMP_MAIL_TEST_LIVE': 'FALSE',
        'CUSTOM_TEMP_MAIL_TEST_EXPLAIN': 'FALSE',
        'CUSTOM_TEMP_MAIL_APIKEY': '',
    });
    idmap = env['CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_ENTID'];
    const live = 'TRUE' === env.CUSTOM_TEMP_MAIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CUSTOM_TEMP_MAIL_TEST_CUSTOM_DOMAIN_ENTID'];
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
//# sourceMappingURL=CustomDomainEntity.test.js.map