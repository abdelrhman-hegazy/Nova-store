import { sharedServices } from "../../../shared/services";
import AppError from "../../../shared/utils/AppError";
import { refreshTokenRepository } from "../repository/refreshToken.repository";
import { generateTokenServices } from "./generateToken.service";


export class refreshTokenService {
    static async refreshTokens(refreshToken: string) {

        const storedToken = await refreshTokenRepository.findOne({ token: refreshToken });
        if (!storedToken) {
            throw (new AppError("Invalid refresh token", 401, "invalid_token"));
        }
        const user = await sharedServices.existUserById(storedToken.userId.toString());
        let tokens: { accessToken: string, refreshToken: string } = await generateTokenServices.generateToken(user)
        return tokens;

    }
}