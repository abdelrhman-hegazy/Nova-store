"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
const email = zod_1.z.string().email().min(5).max(100);
const code = zod_1.z.string().min(6).max(6);
exports.emailSchema = zod_1.z.object({
    email: email
});
exports.verificationSchema = zod_1.z.object({
    email: email,
    code: code
});
