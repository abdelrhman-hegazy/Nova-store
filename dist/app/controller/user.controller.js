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
exports.loginUser = void 0;
const repository_1 = require("../repository");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendMail_1 = __importDefault(require("../middleware/sendMail"));
const hashing_1 = require("../utils/hashing");
const config_1 = __importDefault(require("../config"));
exports.loginUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield repository_1.userRepository.findOne({ email });
    const code = Math.floor(100000 + Math.random() * 900000);
    new sendMail_1.default(code).sendEmail(email, "Login Notification");
    const hashedCode = (0, hashing_1.hmacProcess)(code, config_1.default.HASHING_SECRET);
    if (!user) {
        yield repository_1.userRepository.create({ email, verificationCode: hashedCode });
    }
    else {
        yield repository_1.userRepository.updateById(user._id, { verificationCode: hashedCode });
    }
    return res.status(200).json({
        status: "success",
        message: "Verification code sent successfully"
    });
}));
