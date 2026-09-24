"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTempMailError = void 0;
class CustomTempMailError extends Error {
    isCustomTempMailError = true;
    sdk = 'CustomTempMail';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.CustomTempMailError = CustomTempMailError;
//# sourceMappingURL=CustomTempMailError.js.map