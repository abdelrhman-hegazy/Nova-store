"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedServices = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../utils/AppError"));
const product_repository_1 = require("../../modules/product/repository/product.repository");
class sharedServices {
    static async validateObjectId(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new AppError_1.default("Invalid ID", 400, "BAD_REQUEST");
        }
    }
    static async existingProduct(id) {
        const product = await product_repository_1.productRepository.findById(id);
        if (!product) {
            throw new AppError_1.default("Product not found", 404, "NOT_FOUND");
        }
        return product;
    }
}
exports.sharedServices = sharedServices;
