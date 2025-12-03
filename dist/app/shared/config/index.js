"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ debug: false });
exports.default = {
    NODE_ENV: process.env.NODE_ENV || "production",
    port: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    HASHING_SECRET: process.env.HASHING_SECRET,
    email: {
        SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    },
    token: {
        ACCESS_TOKEN_SECRET_CUSTOM: process.env.ACCESS_TOKEN_SECRET_CUSTOM,
        REFRESH_TOKEN_SECRET_CUSTOM: process.env.REFRESH_TOKEN_SECRET_CUSTOM,
        ACCESS_TOKEN_SECRET_VENDOR: process.env.ACCESS_TOKEN_SECRET_VENDOR,
        REFRESH_TOKEN_SECRET_VENDOR: process.env.REFRESH_TOKEN_SECRET_VENDOR,
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        apiKey: process.env.CLOUDINARY_API_KEY
    },
    payment: {
        PAYMOP_API_KEY: process.env.PAYMOP_API_KEY,
        PAYMOP_INTEGRATION_ID: process.env.PAYMOP_INTEGRATION_ID,
        PAYMOP_API_URL: process.env.PAYMOP_API_URL,
        PAYMOB_IFRAME_ID: process.env.PAYMOB_IFRAME_ID,
        PAYMOB_SECRET_KEY: process.env.PAYMOB_SECRET_KEY,
        PAYMOB_HMAC_SECRET: process.env.PAYMOB_HMAC_SECRET
    }
};
