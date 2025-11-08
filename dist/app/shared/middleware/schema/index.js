"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationSchema = exports.emailSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.emailSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(5).max(100).required()
});
exports.verificationSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(5).max(100).required(),
    code: joi_1.default.string().length(6).required()
});
