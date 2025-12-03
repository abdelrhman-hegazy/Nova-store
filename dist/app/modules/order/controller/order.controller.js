"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = void 0;
const order_services_1 = require("../services/order.services");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
async function createPayment(req, res, next) {
    try {
        const { amount } = req.body;
        if (!amount) {
            next(new AppError_1.default("Amount is required", 400, 'ERROR_CREATING_PAYMENT'));
        }
        const iframeUrl = await order_services_1.PaymentService.createPayment(amount);
        res.status(200).json({ success: true, iframeUrl });
    }
    catch (error) {
        next(new AppError_1.default(error.message, 500, 'ERROR_CREATING_PAYMENT'));
    }
}
exports.createPayment = createPayment;
