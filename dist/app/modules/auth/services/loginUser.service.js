"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = void 0;
const sendMail_1 = __importDefault(require("../../../shared/middleware/sendMail"));
const services_1 = require("../../../shared/services");
const utils_1 = require("../../../shared/utils");
const user_repository_1 = require("../repository/user.repository");
class loginUserService {
    static async loginOrRegisterByEmail(email, isAdmin) {
        const user = await services_1.sharedServices.existUserByEmail(email);
        const code = Math.floor(100000 + Math.random() * 900000);
        console.log(`code: ${code}, email: ${email}, isAdmin: ${isAdmin}`);
        const emailSent = await new sendMail_1.default(code).sendEmail(email, "Your Nova Store Verification Code");
        console.log("emailSent", emailSent);
        const hashedCode = (0, utils_1.hmacProcess)(code);
        if (!user) {
            await user_repository_1.userRepository.create({ email, isAdmin, verificationCode: hashedCode });
        }
        else {
            await user_repository_1.userRepository.updateById(user._id, { isAdmin, verificationCode: hashedCode });
        }
        return "success";
    }
}
exports.loginUserService = loginUserService;
