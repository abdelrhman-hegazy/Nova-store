"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = getOrders;
const getOrder_services_1 = require("../services/getOrder.services");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
async function getOrders(req, res, next) {
    try {
        const userId = req.user.id;
        const status = req.query.status;
        const orders = await getOrder_services_1.GetOrderServices.getOrders(userId, status);
        res.status(200).json({ success: true, orders });
    }
    catch (error) {
        next(new AppError_1.default(error.message, 500, 'server_error'));
    }
}
