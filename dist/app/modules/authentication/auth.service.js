"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existUserByEmail = existUserByEmail;
exports.generateTokenServices = generateTokenServices;
const AppError_1 = __importDefault(require("../../shared/utils/AppError"));
const auth_repository_1 = require("./repository/auth.repository");
const refreshToken_repository_1 = require("./repository/refreshToken.repository");
const jwt_1 = require("../../shared/utils/jwt");
function existUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield auth_repository_1.userRepository.findOne({ email });
        if (!user) {
            throw new AppError_1.default("User not found", 404, "not_found");
        }
        return user;
    });
}
function generateTokenServices(user) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield auth_repository_1.userRepository.updateById(user._id, user);
        if (!(yield refreshToken_repository_1.refreshTokenRepository.findOne({ userId: user._id }))) {
            yield refreshToken_repository_1.refreshTokenRepository.create({ userId: user._id, token: tokens.refreshToken });
        }
        else {
            yield refreshToken_repository_1.refreshTokenRepository.updateOne({ userId: user._id }, { token: tokens.refreshToken });
        }
        return tokens;
    });
}
