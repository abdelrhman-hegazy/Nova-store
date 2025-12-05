"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymobWebhook = void 0;
const webhookPaymob_services_1 = require("../services/webhookPaymob.services");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const paymobWebhook = async (req, res, next) => {
    try {
        const hmac = req.query.hmac?.toString() || "";
        const data = req.body;
        const success = await webhookPaymob_services_1.PaymentWebhookServices.paymobWebhook(hmac, data);
        res.status(200).json({
            status: "success",
            message: "Payment webhook processed successfully",
            paymentStatus: success
        });
    }
    catch (error) {
        next(new AppError_1.default(error.message, 500, "server_error"));
    }
};
exports.paymobWebhook = paymobWebhook;
