"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlePaymobWebhook = void 0;
const cart_repository_1 = require("../../../cart/repository/cart.repository");
class HandlePaymobWebhook {
    orderRepo;
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }
    async execute(data) {
        const success = data.obj.success;
        const orderId = data.obj.order.id;
        const order = await this.orderRepo.findByPaymentId(orderId);
        if (!order)
            return;
        if (success) {
            await this.orderRepo.saveOrder('paid', 'paymob', orderId);
            await cart_repository_1.cartRepository.updateOne({ paymentId: orderId }, { products: [], totalPrice: 0 });
        }
        else {
            await this.orderRepo.saveOrder('failed', 'paymob', orderId);
        }
    }
}
exports.HandlePaymobWebhook = HandlePaymobWebhook;
