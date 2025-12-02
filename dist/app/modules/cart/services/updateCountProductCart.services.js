"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCountProductCartServices = void 0;
const services_1 = require("../../../shared/services");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const product_repository_1 = require("../../product/repository/product.repository");
const cart_repository_1 = require("../repository/cart.repository");
const deleteFromCart_services_1 = require("./deleteFromCart.services");
class updateCountProductCartServices {
    static async updateCountProductCart(userId, productId, count) {
        if (count !== 1 && count !== -1) {
            throw new AppError_1.default("Count must be 1 or -1", 400, "BAD_REQUEST");
        }
        const cart = await services_1.sharedServices.existCartByUserId(userId);
        const product = await services_1.sharedServices.existProductById(productId);
        const productCart = cart.products.find((product) => product.productId.toString() === productId);
        if (!productCart) {
            throw new AppError_1.default("Product not found", 400, "NOT_FOUND");
        }
        if (productCart.quantity === 1 && count === -1) {
            return await deleteFromCart_services_1.DeleteFromCartServices.deleteProduct(userId, productId);
        }
        if (product.stock < 1 && count === 1) {
            throw new AppError_1.default("Product stock is not enough", 400, "BAD_REQUEST");
        }
        productCart.quantity += count;
        productCart.priceQuantity += count * product.price;
        cart.totalPrice = cart.totalPrice + count * product.price;
        product.stock += -count;
        const updatedCart = await cart_repository_1.cartRepository.updateById(cart._id, cart);
        await product_repository_1.productRepository.updateById(productId, product);
        return updatedCart;
    }
    ;
}
exports.updateCountProductCartServices = updateCountProductCartServices;
