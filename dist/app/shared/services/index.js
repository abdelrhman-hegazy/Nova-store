"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedServices = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../utils/AppError"));
class sharedServices {
    static async validateObjectId(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new AppError_1.default("Invalid ID", 400, "BAD_REQUEST");
        }
    }
}
exports.sharedServices = sharedServices;
