import nodemailer from "nodemailer";
import config from "../config";

class EmailService {
    private transporter;
    private verificationCode: number;
    static sendEmail: any;
    constructor(verificationCode: number) {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASSWORD
            }
        });
        this.verificationCode = verificationCode;
    }

    public async sendEmail(to: string, subject: string): Promise<void> {
        const mailOptions = {
            from: `"Nova Store Support" <${config.EMAIL_USER}>`,
            to,
            subject,
            html: this.verificationCodeTemplate(this.verificationCode)
        };
        await this.transporter.sendMail(mailOptions);
    }
    private verificationCodeTemplate(verificationCode: number): string {
        return `
    <div style="font-family: sans-serif; line-height: 1.5; padding: 20px; background-color: #f8f8f8; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
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

export default EmailService;
