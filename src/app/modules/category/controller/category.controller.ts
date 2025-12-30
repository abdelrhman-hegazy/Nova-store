import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../../shared/utils";
import { categoryRepository } from "../repository/category.repository";
import { uploadToCloudinary, deleteFromCloudinary } from "../../../shared/utils/cloudinary";
import AppError from "../../../shared/utils/AppError";
import { ICategory } from "../interface/category.interface";

export const addCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    if (!req.file) {
        return next(new AppError("No image file uploaded. Expecting field 'image' in multipart/form-data.", 400, "bad_request"));
    }
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
export const getAllCategorys = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category = await categoryRepository.findAll();
    res.status(200).json({
        status: "success",
        message: "Category fetched successfully",
        data: {
            category,
        },
    });
})
export const updateCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category = await categoryRepository.findById(req.params.id);
    if (!category) {
        return next(new AppError("Category not found", 404, "not_found"));
    }
    const { name } = req.body || {}
    let image;
    if (req.file) {
        image = await uploadToCloudinary(req.file as Express.Multer.File);
    }
    if (name || image) {
        if (name) {
            category.name = name;
        }
        if (image) {
            await deleteFromCloudinary(category.image.publicId);
            category.image = image;
        }
        const updatedCategory = await categoryRepository.updateById(req.params.id, category);
        return res.status(200).json({
            status: "success",
            message: "Category updated successfully",
            data: {
                category: updatedCategory
            },
        });
    }
    return next(new AppError("No Data Updated", 400, "bad_request"));
})
export const deleteCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const category: ICategory | null = await categoryRepository.findById(req.params.id);
    if (!category) {
        return next(new AppError("Category not found", 404, "not_found"));
    }

    await categoryRepository.deleteById(req.params.id);
    if (category.image.publicId) {
        await deleteFromCloudinary(category.image.publicId);
    }

    return res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
        data: {
            category,
        },
    });
})
