"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const utils_1 = require("../../../shared/utils");
const services_1 = require("../services");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
exports.loginUser = (0, utils_1.catchAsync)(async (req, res, next) => {
    try {
        let { email, isAdmin } = req.body;
        isAdmin = isAdmin === true;
        let result = await services_1.loginUserService.loginOrRegisterByEmail(email, isAdmin);
        if (result === "success") {
            res.status(200).json({
                status: "success",
                message: "Verification code sent to your email"
            });
        }
        else {
            next(new AppError_1.default("Unable to process your request", 500, "server_error"));
        }
    }
    catch (error) {
        next(new AppError_1.default("Unable to process your request", 500, "server_error"));
    }
});
