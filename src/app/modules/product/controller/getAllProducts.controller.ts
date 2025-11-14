// controllers/product.controller.ts
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../../shared/utils";
import { ProductService } from "../services/getAllProducts.services";
import { Types } from "mongoose";

export const getAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const rawUserId: string | undefined = (req as any).user?.id;
    const userId = rawUserId && Types.ObjectId.isValid(rawUserId) ? new Types.ObjectId(rawUserId) : undefined;

    const result = await ProductService.getProducts(req.query, userId);

    res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: result
    });
});