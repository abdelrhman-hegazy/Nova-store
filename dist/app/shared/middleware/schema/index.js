"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = exports.cartSchema = exports.commentSchema = exports.updateProductSchema = exports.productSchema = exports.verificationSchema = exports.emailSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.emailSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(5).max(100).required(),
    isAdmin: joi_1.default.boolean().required()
});
exports.verificationSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(5).max(100).required(),
    code: joi_1.default.string().length(6).required()
});
exports.productSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).required(),
    categoryId: joi_1.default.string().required(),
    price: joi_1.default.number().positive().precision(2).required(),
    discount: joi_1.default.number().min(0).max(100).optional().default(0),
    details: joi_1.default.string().max(1000).optional(),
    stock: joi_1.default.number().integer().min(0).optional().default(1)
});
exports.updateProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(2).max(100).optional(),
    categoryId: joi_1.default.string().optional(),
    price: joi_1.default.number().positive().precision(2).optional(),
    discount: joi_1.default.number().min(0).max(100).optional(),
    details: joi_1.default.string().max(1000).optional(),
    stock: joi_1.default.number().integer().min(0).optional()
});
exports.commentSchema = joi_1.default.object({
    comment: joi_1.default.string().min(2).max(1000).optional(),
    rate: joi_1.default.number().min(1).max(5).optional()
});
exports.cartSchema = joi_1.default.object({
    quantity: joi_1.default.number().integer().min(1).required()
});
exports.updateProfileSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(2).max(100).optional(),
    lastName: joi_1.default.string().min(2).max(100).optional(),
    mobileNumber: joi_1.default.string().min(10).max(15).optional(),
    address: joi_1.default.string().max(1000).optional(),
    country: joi_1.default.string().optional(),
    city: joi_1.default.string().optional(),
    street: joi_1.default.string().optional(),
    building: joi_1.default.string().optional(),
    floor: joi_1.default.string().optional(),
    apartment: joi_1.default.string().optional(),
    username: joi_1.default.string().optional(),
    dateOfBirth: joi_1.default.string().optional(),
});
