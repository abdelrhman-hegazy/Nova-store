import AppError from "../../../../shared/utils/AppError";
import { cartRepository } from "../../../cart/repository/cart.repository";
import { orderRepository } from "../../../order/repository/order.repository";
export class HandleStripeWebhook {
    constructor(private orderRepo: typeof orderRepository) { }

    async execute(event: any) {
        if (event.type !== "checkout.session.completed") {
            return;
        }

        const session = event.data.object;
        const orderId = session.client_reference_id;

        if (!orderId) {
            throw new AppError("Missing order reference", 400, "BAD_REQUEST");
        }

        const order = await this.orderRepo.findById(orderId);
        if (!order) {
            throw new AppError("Not Found Order", 404, "NOT_FOUND");
        }

        if (order.status === "paid") {
            await this.orderRepo.saveOrder("paid", "stripe", orderId);
            await cartRepository.updateOne(
                { userId: order.userId },
                { products: [], totalPrice: 0 }
            );
        }
        console.log("Order paid successfully:", orderId);
    }
}
