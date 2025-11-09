import { catchAsync } from "../../utils";
import { Request, Response, NextFunction } from "express";
import AppError from "../../utils/AppError";
import config from "../../config"
import jwt from "jsonwebtoken";




function identify(secretToken: string): (req: Request, res: Response, next: NextFunction) => void {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(
                new AppError("Unauthorized: No token provided", 401, "unauthorized")
            );
        }

        const token = authHeader.split(" ")[1];

        if (!secretToken) {
            return next(new AppError("JWT secret is not configured", 500, "configuration_error"));
        }

        jwt.verify(token, secretToken, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return next(new AppError("Token expired", 401, "token_expired"));
                }
                if (err.name === "JsonWebTokenError") {
                    return next(new AppError("Invalid token", 401, "invalid_token"));
                }

                return next(
                    new AppError(
                        "Token verification failed",
                        403,
                        "token_verification_failed"
                    )
                );
            }

            (req as any).user = decoded;
            next();
        });
    })

}
if (!config.ACCESS_TOKEN_SECRET_VENDOR || !config.ACCESS_TOKEN_SECRET_CUSTOM) {
    throw new AppError("JWT secrets are not configured", 500, "configuration_error");
}
export const identifyVendor = identify(config.ACCESS_TOKEN_SECRET_VENDOR);
export const identifyCustomer = identify(config.ACCESS_TOKEN_SECRET_CUSTOM);