"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const validate = (schema) => (0, catchAsync_1.default)(async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return next(new AppError_1.default(error.details.map(detail => detail.message).join(", "), 400, "VALIDATION_ERROR"));
    }
    next();
});
exports.validate = validate;
