import express from "express";
import { createPayment } from "../controller/order.controller";
import { identifyCustomer } from "../../../shared/middleware/authorization/identifier";

const router = express.Router();


router.post('/create-payment', identifyCustomer, createPayment);

export const paymentRouter = router;