"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleStripeWebhook = void 0;
const AppError_1 = __importDefault(require("../../../../shared/utils/AppError"));
const cart_repository_1 = require("../../../cart/repository/cart.repository");
class HandleStripeWebhook {
    orderRepo;
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }
    async execute(event) {
        if (event.type !== "checkout.session.completed") {
            return;
        }
        const session = event.data.object;
        const orderId = session.client_reference_id;
        if (!orderId) {
            throw new AppError_1.default("Missing order reference", 400, "BAD_REQUEST");
        }
        const order = await this.orderRepo.findById(orderId);
        if (!order) {
            throw new AppError_1.default("Not Found Order", 404, "NOT_FOUND");
        }
        if (order.status === "paid") {
            return;
        }
        await this.orderRepo.saveOrder("paid", "stripe", orderId);
        await cart_repository_1.cartRepository.updateOne({ userId: order.userId }, { products: [], totalPrice: 0 });
        console.log("Order paid successfully:", orderId);
    }
}
exports.HandleStripeWebhook = HandleStripeWebhook;
