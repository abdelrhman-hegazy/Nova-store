"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../utils/AppError"));
class EmailService {
    transporter;
    verificationCode;
    constructor(verificationCode) {
        this.transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: config_1.default.EMAIL_USER,
                pass: config_1.default.EMAIL_PASSWORD
            },
            pool: true,
            maxConnections: 1,
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000
        });
        this.verificationCode = verificationCode;
    }
    async sendEmail(to, subject) {
        try {
            console.log("Attempting to send email");
            const mailOptions = {
                from: `"Nova Store Support" <${config_1.default.EMAIL_USER}>`,
                to,
                subject,
                html: this.verificationCodeTemplate(this.verificationCode)
            };
            await this.transporter.sendMail(mailOptions);
            console.log("email sent");
            return true;
        }
        catch (error) {
            console.log(error);
            throw new AppError_1.default("Failed to send verification code. Please try again later.", 500, "email_send_failure");
        }
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
