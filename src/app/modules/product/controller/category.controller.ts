import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../../shared/utils";

import { categoryRepository } from "../repository/category.repository";
import { uploadToCloudinary } from "../../../shared/utils/cloudinary";


export const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const image = await uploadToCloudinary(req.file as Express.Multer.File);
    const category = await categoryRepository.create({ name, image });
    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: {
            category,
        },
    });
})