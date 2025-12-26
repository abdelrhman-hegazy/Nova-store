import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../../shared/utils"
import config from "../../../shared/config";
import { verificationCodeService } from "../services";

// @ desc    Verify user by code
// @ route   POST /api/v1/auth/verify
// @ access  Public

export const verificationCode = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, code } = req.body
    let isMobile = req.headers.client === "not-browser"
    const tokens: { accessToken: string, refreshToken: string } = await verificationCodeService.verifyCode(email, code)
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
