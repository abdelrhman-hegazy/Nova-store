"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = exports.verificationSchema = exports.emailSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.emailSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(5).max(100).required(),
    isAdmin: joi_1.default.boolean().required()
});
exports.verificationSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(5).max(100).required(),
    code: joi_1.default.string().length(6).required()
});
exports.createProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    categoryId: joi_1.default.string().required(),
    price: joi_1.default.number().positive().precision(2).required(),
    discount: joi_1.default.number().min(0).max(100).optional().default(0),
    details: joi_1.default.string().max(1000).optional(),
    stock: joi_1.default.number().integer().min(0).optional().default(1)
});
