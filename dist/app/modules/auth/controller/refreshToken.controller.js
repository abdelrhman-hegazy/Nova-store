"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const utils_1 = require("../../../shared/utils");
const config_1 = __importDefault(require("../../../shared/config"));
const services_1 = require("../services");
exports.refreshToken = (0, utils_1.catchAsync)(async (req, res, next) => {
    let isMobile = req.headers.client === "not-browser";
    const refreshToken = isMobile
        ? req.body.refreshToken?.split(" ")[1]
        : req.cookies.refreshToken?.split(" ")[1];
    const tokens = await services_1.refreshTokenService.refreshTokens(refreshToken);
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
