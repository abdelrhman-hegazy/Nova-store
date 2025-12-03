import AppError from "../../../shared/utils/AppError";
import { userRepository } from "../../auth/repository/user.repository";

export class getProfileServices {
    static async getProfile(userId: string) {
        try {
            const user = await userRepository.findById(userId);
            return user;
        } catch (error) {
            throw new AppError((error as Error).message, 500, "SERVER_ERROR");
        }
    }
}