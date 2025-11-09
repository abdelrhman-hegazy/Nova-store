"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyCustomer = exports.identifyVendor = void 0;
const utils_1 = require("../../utils");
const AppError_1 = __importDefault(require("../../utils/AppError"));
const config_1 = __importDefault(require("../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function identify(secretToken) {
    return (0, utils_1.catchAsync)(async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(new AppError_1.default("Unauthorized: No token provided", 401, "unauthorized"));
        }
        const token = authHeader.split(" ")[1];
        if (!secretToken) {
            return next(new AppError_1.default("JWT secret is not configured", 500, "configuration_error"));
        }
        jsonwebtoken_1.default.verify(token, secretToken, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return next(new AppError_1.default("Token expired", 401, "token_expired"));
                }
                if (err.name === "JsonWebTokenError") {
                    return next(new AppError_1.default("Invalid token", 401, "invalid_token"));
                }
                return next(new AppError_1.default("Token verification failed", 403, "token_verification_failed"));
            }
            req.user = decoded;
            next();
        });
    });
}
if (!config_1.default.ACCESS_TOKEN_SECRET_VENDOR || !config_1.default.ACCESS_TOKEN_SECRET_CUSTOM) {
    throw new AppError_1.default("JWT secrets are not configured", 500, "configuration_error");
}
exports.identifyVendor = identify(config_1.default.ACCESS_TOKEN_SECRET_VENDOR);
exports.identifyCustomer = identify(config_1.default.ACCESS_TOKEN_SECRET_CUSTOM);
