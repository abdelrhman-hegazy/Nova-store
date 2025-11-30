import { getCartServices } from "../services"
import { Request, Response, NextFunction } from "express"
import { catchAsync } from "../../../shared/utils"
import { sharedServices } from "../../../shared/services";

export const getCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        await sharedServices.existUserById((req as any).user.id)
        const cart = await getCartServices.getCart(req.params.cartId);
        res.status(200).json({
            status: "success",
            data: cart
        });
    } catch (error) {
        next(error);
    }
});

