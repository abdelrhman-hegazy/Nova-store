"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentWebhookServices = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../../../shared/config"));
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const order_repository_1 = require("../repository/order.repository");
const cart_repository_1 = require("../../cart/repository/cart.repository");
class PaymentWebhookServices {
    static async paymobWebhook(hmac, data) {
        try {
            const isValid = this.validateHmac(data, hmac);
            if (!isValid) {
                throw new AppError_1.default("Invalid HMAC signature", 500, "server_error");
            }
            const success = data.obj?.success;
            const transactionId = data.obj?.id;
            const orderId = data.obj?.order?.id;
            const amount = data.obj?.amount_cents;
            console.log(`success ${success}, transactionId ${transactionId}, orderId ${orderId}`);
            if (success) {
                console.log("💰 Payment Successful:", transactionId);
                console.log("Paymob Invoice:", data.obj.order_url);
                console.log("orderId", orderId);
                await order_repository_1.orderRepository.updateStatus(orderId, "paid");
                await cart_repository_1.cartRepository.updateOne({ orderId }, { products: [] });
            }
            else {
                await order_repository_1.orderRepository.updateStatus(orderId, "failed");
            }
            return { success, PaymobInvoice: data.obj.order_url };
        }
        catch (error) {
            throw new AppError_1.default(error.message, 500, "server_error");
        }
    }
    ;
    static async validateHmac(data, hmac) {
        const hashedOrder = data.obj.join("");
        const calculatedHmac = crypto_1.default
            .createHmac("sha512", config_1.default.payment.PAYMOB_HMAC_SECRET)
            .update(hashedOrder)
            .digest("hex");
        return calculatedHmac === hmac;
    }
}
exports.PaymentWebhookServices = PaymentWebhookServices;
