import { catchAsync } from "../../../shared/utils";
import { Request, Response, NextFunction } from "express";
import config from "../../../shared/config"
import { refreshTokenService } from "../services";


export const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let isMobile = req.headers.client === "not-browser"
    const refreshToken = isMobile
        ? req.body.refreshToken?.split(" ")[1]
        : req.cookies.refreshToken?.split(" ")[1];

    const tokens: { accessToken: string, refreshToken: string } = await refreshTokenService.refreshTokens(refreshToken!);
    if (isMobile) {
        return res.status(200).json({
            status: "success",
            message: "Token refreshed successfully",
            tokens: {
                accessToken: "Bearer " + tokens.accessToken,
                refreshToken: "Bearer " + tokens.refreshToken
            }
        })
    }
    res.cookie("refreshToken", "Bearer " + tokens.refreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return res.status(200).json({
        status: "success",
        message: "Token refreshed successfully",
        tokens: {
            accessToken: "Bearer " + tokens.accessToken
        }
    })
})