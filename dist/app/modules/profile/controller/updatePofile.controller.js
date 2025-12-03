"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const updateProfile_services_1 = require("../services/updateProfile.services");
const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const data = req.body;
        const updatedUser = await updateProfile_services_1.updateProfileServices.updateProfile(userId, data);
        res.status(200).json({
            status: "success",
            message: "Profile updated successfully",
            data: updatedUser
        });
    }
    catch (error) {
        next(new AppError_1.default(error.message, 500, "ERROR_UPDATING_PROFILE"));
    }
};
exports.updateProfile = updateProfile;
