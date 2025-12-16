import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../../shared/utils"
import { loginUserService } from "../services";
import AppError from "../../../shared/utils/AppError";

// @ desc    Login user or register user by email
// @ route   POST /api/v1/auth/login
// @ access  Public

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { email, isAdmin } = req.body
        isAdmin = isAdmin === true
        let result = await loginUserService.loginOrRegisterByEmail(email, isAdmin)
        if (result === "success") {
            res.status(200).json({
                status: "success",
                message: "Verification code sent to your email"
            })
        } else {
            next(new AppError("Unable to process your request", 500, "server_error"))
        }
    } catch (error) {
        next(new AppError("Unable to process your request", 500, "server_error"))
    }
})