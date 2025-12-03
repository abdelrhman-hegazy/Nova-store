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
        if (!cartModel) {
            const { priceQuantity, totalPrice } = await this.countPrice(product.finalPrice, quantity);
            await this.inStock(product, quantity);
            const cart = await cart_repository_1.cartRepository.create({
                userId: user._id,
                products: [{
                        product: {
                            productId: product._id,
                            quantity,
                            priceQuantity,
                            name: product.name,
                            description: product.details,
                            image: product.images[0].url,
                        }
                    }],
                totalPrice
            });
            return cart;
        }
        else {
            let cart;
            const productInCart = cartModel.products.find(p => p.product.productId.toString() === productId);
            if (!productInCart) {
                const { priceQuantity, totalPrice } = await this.countPrice(product.finalPrice, quantity, cartModel.totalPrice);
                await this.inStock(product, quantity);
                cartModel.products.push({
                    product: {
                        productId: product._id,
                        quantity,
                        priceQuantity,
                        name: product.name,
                        description: product.details,
                        image: product.images[0].url,
                    }
                });
                cartModel.totalPrice = totalPrice;
                cart = await cart_repository_1.cartRepository.updateById(cartModel._id, cartModel);
                return cart;
            }
            throw new AppError_1.default("Product already in cart", 400, "BAD_REQUEST");
        }
    }
    static async countPrice(productFinalPrice, quantity, totalPrice = 0) {
        let priceQuantity = productFinalPrice * quantity;
        totalPrice = priceQuantity + totalPrice;
        return { priceQuantity, totalPrice };
    }
    static async inStock(product, quantity) {
        if (product.stock < quantity) {
            throw new AppError_1.default("Not enough stock", 400, "BAD_REQUEST");
        }
        product.stock -= quantity;
        await product_repository_1.productRepository.updateById(product._id, product);
    }
}
exports.AddToCartService = AddToCartService;
