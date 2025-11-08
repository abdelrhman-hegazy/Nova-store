"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenServices = exports.existUserByEmail = void 0;
const AppError_1 = __importDefault(require("../../shared/utils/AppError"));
const auth_repository_1 = require("./repository/auth.repository");
const refreshToken_repository_1 = require("./repository/refreshToken.repository");
const jwt_1 = require("../../shared/utils/jwt");
async function existUserByEmail(email) {
    const user = await auth_repository_1.userRepository.findOne({ email });
    if (!user) {
        throw new AppError_1.default("User not found", 404, "not_found");
    }
    return user;
}
exports.existUserByEmail = existUserByEmail;
async function generateTokenServices(user) {
    let tokens;
    if (user.isAdmin) {
        tokens = (0, jwt_1.generateToken)({ id: user._id, email: user.email }, "vendor");
    }
    else {
        tokens = (0, jwt_1.generateToken)({ id: user._id, email: user.email }, "Custom");
    }
    if (!tokens) {
        throw new AppError_1.default("Failed to generate tokens", 500, "token_generation_failed");
    }
    await auth_repository_1.userRepository.updateById(user._id, user);
    if (!await refreshToken_repository_1.refreshTokenRepository.findOne({ userId: user._id })) {
        await refreshToken_repository_1.refreshTokenRepository.create({ userId: user._id, token: tokens.refreshToken });
    }
    else {
        await refreshToken_repository_1.refreshTokenRepository.updateOne({ userId: user._id }, { token: tokens.refreshToken });
    }
    return tokens;
}
exports.generateTokenServices = generateTokenServices;
