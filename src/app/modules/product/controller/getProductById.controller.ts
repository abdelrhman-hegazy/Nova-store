import { catchAsync } from "../../../shared/utils";
import { Request, Response, NextFunction } from "express";
import { GetProductByIdService } from "../services";
import { sharedServices } from "../../../shared/services";

export const getProductById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.id;
    await sharedServices.validateObjectId(productId)

    const result = await GetProductByIdService.getProductById(productId);

    res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: result
    });
});
