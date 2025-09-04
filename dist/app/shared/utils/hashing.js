"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmacProcess = void 0;
const crypto_1 = require("crypto");
const hmacProcess = (code, key) => {
    return (0, crypto_1.createHmac)("sha256", key)
        .update(code.toString())
        .digest("hex");
};
exports.hmacProcess = hmacProcess;
