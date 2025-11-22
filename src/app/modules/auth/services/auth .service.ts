import AppError from "../../../shared/utils/AppError";
import { userRepository } from "../repository/user.repository";
import { refreshTokenRepository } from "../repository/refreshToken.repository";
import { generateToken } from "../../../shared/utils/jwt";

// export async function existUserByEmail(email: string) {
//     const user = await userRepository.findOne({ email })
//     if (!user) {
//         throw new AppError("User not found", 404, "not_found")
//     }
//     return user
// }

// export async function generateTokenServices(user: any) {
//     let tokens: { accessToken: string, refreshToken: string } | undefined
//     if (user.isAdmin) {
//         tokens = generateToken({ id: user._id, email: user.email, role: "vendor" }, "vendor")
//     }
//     else {
//         tokens = generateToken({ id: user._id, email: user.email, role: "customer" }, "customer")
//     }
//     if (!tokens) {
//         throw new AppError("Failed to generate tokens", 500, "token_generation_failed")
//     }
//     await userRepository.updateById(user._id, user)

//     const refreshPayload: any = { userId: user._id, token: tokens.refreshToken, expiresAt: 7 * 24 * 60 * 60 * 1000 };
//     if (!await refreshTokenRepository.findOne({ userId: user._id })) {
//         await refreshTokenRepository.create(refreshPayload)
//     }
//     else {
//         await refreshTokenRepository.updateOne({ userId: user._id }, refreshPayload)
//     }
//     return tokens
// }

export class AuthService {
    static async existUserByEmail(email: string) {
        const user = await userRepository.findOne({ email })
        if (!user) {
            throw new AppError("User not found", 404, "not_found")
        }
        return user
    }
    static async generateTokenServices(user: any) {
        let tokens: { accessToken: string, refreshToken: string } | undefined
        if (user.isAdmin) {
            tokens = generateToken({ id: user._id, email: user.email, role: "vendor" }, "vendor")
        }
        else {
            tokens = generateToken({ id: user._id, email: user.email, role: "customer" }, "customer")
        }
        if (!tokens) {
            throw new AppError("Failed to generate tokens", 500, "token_generation_failed")
        }
        await userRepository.updateById(user._id, user)

        const refreshPayload: any = { userId: user._id, token: tokens.refreshToken, expiresAt: 7 * 24 * 60 * 60 * 1000 };
        if (!await refreshTokenRepository.findOne({ userId: user._id })) {
            await refreshTokenRepository.create(refreshPayload)
        }
        else {
            await refreshTokenRepository.updateOne({ userId: user._id }, refreshPayload)
        }
        return tokens
    }    
}
