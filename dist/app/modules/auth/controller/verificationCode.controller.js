"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationCode = void 0;
const utils_1 = require("../../../shared/utils");
const config_1 = __importDefault(require("../../../shared/config"));
const services_1 = require("../services");
exports.verificationCode = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { email, code } = req.body;
    let isMobile = req.headers.client === "not-browser";
    const tokens = await services_1.verificationCodeService.verifyCode(email, code);
    if (isMobile) {
        return res.status(200).json({
            status: "success",
            message: "User verified successfully",
            tokens: {
                accessToken: "Bearer " + tokens.accessToken,
                refreshToken: "Bearer " + tokens.refreshToken
            }
        });
    }
    else {
        return res.cookie("refreshToken", "Bearer " + tokens.refreshToken, {
            httpOnly: true,
            secure: config_1.default.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).json({
            status: "success",
            message: "User verified successfully",
            tokens: {
                accessToken: "Bearer " + tokens.accessToken,
            }
        });
    }
});
