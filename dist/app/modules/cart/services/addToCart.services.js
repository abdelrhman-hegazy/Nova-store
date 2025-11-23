"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToCartService = void 0;
const services_1 = require("../../../shared/services");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const product_repository_1 = require("../../product/repository/product.repository");
const cart_repository_1 = require("../repository/cart.repository");
class AddToCartService {
    static async addToCart(userId, productId, quantity) {
        if (!userId || !productId || !quantity) {
            throw new AppError_1.default("Missing required fields", 400, "BAD_REQUEST");
        }
        const user = await services_1.sharedServices.existUserById(userId);
        const product = await services_1.sharedServices.existProductById(productId);
        const cartModel = await cart_repository_1.cartRepository.findOne({ userId });
        let cart;
        let totalPrice = 0;
        let priceQuantity = 0;
        if (!cartModel) {
            priceQuantity = product.finalPrice * quantity;
            totalPrice = priceQuantity;
            if (product.stock < quantity) {
                throw new AppError_1.default("Not enough stock", 400, "BAD_REQUEST");
            }
            product.stock -= quantity;
            await product_repository_1.productRepository.updateById(product._id, product);
            cart = await cart_repository_1.cartRepository.create({
                userId: user._id,
                products: [{
                        productId: product._id,
                        quantity,
                        priceQuantity
                    }],
                totalPrice
            });
            return cart;
        }
        else {
            const productInCart = cartModel.products.find(p => p.productId.toString() === productId);
            if (!productInCart) {
                const { priceQuantity, totalPrice } = await this.countPrice(product.finalPrice, quantity, cartModel.totalPrice);
                if (product.stock < quantity) {
                    throw new AppError_1.default("Not enough stock", 400, "BAD_REQUEST");
                }
                product.stock -= quantity;
                await product_repository_1.productRepository.updateById(product._id, product);
                cartModel.products.push({
                    productId: product._id,
                    quantity,
                    priceQuantity
                });
                cartModel.totalPrice += priceQuantity;
                cart = await cart_repository_1.cartRepository.updateById(cartModel._id, cartModel);
            }
            if (productInCart) {
                throw new AppError_1.default("Product already in cart", 400, "BAD_REQUEST");
            }
            return cart;
        }
    }
    static async countPrice(productFinalPrice, quantity, totalPrice = 0) {
        let priceQuantity = productFinalPrice * quantity;
        totalPrice += priceQuantity;
        return { priceQuantity, totalPrice };
    }
}
exports.AddToCartService = AddToCartService;
