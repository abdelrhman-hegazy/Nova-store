import express from "express";
import { createPayment } from "../controller/order.controller";
import { identifyCustomer } from "../../../shared/middleware/authorization/identifier";
// import { paymobWebhook } from "../controller/webhook.controller";
import { getOrders } from "../controller/getOrders.conttoller";
import { WebhookController } from "../../order/controller/webhook.controller";
const router = express.Router();


router.post('/create-payment', identifyCustomer, createPayment);
router.post(
    "/webhook/paymob",
    express.json({ limit: "2mb" }),
    WebhookController.paymob()
);
router.get("/get-orders", identifyCustomer, getOrders);
export const paymentRouter = router;