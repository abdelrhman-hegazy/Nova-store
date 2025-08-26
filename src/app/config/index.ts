import dotenv from "dotenv"

dotenv.config({debug:false})

export default {
    NODE_ENV: process.env.NODE_ENV || "production",
    port: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    HASHING_SECRET: process.env.HASHING_SECRET
}
