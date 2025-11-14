"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductService = void 0;
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const product_repository_1 = require("../repository/product.repository");
class UpdateProductService {
    static async updateProduct(id, data) {
        const product = await product_repository_1.productRepository.findById(id);
        if (!product) {
            throw new AppError_1.default("Product not found", 404, "NOT_FOUND");
        }
        return product_repository_1.productRepository.updateOne({ _id: id }, data);
    }
}
exports.UpdateProductService = UpdateProductService;
