"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFromCartServices = void 0;
const cart_repository_1 = require("../repository/cart.repository");
const services_1 = require("../../../shared/services");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const product_repository_1 = require("../../product/repository/product.repository");
class DeleteFromCartServices {
    static async deleteProduct(userId, productId) {
        const product = await services_1.sharedServices.existProductById(productId);
        await services_1.sharedServices.existUserById(userId);
        const cart = await services_1.sharedServices.existCartByUserId(userId);
        const productIndex = cart.products.findIndex((p) => p.product.productId.toString() === productId);
        if (productIndex === -1) {
            throw new AppError_1.default("Product Not Found In Cart", 404, "not_found");
        }
        cart.totalPrice = await this.totalPrice(cart.totalPrice, cart.products[productIndex].product.priceQuantity);
        product.stock += cart.products[productIndex].product.quantity;
        cart.products.splice(productIndex, 1);
        cart.updatedAt = new Date();
        const updatedCart = await cart_repository_1.cartRepository.updateById(cart._id, cart);
        await product_repository_1.productRepository.updateById(product._id, product);
        return updatedCart;
    }
    static async totalPrice(totalPrice, priceQuantity) {
        totalPrice -= priceQuantity;
        return totalPrice;
    }
}
exports.DeleteFromCartServices = DeleteFromCartServices;
