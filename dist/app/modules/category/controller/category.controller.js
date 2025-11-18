"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getAllCategorys = exports.addCategory = void 0;
const utils_1 = require("../../../shared/utils");
const category_repository_1 = require("../repository/category.repository");
const cloudinary_1 = require("../../../shared/utils/cloudinary");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
exports.addCategory = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { name } = req.body;
    if (!req.file) {
        return next(new AppError_1.default("No image file uploaded. Expecting field 'image' in multipart/form-data.", 400, "bad_request"));
    }
    const image = await (0, cloudinary_1.uploadToCloudinary)(req.file);
    const category = await category_repository_1.categoryRepository.create({ name, image });
    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: {
            category,
        },
    });
});
exports.getAllCategorys = (0, utils_1.catchAsync)(async (req, res, next) => {
    const category = await category_repository_1.categoryRepository.findAll();
    res.status(200).json({
        status: "success",
        message: "Category fetched successfully",
        data: {
            category,
        },
    });
});
exports.updateCategory = (0, utils_1.catchAsync)(async (req, res, next) => {
    const category = await category_repository_1.categoryRepository.findById(req.params.id);
    if (!category) {
        return next(new AppError_1.default("Category not found", 404, "not_found"));
    }
    const { name } = req.body || {};
    let image;
    if (req.file) {
        image = await (0, cloudinary_1.uploadToCloudinary)(req.file);
    }
    if (name || image) {
        if (name) {
            category.name = name;
        }
        if (image) {
            await (0, cloudinary_1.deleteFromCloudinary)(category.image.publicId);
            category.image = image;
        }
        const updatedCategory = await category_repository_1.categoryRepository.updateById(req.params.id, category);
        return res.status(200).json({
            status: "success",
            message: "Category updated successfully",
            data: {
                category: updatedCategory
            },
        });
    }
    return next(new AppError_1.default("No Data Updated", 400, "bad_request"));
});
exports.deleteCategory = (0, utils_1.catchAsync)(async (req, res, next) => {
    const category = await category_repository_1.categoryRepository.findById(req.params.id);
    if (!category) {
        return next(new AppError_1.default("Category not found", 404, "not_found"));
    }
    await category_repository_1.categoryRepository.deleteById(req.params.id);
    await (0, cloudinary_1.deleteFromCloudinary)(category.image.publicId);
    return res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
        data: {
            category,
        },
    });
});
