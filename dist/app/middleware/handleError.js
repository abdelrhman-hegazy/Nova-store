"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.log("Error Middleware Invoked");
    if (config_1.default.NODE_ENV === "development") {
        console.error(`[${new Date().toISOString()}]`, err);
    }
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.errorType || "server_error",
    });
};
exports.default = handleError;
