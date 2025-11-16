import { getAllFavouriteServices } from "../services/getAllFavourite.services";
import { catchAsync } from "../../../shared/utils";
import { Request, Response, NextFunction } from "express";

export const getAllFavourite = catchAsync(async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const favouriteProducts = await getAllFavouriteServices.getAllFavouriteServices(userId);
    res.status(200).json({ message: favouriteProducts, status: 200 });
})
