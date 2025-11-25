import { catchAsync } from "../../../shared/utils";
import { AddToCartService } from "../services/addToCart.services";
import { Request, Response, NextFunction } from "express";


export const addToCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId, quantity } = req.body
        const userId = (req as any).user.id
        const cart = await AddToCartService.addToCart(userId, productId, quantity)
        res.status(200).json({
            status: "success",
            data: cart
        })
    }
    catch (error) {
        next(error)
    }

})