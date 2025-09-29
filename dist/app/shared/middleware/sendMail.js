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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
class EmailService {
    constructor(verificationCode) {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: config_1.default.EMAIL_USER,
                pass: config_1.default.EMAIL_PASSWORD
            }
        });
        this.verificationCode = verificationCode;
    }
    sendEmail(to, subject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailOptions = {
                    from: `"Nova Store Support" <${config_1.default.EMAIL_USER}>`,
                    to,
                    subject,
                    html: this.verificationCodeTemplate(this.verificationCode)
                };
                yield this.transporter.verify();
                yield this.transporter.sendMail(mailOptions);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    verificationCodeTemplate(verificationCode) {
        return `
    <div style="font-family: sans-serif; line-height: 1.5; padding: 20px; background-color: #f8f8f8; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2x 8px rgba(0, 0, 0, 0.05);">
        <h2 style="color: #7f4cafff;">Welcome to Nova Store</h2>
        <p style="font-size: 16px;">Your verification code is:</p>
        <h1 style="font-size: 32px; color: #7f4cafff; letter-spacing: 2px;">${verificationCode}</h1>
        <p style="font-size: 14px; color: #888;">This code will expire in 3 minutes.</p>
        <p style="font-size: 14px;">If you did not request this code, you can safely ignore this email.</p>
        <br />
        <hr style="border: none; border-top: 1px solid #eee;" />
        <small style="font-size: 12px; color: #aaa;">Nova Store Team • Please do not reply to this email</small>
      </div>
    </div>
  `;
    }
}
exports.default = EmailService;
