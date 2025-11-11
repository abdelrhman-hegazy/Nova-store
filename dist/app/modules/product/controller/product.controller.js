"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = void 0;
const product_repository_1 = require("../repository/product.repository");
const category_repository_1 = require("../repository/category.repository");
const utils_1 = require("../../../shared/utils");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const cloudinary_1 = require("../../../shared/utils/cloudinary");
const auth_service_1 = require("../../auth/services/auth.service");
exports.createProduct = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { id: userId } = req.user;
    const user = await (0, auth_service_1.existUserById)(userId);
    let files = req.files;
    const { body } = req;
    const category = await category_repository_1.categoryRepository.findById(body.categoryId);
    if (!category) {
        return next(new AppError_1.default("Category not found", 404, "NOT_FOUND"));
    }
    const finalPrice = body.discount
        ? body.price - (body.price * (body.discount / 100))
        : body.price;
    const uploadedImages = await (0, cloudinary_1.uploadMultipleToCloudinary)(files);
    const product = await product_repository_1.productRepository.create({
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
