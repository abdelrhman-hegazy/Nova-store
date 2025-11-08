"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmacProcess = void 0;
const crypto_1 = require("crypto");
const config_1 = __importDefault(require("../config"));
const hmacProcess = (code) => {
    return (0, crypto_1.createHmac)("sha256", config_1.default.HASHING_SECRET)
        .update(code.toString())
        .digest("hex");
};
exports.hmacProcess = hmacProcess;
