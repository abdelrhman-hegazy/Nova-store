import { updateProfileSchema } from "../../../shared/middleware";
import AppError from "../../../shared/utils/AppError";
import { updateProfileServices } from "../services/updateProfile.services";
import { Request, Response, NextFunction } from "express";

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const data = req.body;

        const updatedUser = await updateProfileServices.updateProfile(userId, data);
        res.status(200).json({
            status: "success",
            message: "Profile updated successfully",
            data: updatedUser
        });
    } catch (error) {
        next(new AppError((error as Error).message, 500, "ERROR_UPDATING_PROFILE"));
    }
};