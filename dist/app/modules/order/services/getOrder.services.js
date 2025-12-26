"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOrderServices = void 0;
const order_repository_1 = require("../repository/order.repository");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
class GetOrderServices {
    static async getOrders(userId, status) {
        if (status && !["failed", "pending", "paid"].includes(status)) {
            throw new AppError_1.default("Invalid status value contain status failed, pending, paid", 400, "BAD_REQUEST");
        }
        if (!status) {
            const orders = await order_repository_1.orderRepository.find({ userId });
            return orders;
        }
        const orders = await order_repository_1.orderRepository.find({ userId, status });
        return orders;
    }
}
exports.GetOrderServices = GetOrderServices;
