"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const user_repository_1 = require("../repository/user.repository");
const utils_1 = require("../../../shared/utils");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const sendMail_1 = __importDefault(require("../../../shared/middleware/sendMail"));
exports.loginUser = (0, utils_1.catchAsync)(async (req, res, next) => {
    let { email, isAdmin } = req.body;
    isAdmin = isAdmin === true;
    const user = await user_repository_1.userRepository.findOne({ email });
    const code = Math.floor(100000 + Math.random() * 900000);
    const emailSent = await new sendMail_1.default(code).sendEmail(email, "Your Nova Store Verification Code");
    if (!emailSent) {
        return next(new AppError_1.default("Failed to send verification code. Please try again later.", 500, "email_send_failure"));
    }
    const hashedCode = (0, utils_1.hmacProcess)(code);
    if (!user) {
        await user_repository_1.userRepository.create({ email, isAdmin, verificationCode: hashedCode });
    }
    else {
        await user_repository_1.userRepository.updateById(user._id, { isAdmin, verificationCode: hashedCode });
    }
    return res.status(200).json({
        status: "success",
        message: "Verification code sent successfully"
    });
});
