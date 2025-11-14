"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductByIdService = void 0;
const product_repository_1 = require("../repository/product.repository");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
class GetProductByIdService {
    static async getProductById(id) {
        const product = await product_repository_1.productRepository.getProductById(id);
        if (!product) {
            throw new AppError_1.default("Product not found", 404, "NOT_FOUND");
        }
        return product;
    }
}
exports.GetProductByIdService = GetProductByIdService;
