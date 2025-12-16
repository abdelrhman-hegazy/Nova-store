"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenService = void 0;
const services_1 = require("../../../shared/services");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const refreshToken_repository_1 = require("../repository/refreshToken.repository");
const generateToken_service_1 = require("./generateToken.service");
class refreshTokenService {
    static async refreshTokens(refreshToken) {
        const storedToken = await refreshToken_repository_1.refreshTokenRepository.findOne({ token: refreshToken });
        if (!storedToken) {
            throw (new AppError_1.default("Invalid refresh token", 401, "invalid_token"));
        }
        const user = await services_1.sharedServices.existUserById(storedToken.userId.toString());
        let tokens = await generateToken_service_1.generateTokenServices.generateToken(user);
        return tokens;
    }
}
exports.refreshTokenService = refreshTokenService;
