
// application/use-cases/HandlePaymobWebhook.ts
import { cartRepository } from "../../../cart/repository/cart.repository";
import { orderRepository } from "../../../order/repository/order.repository";
export class HandlePaymobWebhook {
    constructor(private orderRepo: typeof orderRepository) { }

    async execute(data: any) {
        const success = data.obj.success;
        const orderId = data.obj.order.id;

        const order = await this.orderRepo.findByPaymentId(orderId);
        if (!order) return;

        if (success) {
            await this.orderRepo.saveOrder('paid', 'paymob', orderId);
            await cartRepository.updateOne({ paymentId: orderId }, { products: [], totalPrice: 0 })
        } else {
            await this.orderRepo.saveOrder('failed', 'paymob', orderId);
        }
    }
}

