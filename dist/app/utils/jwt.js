"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const generateToken = (payload, typeUser) => {
    if (typeUser === "Custom") {
        return {
            accessToken: jsonwebtoken_1.default.sign(payload, config_1.default.ACCESS_TOKEN_SECRET_CUSTOM, { expiresIn: "15m" }),
            refreshToken: jsonwebtoken_1.default.sign(payload, config_1.default.REFRESH_TOKEN_SECRET_CUSTOM, { expiresIn: "15d" })
        };
    }
    else if (typeUser === "vendor") {
        return {
            accessToken: jsonwebtoken_1.default.sign(payload, config_1.default.ACCESS_TOKEN_SECRET_VENDOR, { expiresIn: "15m" }),
            refreshToken: jsonwebtoken_1.default.sign(payload, config_1.default.REFRESH_TOKEN_SECRET_VENDOR, { expiresIn: "15d" })
        };
    }
};
exports.generateToken = generateToken;
