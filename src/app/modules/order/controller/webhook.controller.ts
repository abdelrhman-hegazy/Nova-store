import { NextFunction, Request, Response } from "express";
import { PaymentWebhookServices } from "../services/webhookPaymob.services";
import AppError from "../../../shared/utils/AppError";

export const paymobWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const hmac = req.query.hmac?.toString() || "";
        const data = req.body;

        const success = await PaymentWebhookServices.paymobWebhook(hmac, data)
        res.status(200).json({
            status: "success",
            message: "Payment webhook processed successfully",
            paymentStatus: success
        })
    } catch (error) {
        next(new AppError((error as Error).message, 500, "server_error"))
    }
}