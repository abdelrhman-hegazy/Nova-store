import { catchAsync } from "../../../shared/utils";
import { Request, Response, NextFunction } from "express";
import { UpdateProductService } from "../services";

export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const { name, categoryId, price, discount, stock, details } = req.body;
    const result = await UpdateProductService.updateProduct(id, { name, categoryId, price, discount, stock, details, images: files || [] });
    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: result
    });
});
