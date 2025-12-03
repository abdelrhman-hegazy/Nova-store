"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileServices = void 0;
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const user_repository_1 = require("../../auth/repository/user.repository");
class getProfileServices {
    static async getProfile(userId) {
        try {
            const user = await user_repository_1.userRepository.findById(userId);
            return user;
        }
        catch (error) {
            throw new AppError_1.default(error.message, 500, "SERVER_ERROR");
        }
    }
}
exports.getProfileServices = getProfileServices;
