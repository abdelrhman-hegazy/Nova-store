"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const zod_validation_error_1 = require("zod-validation-error");
const validate = (schema) => (0, catchAsync_1.default)((req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        return next(new AppError_1.default((0, zod_validation_error_1.fromZodError)(result.error).message, 400, "VALIDATION_ERROR"));
    }
    next();
});
exports.validate = validate;
