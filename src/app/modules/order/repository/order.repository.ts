import { Order } from "../models/oreder.model";
import { IOrder } from "../interface/order.interface";
import { BaseRepository } from "../../../shared/baseRepository/base.repository";

class OrderRepository extends BaseRepository<IOrder> {
    constructor() {
        super(Order);
    }
    async updateStatus(paymentId: string, status: string) {
        return await this.model.updateOne({ paymentId }, { status: status });
    }
}

export const orderRepository = new OrderRepository();