import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/user.repository";
import { catchAsync, hmacProcess } from "../../../shared/utils"
import AppError from "../../../shared/utils/AppError";
import EmailService from "../../../shared/middleware/sendMail";


// @ desc    Login user or register user by email
// @ route   POST /api/v1/auth/login
// @ access  Public
export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let { email, isAdmin } = req.body
    isAdmin = isAdmin === true
    const user = await userRepository.findOne({ email })
    const code = Math.floor(100000 + Math.random() * 900000)
    const emailSent = await new EmailService(code).sendEmail(email, "Your Nova Store Verification Code");
    if (!emailSent) {
        return next(new AppError("Failed to send verification code. Please try again later.", 500, "email_send_failure"))
    }
    const hashedCode = hmacProcess(code)
    if (!user) {
        await userRepository.create({ email, isAdmin, verificationCode: hashedCode })
    } else {
        await userRepository.updateById(user._id, { isAdmin, verificationCode: hashedCode })
    }
    return res.status(200).json({
        status: "success",
        message: "Verification code sent successfully"
    })
})