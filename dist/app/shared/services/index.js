"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedServices = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../utils/AppError"));
const product_repository_1 = require("../../modules/product/repository/product.repository");
const user_repository_1 = require("../../modules/auth/repository/user.repository");
class sharedServices {
    static async validateObjectId(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new AppError_1.default("Not valid id", 400, "BAD_REQUEST");
        }
    }
    static async existProductById(id) {
        const product = await product_repository_1.productRepository.findById(id);
        if (!product) {
            throw new AppError_1.default("Product not found", 404, "NOT_FOUND");
        }
        return product;
    }
    static async existUserById(userId) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new AppError_1.default("User No Found", 404, "NOT_FOUND");
        }
        return user;
    }
}
exports.sharedServices = sharedServices;
