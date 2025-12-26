"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const cart_repository_1 = require("../../../cart/repository/cart.repository");
const AppError_1 = __importDefault(require("../../../../shared/utils/AppError"));
const order_repository_1 = require("../../../order/repository/order.repository");
const mongoose_1 = require("mongoose");
class StripeService {
    stripe;
    constructor(secretKey) {
        this.stripe = new stripe_1.default(secretKey);
    }
    async createPayment(userId) {
        const cart = await cart_repository_1.cartRepository.findOne({ userId });
        if (!cart) {
            throw new AppError_1.default("Cart not found", 404, "CART_NOT_FOUND");
        }
        if (cart.products.length === 0) {
            throw new AppError_1.default("Cart is empty", 400, "BAD_REQUEST");
        }
        const orderItems = cart.products.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.name,
                    description: item.product.description || '',
                },
                unit_amount: item.product.priceQuantity * 100,
            },
            quantity: item.product.quantity,
        }));
        const products = cart.products.map(item => ({
            name: item.product.name,
            amount_cents: item.product.priceQuantity,
            description: item.product.description || '',
            quantity: item.product.quantity
        }));
        const order = await order_repository_1.orderRepository.create({
            userId: new mongoose_1.Types.ObjectId(userId),
            amount: cart.totalPrice,
            status: "pending",
            paymentId: "null",
            products: products,
        });
        const session = await this.stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: orderItems,
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            client_reference_id: order._id.toString(),
            metadata: {
                userId: userId,
                totalPrice: cart.totalPrice,
            }
        });
        console.log("session.client_reference_id:", session.client_reference_id);
        console.log("session", session);
        await cart_repository_1.cartRepository.updateOne({ userId }, { paymentId: session.client_reference_id });
        return {
            paymentId: session.id,
            redirectUrl: session.url
        };
    }
}
exports.StripeService = StripeService;
