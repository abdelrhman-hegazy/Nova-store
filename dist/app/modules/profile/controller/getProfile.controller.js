"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const getProfile_services_1 = require("../services/getProfile.services");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await getProfile_services_1.getProfileServices.getProfile(userId);
        res.status(200).json({
            status: "success",
            message: "Profile fetched successfully",
            data: user
        });
    }
    catch (error) {
        next(new AppError_1.default(error.message, 500, "ERROR_GETTING_PROFILE"));
    }
};
exports.getProfile = getProfile;
