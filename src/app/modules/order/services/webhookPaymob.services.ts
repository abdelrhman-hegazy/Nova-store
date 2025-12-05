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

            console.log(`success ${success},transactionId ${transactionId},orderId ${orderId},amount ${amount}`);

            if (success) {
                console.log("💰 Payment Successful:", transactionId);
                await orderRepository.updateStatus(orderId, "paid");
                await cartRepository.updateOne({ order: orderId }, { products: [] })
            } else {
                await orderRepository.updateStatus(orderId, "failed");
            }
            return success
        } catch (error) {
            throw new AppError((error as Error).message, 500, "server_error");
        }
    };

    static async validateHmac(data: any, hmac: string) {
        const hashedOrder = [
            data.obj.amount_cents,
            data.obj.created_at,
            data.obj.currency,
            data.obj.error_occured,
            data.obj.has_parent_transaction,
            data.obj.id,
            data.obj.integration_id,
            data.obj.is_3d_secure,
            data.obj.is_auth,
            data.obj.is_capture,
            data.obj.is_refunded,
            data.obj.is_standalone_payment,
            data.obj.is_voided,
            data.obj.order.id,
            data.obj.owner,
            data.obj.pending,
            data.obj.source_data.pan,
            data.obj.source_data.sub_type,
            data.obj.source_data.type,
            data.obj.success
        ].join("");

        const calculatedHmac = crypto
            .createHmac("sha512", config.payment.PAYMOB_HMAC_SECRET as string)
            .update(hashedOrder)
            .digest("hex");

        return calculatedHmac === hmac;
    }
}