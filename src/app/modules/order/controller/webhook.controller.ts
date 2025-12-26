import { NextFunction, Request, Response } from "express";
// import { PaymentWebhookServices } from "../services/webhookPaymob.services";
import AppError from "../../../shared/utils/AppError";
import { HandleStripeWebhook } from "../../payment/application/use-cases/HandleStripeWebhook";
import { HandlePaymobWebhook } from "../../payment/application/use-cases/HandlePaymobWebhook";
import { PaymobGateway } from "../../payment/infrastructure/paymob/paymobwebook";
import { StripeGateway } from "../../payment/infrastructure/stripe/stripeWebhook";
import { orderRepository } from "../repository/order.repository";

export class WebhookController {
    static stripe() {
        return async (req: Request, res: Response) => {
            const sig = req.headers['stripe-signature'];
            const gateway = new StripeGateway();
            const event = gateway.verifySignature(req.body, sig as string);
            const handler = new HandleStripeWebhook(orderRepository);
            await handler.execute(event);
            res.status(200).json({ success: true, message: 'Webhook handled successfully' });
        };
    }

    static paymob() {
        return async (req: Request, res: Response) => {
            const hmac = req.query.hmac;
            const gateway = new PaymobGateway();
            if (!gateway.verifyHmac(req.body, hmac as string)) {
                return res.status(403).send('Invalid HMAC');
            }
            const handler = new HandlePaymobWebhook(orderRepository);
            await handler.execute(req.body);
            res.status(200).json({ success: true, message: 'Webhook handled successfully' });
        };
    }
}