"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const HandleStripeWebhook_1 = require("../../payment/application/use-cases/HandleStripeWebhook");
const HandlePaymobWebhook_1 = require("../../payment/application/use-cases/HandlePaymobWebhook");
const paymobwebook_1 = require("../../payment/infrastructure/paymob/paymobwebook");
const stripeWebhook_1 = require("../../payment/infrastructure/stripe/stripeWebhook");
const order_repository_1 = require("../repository/order.repository");
class WebhookController {
    static stripe() {
        return async (req, res) => {
            const sig = req.headers['stripe-signature'];
            const gateway = new stripeWebhook_1.StripeGateway();
            const event = gateway.verifySignature(req.body, sig);
            const handler = new HandleStripeWebhook_1.HandleStripeWebhook(order_repository_1.orderRepository);
            await handler.execute(event);
            res.status(200).json({ success: true, message: 'Webhook handled successfully' });
        };
    }
    static paymob() {
        return async (req, res) => {
            const hmac = req.query.hmac;
            const gateway = new paymobwebook_1.PaymobGateway();
            if (!gateway.verifyHmac(req.body, hmac)) {
                return res.status(403).send('Invalid HMAC');
            }
            const handler = new HandlePaymobWebhook_1.HandlePaymobWebhook(order_repository_1.orderRepository);
            await handler.execute(req.body);
            res.status(200).json({ success: true, message: 'Webhook handled successfully' });
        };
    }
}
exports.WebhookController = WebhookController;
