import { Order } from "../models/oreder.model";
import {IOrder} from "../interface/order.interface";
import { BaseRepository } from "../../../shared/baseRepository/base.repository";

class OrderRepository extends BaseRepository<IOrder> {
    constructor() {
        super(Order);
    }
}

export const orderRepository = new OrderRepository();