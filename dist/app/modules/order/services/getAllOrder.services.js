"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllOrderServices = void 0;
const order_repository_1 = require("../repository/order.repository");
class GetAllOrderServices {
    static async getAllOrders(userId) {
        const orders = await order_repository_1.orderRepository.find({ userId });
        return orders;
    }
}
exports.GetAllOrderServices = GetAllOrderServices;
