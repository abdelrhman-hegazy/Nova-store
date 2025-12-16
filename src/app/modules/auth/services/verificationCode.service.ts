import { sharedServices } from "../../../shared/services";
import { hmacProcess } from "../../../shared/utils";
import AppError from "../../../shared/utils/AppError";
import { userRepository } from "../repository/user.repository";
import { generateTokenServices } from "./generateToken.service";


export class verificationCodeService {
    static async verifyCode(email: string, code: string) {
        const user = await sharedServices.existUserByEmail(email);
        const isValid = hmacProcess(Number(code)) === user.verificationCode;
        if (!isValid) {
            throw new AppError("Invalid verification code", 401, "invalid_code");
        }
        user.isVerified = true;
        user.verificationCode = null;
        await userRepository.updateById(user._id, user);
        const tokens: { accessToken: string, refreshToken: string } = await generateTokenServices.generateToken(user);
        return tokens;
    }

}