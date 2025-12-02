import { sharedServices } from "../../../shared/services";
import { updateCountProductCartServices } from "../services/updateCountProductCart.services";
import { Request, Response, NextFunction } from "express";

export const updateCountProductCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { count } = req.body;
        const { productId } = req.params;
        const userId = (req as any).user.id;
        await sharedServices.existUserById(userId);
        const updatedCart = await updateCountProductCartServices.updateCountProductCart(userId, productId, count);
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error);
    }
};