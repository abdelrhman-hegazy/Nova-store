"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationCode = exports.loginUser = void 0;
const user_repository_1 = require("./repository/user.repository");
const utils_1 = require("../../shared/utils");
const AppError_1 = __importDefault(require("../../shared/utils/AppError"));
const sendMail_1 = __importDefault(require("../../shared/middleware/sendMail"));
const auth_service_1 = require("./auth.service");
exports.loginUser = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { email } = req.body;
    const user = await user_repository_1.userRepository.findOne({ email });
    const code = Math.floor(100000 + Math.random() * 900000);
    const emailSent = await new sendMail_1.default(code).sendEmail(email, "Your Nova Store Verification Code");
    if (!emailSent) {
        return next(new AppError_1.default("Failed to send verification code. Please try again later.", 500, "email_send_failure"));
    }
    const hashedCode = (0, utils_1.hmacProcess)(code);
    if (!user) {
        await user_repository_1.userRepository.create({ email, verificationCode: hashedCode });
    }
    else {
        await user_repository_1.userRepository.updateById(user._id, { verificationCode: hashedCode });
    }
    return res.status(200).json({
        status: "success",
        message: "Verification code sent successfully"
    });
});
exports.verificationCode = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { email, code } = req.body;
    let isMobile = req.headers.client === "not-browser";
    const user = await (0, auth_service_1.existUserByEmail)(email);
    const isValid = (0, utils_1.hmacProcess)(code) === user.verificationCode;
    if (!isValid) {
        return next(new AppError_1.default("Invalid verification code", 401, "invalid_code"));
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user_repository_1.userRepository.updateById(user._id, user);
    let tokens = await (0, auth_service_1.generateTokenServices)(user);
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
        return res.cookie("Authorization", "Bearer " + tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }).json({
            status: "success",
            message: "User verified successfully",
            accessToken: "Bearer " + tokens.accessToken
        });
    }
});
