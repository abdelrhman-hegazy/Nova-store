import { Request, Response, NextFunction } from "express";
import { userRepository } from "./repository/user.repository";
import { catchAsync, hmacProcess } from "../../shared/utils"
import AppError from "../../shared/utils/AppError";
import EmailService from "../../shared/middleware/sendMail";

import { existUserByEmail, generateTokenServices } from "./auth.service";
export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body

    const user = await userRepository.findOne({ email })

    const code = Math.floor(100000 + Math.random() * 900000)
    const emailSent = await new EmailService(code).sendEmail(email, "Your Nova Store Verification Code");

    if (!emailSent) {
        return next(new AppError("Failed to send verification code. Please try again later.", 500, "email_send_failure"))
    }
    const hashedCode = hmacProcess(code)
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

export const verificationCode = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, code } = req.body
    let isMobile = req.headers.client === "not-browser"
    const user = await existUserByEmail(email)
    const isValid = hmacProcess(code) === user.verificationCode
    if (!isValid) {
        return next(new AppError("Invalid verification code", 401, "invalid_code"))
    }
    user.isVerified = true
    user.verificationCode = null
    await userRepository.updateById(user._id, user)
    let tokens: { accessToken: string, refreshToken: string } = await generateTokenServices(user)
    if (isMobile) {
        return res.status(200).json({
            status: "success",
            message: "User verified successfully",
            tokens: {
                accessToken: "Bearer " + tokens.accessToken,
                refreshToken: "Bearer " + tokens.refreshToken
            }
        })
    }
    else {
        return res.cookie("Authorization", "Bearer " + tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }).json({
            status: "success",
            message: "User verified successfully",
            accessToken: "Bearer " + tokens.accessToken
        })
    }
})
