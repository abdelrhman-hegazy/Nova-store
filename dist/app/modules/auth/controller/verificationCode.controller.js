"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationCode = void 0;
const user_repository_1 = require("../repository/user.repository");
const utils_1 = require("../../../shared/utils");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const auth__service_1 = require("../services/auth .service");
const config_1 = __importDefault(require("../../../shared/config"));
exports.verificationCode = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { email, code } = req.body;
    let isMobile = req.headers.client === "not-browser";
    const user = await auth__service_1.AuthService.existUserByEmail(email);
    const isValid = (0, utils_1.hmacProcess)(code) === user.verificationCode;
    if (!isValid) {
        return next(new AppError_1.default("Invalid verification code", 401, "invalid_code"));
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user_repository_1.userRepository.updateById(user._id, user);
    let tokens = await auth__service_1.AuthService.generateTokenServices(user);
    if (isMobile) {
        return res.status(200).json({
            status: "success",
            message: "User verified successfully",
            tokens: {
                accessToken: "Bearer " + tokens.accessToken,
                refreshToken: "Bearer " + tokens.refreshToken
            }
        });
    }
    else {
        return res.cookie("refreshToken", "Bearer " + tokens.refreshToken, {
            httpOnly: true,
            secure: config_1.default.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).json({
            status: "success",
            message: "User verified successfully",
            tokens: {
                accessToken: "Bearer " + tokens.accessToken,
            }
        });
    }
});
