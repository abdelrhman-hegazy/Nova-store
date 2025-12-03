"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileServices = void 0;
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const services_1 = require("../../../shared/services");
const user_repository_1 = require("../../auth/repository/user.repository");
class updateProfileServices {
    static async updateProfile(userId, data) {
        try {
            await services_1.sharedServices.existUserById(userId);
            const updatedUser = await user_repository_1.userRepository.updateById(userId, data);
            return updatedUser;
        }
        catch (error) {
            throw new AppError_1.default(error.message || "Error updating profile", 500, "ERROR_UPDATING_PROFILE");
        }
    }
}
exports.updateProfileServices = updateProfileServices;
