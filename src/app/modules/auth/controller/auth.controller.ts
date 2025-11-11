import { Request, Response, NextFunction } from "express";
import { userRepository } from "../repository/user.repository";
import { catchAsync, hmacProcess } from "../../../shared/utils"
import AppError from "../../../shared/utils/AppError";
import EmailService from "../../../shared/middleware/sendMail";
import { existUserByEmail, generateTokenServices } from "../services/auth.service";
import config from "../../../shared/config";

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
// @ desc    Verify user by code
// @ route   POST /api/v1/auth/verify
// @ access  Public

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
        return res.cookie("refreshToken", "Bearer " + tokens.refreshToken, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        }).json({
            status: "success",
            message: "User verified successfully",
            tokens: {
                accessToken: "Bearer " + tokens.accessToken,
            }
        })
    }
})
