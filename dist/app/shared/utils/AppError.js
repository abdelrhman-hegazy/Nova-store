"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode, errorType) {
        super(message);
        this.statusCode = statusCode;
        this.errorType = errorType;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
