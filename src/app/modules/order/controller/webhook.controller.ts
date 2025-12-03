import crypto from "crypto";
import { Request, Response } from "express";
import config from "../../../shared/config";

export const paymobWebhook = async (req: Request, res: Response) => {
    try {
        const hmac = req.query.hmac?.toString() || "";
        const data = req.body;

        // 1. Validate HMAC to confirm the callback is coming from Paymob
        const isValid = validateHmac(data, hmac);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid HMAC signature" });
        }

        console.log("🎯 Paymob Webhook Received:");
        console.log(JSON.stringify(data, null, 2));

        const success = data.obj?.success;
        const transactionId = data.obj?.id;
        const orderId = data.obj?.order?.id;
        const amount = data.obj?.amount_cents;

        console.log(`success ${success},transactionId ${transactionId},orderId ${orderId},amount ${amount}`);

        if (success) {
            console.log("💰 Payment Successful:", transactionId);

            // update your order status here
            // await orderRepository.updateStatus(orderId, "paid");

        } else {
            console.log("❌ Payment Failed:", transactionId);

            // update order to failed
            // await orderRepository.updateStatus(orderId, "failed");
        }

        return res.status(200).json({ message: "Webhook received" });

    } catch (error) {
        console.error("Webhook Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

function validateHmac(data: any, hmac: string) {
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
