import { getProfileServices } from "../services/getProfile.services";
import AppError from "../../../shared/utils/AppError";
import { Request, Response, NextFunction } from "express";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const user = await getProfileServices.getProfile(userId);
        res.status(200).json({
            status: "success",
            message: "Profile fetched successfully",
            data: user
        });
    } catch (error) {
        next(new AppError((error as Error).message, 500, "ERROR_GETTING_PROFILE"));
    }
};