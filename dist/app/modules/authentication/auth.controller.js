"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationCode = exports.loginUser = void 0;
const auth_repository_1 = require("../../modules/authentication/repository/auth.repository");
const utils_1 = require("../../shared/utils");
const AppError_1 = __importDefault(require("../../shared/utils/AppError"));
const sendMail_1 = __importDefault(require("../../shared/middleware/sendMail"));
const config_1 = __importDefault(require("../../shared/config"));
const auth_service_1 = require("../../modules/authentication/auth.service");
exports.loginUser = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield auth_repository_1.userRepository.findOne({ email });
    const code = Math.floor(100000 + Math.random() * 900000);
    const emailSent = yield new sendMail_1.default(code).sendEmail(email, "Your Nova Store Verification Code");
    if (!emailSent) {
        return next(new AppError_1.default("Failed to send verification code. Please try again later.", 500, "email_send_failure"));
    }
    const hashedCode = (0, utils_1.hmacProcess)(code, config_1.default.HASHING_SECRET);
    if (!user) {
        yield auth_repository_1.userRepository.create({ email, verificationCode: hashedCode });
    }
    else {
        yield auth_repository_1.userRepository.updateById(user._id, { verificationCode: hashedCode });
    }
    return res.status(200).json({
        status: "success",
        message: "Verification code sent successfully"
    });
}));
exports.verificationCode = (0, utils_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    let isMobile = req.headers.client === "not-browser";
    const user = yield (0, auth_service_1.existUserByEmail)(email);
    const isValid = (0, utils_1.hmacProcess)(code, config_1.default.HASHING_SECRET) === user.verificationCode;
    if (!isValid) {
        return next(new AppError_1.default("Invalid verification code", 401, "invalid_code"));
    }
    user.isVerified = true;
    user.verificationCode = null;
    yield auth_repository_1.userRepository.updateById(user._id, user);
    let tokens = yield (0, auth_service_1.generateTokenServices)(user);
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
}));
