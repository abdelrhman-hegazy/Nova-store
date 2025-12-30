import { orderRepository } from "../../../order/repository/order.repository";
import AppError from "../../../../shared/utils/AppError";


export class GetOrderServices {
    static async getOrders(userId: string, status?: string) {
        if (status && !["failed", "pending", "paid"].includes(status)) {
            throw new AppError("Invalid status value contain status failed, pending, paid", 400, "BAD_REQUEST");
        }
        if (!status) {
            const orders = await orderRepository.find({ userId });
            return orders;
        }
        const orders = await orderRepository.find({ userId, status });
        return orders;
    }
}