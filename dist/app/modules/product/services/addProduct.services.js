"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductService = void 0;
const product_repository_1 = require("../repository/product.repository");
const category_repository_1 = require("../../category/repository/category.repository");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const cloudinary_1 = require("../../../shared/utils/cloudinary");
class AddProductService {
    static async addProduct(body, files, user) {
        const category = await category_repository_1.categoryRepository.findById(body.categoryId);
        if (!category) {
            throw new AppError_1.default("Category not found", 404, "NOT_FOUND");
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
            stock: body.stock || 1,
            categoryId: category._id,
            userId: user._id,
            images: uploadedImages
        });
        return product;
    }
}
exports.AddProductService = AddProductService;
