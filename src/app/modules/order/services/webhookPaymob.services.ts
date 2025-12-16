import crypto from "crypto";
import config from "../../../shared/config";
import AppError from "../../../shared/utils/AppError";
import { orderRepository } from "../repository/order.repository";
import { cartRepository } from "../../cart/repository/cart.repository";

export class PaymentWebhookServices {
    static async paymobWebhook(hmac: string, data: any) {
        try {
            const isValid = this.validateHmac(data, hmac);
            if (!isValid) {
                throw new AppError("Invalid HMAC signature", 500, "server_error");
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


                await orderRepository.updateStatus(orderId, "paid");
                await cartRepository.updateOne({ orderId }, { products: [] })
            } else {
                await orderRepository.updateStatus(orderId, "failed");
            }
            return { success, PaymobInvoice: data.obj.order_url }
        } catch (error) {
            throw new AppError((error as Error).message, 500, "server_error");
        }
    };

    static async validateHmac(data: any, hmac: string) {
        const hashedOrder = data.obj.join("");

        const calculatedHmac = crypto
            .createHmac("sha512", config.payment.PAYMOB_HMAC_SECRET as string)
            .update(hashedOrder)
            .digest("hex");

        return calculatedHmac === hmac;
    }
}