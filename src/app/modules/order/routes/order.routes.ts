import express from "express";
import { createPayment } from "../controller/order.controller";

const router = express.Router();


router.post('/create-payment', createPayment);

export const paymentRouter = router;