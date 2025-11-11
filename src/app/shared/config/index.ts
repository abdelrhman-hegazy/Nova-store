import dotenv from "dotenv"
import { uploadToCloudinary } from "../utils/cloudinary"

dotenv.config({ debug: false })

export default {
    NODE_ENV: process.env.NODE_ENV || "production",
    port: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    HASHING_SECRET: process.env.HASHING_SECRET,
    ACCESS_TOKEN_SECRET_CUSTOM: process.env.ACCESS_TOKEN_SECRET_CUSTOM,
    REFRESH_TOKEN_SECRET_CUSTOM: process.env.REFRESH_TOKEN_SECRET_CUSTOM,
    ACCESS_TOKEN_SECRET_VENDOR: process.env.ACCESS_TOKEN_SECRET_VENDOR,
    REFRESH_TOKEN_SECRET_VENDOR: process.env.REFRESH_TOKEN_SECRET_VENDOR,
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        apiKey: process.env.CLOUDINARY_API_KEY
    }
}
