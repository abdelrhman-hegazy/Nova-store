"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductService = void 0;
const product_repository_1 = require("../repository/product.repository");
class DeleteProductService {
    static async deleteProduct(id) {
        const product = await product_repository_1.productRepository.deleteById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return "Product deleted successfully";
    }
}
exports.DeleteProductService = DeleteProductService;
