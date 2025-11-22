"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    status;
    errorType;
    constructor(message, status, errorType) {
        super(message);
        this.status = status;
        this.errorType = errorType;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
