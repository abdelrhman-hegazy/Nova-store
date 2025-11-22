"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const refreshToken_repository_1 = require("../repository/refreshToken.repository");
const utils_1 = require("../../../shared/utils");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const auth__service_1 = require("../services/auth .service");
const config_1 = __importDefault(require("../../../shared/config"));
const services_1 = require("../../../shared/services");
exports.refreshTokenController = (0, utils_1.catchAsync)(async (req, res, next) => {
    let isMobile = req.headers.client === "not-browser";
    const refreshToken = isMobile
        ? req.body.refreshToken?.split(" ")[1]
        : req.cookies.refreshToken?.split(" ")[1];
    const storedToken = await refreshToken_repository_1.refreshTokenRepository.findOne({ token: refreshToken });
    if (!storedToken) {
        return next(new AppError_1.default("Invalid refresh token", 401, "invalid_token"));
    }
    const user = await services_1.sharedServices.existUserById(storedToken.userId.toString());
    let tokens = await auth__service_1.AuthService.generateTokenServices(user);
    if (isMobile) {
        return res.status(200).json({
            status: "success",
            message: "Token refreshed successfully",
            tokens: {
                accessToken: "Bearer " + tokens.accessToken,
                refreshToken: "Bearer " + tokens.refreshToken
            }
        });
    }
    res.cookie("refreshToken", "Bearer " + tokens.refreshToken, {
        httpOnly: true,
        secure: config_1.default.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
        status: "success",
        message: "Token refreshed successfully",
        tokens: {
            accessToken: "Bearer " + tokens.accessToken
        }
    });
});
