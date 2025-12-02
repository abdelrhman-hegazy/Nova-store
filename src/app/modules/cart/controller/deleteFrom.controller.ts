import { Request, Response, NextFunction } from "express"
import { DeleteFromCartServices } from "../services"
import { catchAsync } from "../../../shared/utils"
import AppError from "../../../shared/utils/AppError"

export const deleteFromCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params
        const userId = (req as any).user.id

        if (!productId) {
            throw new AppError("should provide product id", 404, "BAD_REQUEST")
        }
        const data = await DeleteFromCartServices.deleteProduct(userId, productId)
        res.status(200).json({
            success: true,
            message: "Product deleted from cart",
            data
        })
    } catch (error) {
        next(error)
    }
})