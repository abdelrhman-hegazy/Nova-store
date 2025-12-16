"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationCodeService = void 0;
const services_1 = require("../../../shared/services");
const utils_1 = require("../../../shared/utils");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const user_repository_1 = require("../repository/user.repository");
const generateToken_service_1 = require("./generateToken.service");
class verificationCodeService {
    static async verifyCode(email, code) {
        const user = await services_1.sharedServices.existUserByEmail(email);
        const isValid = (0, utils_1.hmacProcess)(Number(code)) === user.verificationCode;
        if (!isValid) {
            throw new AppError_1.default("Invalid verification code", 401, "invalid_code");
        }
        user.isVerified = true;
        user.verificationCode = null;
        await user_repository_1.userRepository.updateById(user._id, user);
        const tokens = await generateToken_service_1.generateTokenServices.generateToken(user);
        return tokens;
    }
}
exports.verificationCodeService = verificationCodeService;
