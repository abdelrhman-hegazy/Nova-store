import { refreshTokenRepository } from "../repository/refreshToken.repository";
import { catchAsync } from "../../../shared/utils";
import { Request, Response, NextFunction } from "express";
import AppError from "../../../shared/utils/AppError";
import {generateTokenServices } from "../services/auth.service";
import config from "../../../shared/config"
import { sharedServices } from "../../../shared/services";


export const refreshTokenController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let isMobile = req.headers.client === "not-browser"
    const refreshToken = isMobile
        ? req.body.refreshToken?.split(" ")[1]
        : req.cookies.refreshToken?.split(" ")[1];

    const storedToken = await refreshTokenRepository.findOne({ token: refreshToken });
    if (!storedToken) {
        return next(new AppError("Invalid refresh token", 401, "invalid_token"));
    }
    const user = await sharedServices.existUserById(storedToken.userId.toString());
    let tokens: { accessToken: string, refreshToken: string } = await generateTokenServices(user)
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
    res.cookie("refreshToken", "Bearer " +tokens.refreshToken, {
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