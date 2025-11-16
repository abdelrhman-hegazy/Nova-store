import { Request, Response } from "express";
import { FavouriteServices } from "../services/toggleFavourite.services";
import { catchAsync } from "../../../shared/utils";

export const toggleFavourite = catchAsync(async (req: Request, res: Response) => {
    const { productId } = req.params;
    const userId = (req as any).user.id;
    const favorite = await FavouriteServices.toggleFavouriteServices(userId, productId);
    res.status(200).json({ message: favorite, status: 200 });
})
