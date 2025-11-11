import { Request, Response, NextFunction } from "express";
import { productRepository } from "../repository/product.repository";
import { categoryRepository } from "../repository/category.repository";
import { catchAsync } from "../../../shared/utils"
import AppError from "../../../shared/utils/AppError";
import { uploadMultipleToCloudinary } from "../../../shared/utils/cloudinary";
import { existUserById } from "../../auth/services/auth.service";

export const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = (req as any).user
    const user = await existUserById(userId)
    let files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const { body } = req;
    const category = await categoryRepository.findById(body.categoryId);
    if (!category) {
        return next(new AppError("Category not found", 404, "NOT_FOUND"));
    }

    const finalPrice = body.discount
        ? body.price - (body.price * (body.discount / 100))
        : body.price;

    const uploadedImages = await uploadMultipleToCloudinary(files);
    const product = await productRepository.create({
        name: body.name,
        details: body.details,
        price: body.price,
        discount: body.discount || 0,
        finalPrice: finalPrice,
        categoryId: category._id,
        userId: user._id,
        images: uploadedImages
    });
    res.status(201).json({
        status: "success",
        data: {
            product,
        },
    });
});