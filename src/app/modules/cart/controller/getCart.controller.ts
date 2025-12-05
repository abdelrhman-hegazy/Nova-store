import { getCartServices } from "../services"
import { Request, Response, NextFunction } from "express"
import { catchAsync } from "../../../shared/utils"

export const getCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id
        const cart = await getCartServices.getCart(userId);
        res.status(200).json({
            status: "success",
            data: cart
        });
    } catch (error) {
        next(error);
    }
});

