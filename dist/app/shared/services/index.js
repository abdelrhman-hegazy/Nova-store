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
const cart_repository_1 = require("../../modules/cart/repository/cart.repository");
class sharedServices {
    static async existUserByEmail(email) {
        const user = await user_repository_1.userRepository.findOne({ email });
        if (!user) {
            throw new AppError_1.default("User Not Found", 404, "NOT_FOUND");
        }
        return user;
    }
    static async validateObjectId(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new AppError_1.default("Not Valid Id", 400, "BAD_REQUEST");
        }
    }
    static async existProductById(id) {
        const product = await product_repository_1.productRepository.findById(id);
        if (!product) {
            throw new AppError_1.default("Product Not Found", 404, "NOT_FOUND");
        }
        return product;
    }
    static async existUserById(userId) {
        const user = await user_repository_1.userRepository.findById(userId);
        if (!user) {
            throw new AppError_1.default("User Not Found", 404, "NOT_FOUND");
        }
        return user;
    }
    static async exitCartById(cartId) {
        const cart = await cart_repository_1.cartRepository.findById(cartId);
        if (!cart) {
            throw new AppError_1.default("Cart Not Found", 404, "NOT_FOUND");
        }
        return cart;
    }
    static async existCartByUserId(userId) {
        const cart = await cart_repository_1.cartRepository.findOne({ userId });
        if (!cart) {
            throw new AppError_1.default("Cart Not Found", 404, "NOT_FOUND");
        }
        return cart;
    }
}
exports.sharedServices = sharedServices;
