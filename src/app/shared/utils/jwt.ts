import jwt from "jsonwebtoken";
import config from "../config"

export const generateToken = (payload: object, typeUser: string) => {
    if (typeUser === "Custom") {
        return {
            accessToken: jwt.sign(payload, config.ACCESS_TOKEN_SECRET_CUSTOM as string, { expiresIn: "15m" }),
            refreshToken: jwt.sign(payload, config.REFRESH_TOKEN_SECRET_CUSTOM as string, { expiresIn: "15d" })
        }
    }
    else if (typeUser === "vendor") {
        return {
            accessToken: jwt.sign(payload, config.ACCESS_TOKEN_SECRET_VENDOR as string, { expiresIn: "15m" }),
            refreshToken: jwt.sign(payload, config.REFRESH_TOKEN_SECRET_VENDOR as string, { expiresIn: "15d" })
        }
    }
}
