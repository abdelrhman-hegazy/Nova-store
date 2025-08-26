import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import EmailService from "../middleware/sendMail";
import { hmacProcess } from "../utils/hashing";
import config from "../config";


export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    const user = await userRepository.findOne({ email })
    const code = Math.floor(100000 + Math.random() * 900000)
    new EmailService(code).sendEmail(email, "Login Notification");
    const hashedCode = hmacProcess(code, config.HASHING_SECRET as string)
    if (!user) {
        await userRepository.create({ email, verificationCode: hashedCode })
    } else {
        await userRepository.updateById(user._id, { verificationCode: hashedCode })
    }
    return res.status(200).json({
        status: "success",
        message: "Verification code sent successfully"
    })
})