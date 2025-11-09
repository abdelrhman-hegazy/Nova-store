import { Request, Response, NextFunction } from "express";
import { productRepository } from "./repository/product.repository";
import { catchAsync } from "../../shared/utils"
import AppError from "../../shared/utils/AppError";

export const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const product = await productRepository.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            product,
        },
    });
});