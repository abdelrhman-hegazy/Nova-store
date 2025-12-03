import AppError from "../../../shared/utils/AppError";
import { sharedServices } from "../../../shared/services";
import { userRepository } from "../../auth/repository/user.repository";


export class updateProfileServices {

    static async updateProfile(userId: string, data: any) {
        try {
            await sharedServices.existUserById(userId);
            const updatedUser = await userRepository.updateById(userId, data);
            return updatedUser;
        } catch (error) {
            throw new AppError((error as Error).message || "Error updating profile", 500, "ERROR_UPDATING_PROFILE");
        }
    }

}
