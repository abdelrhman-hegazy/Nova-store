import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../../shared/utils"
import { AddProductService } from "../services";
import { sharedServices } from "../../../shared/services";

export const addProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = (req as any).user
    const user = await sharedServices.existUserById(userId.toString())
    let files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const { body } = req;
    const result = await AddProductService.addProduct(body, files, user);
    res.status(201).json({
        status: "success",
        message: "Product added successfully",
        data: result
    });
});

