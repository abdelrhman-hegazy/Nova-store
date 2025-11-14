import { catchAsync } from "../../../shared/utils";
import { Request, Response, NextFunction } from "express";
import { UpdateProductService } from "../services/updateProduct.services";

export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, description, price, discount, images } = req.body;
    const result = await UpdateProductService.updateProduct(id, { name, description, price, discount, images });
    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: result
    });
});
