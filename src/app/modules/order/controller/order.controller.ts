import { NextFunction, Request, Response } from 'express';
import { PaymentService } from '../services/order.services';
import AppError from '../../../shared/utils/AppError';

export async function createPayment(req: Request, res: Response, next: NextFunction) {
    try {
        const { amount } = req.body;
        if (!amount) {
            next(new AppError("Amount is required", 400, 'ERROR_CREATING_PAYMENT'))
        }
        const iframeUrl = await PaymentService.createPayment(amount);

        res.status(200).json({ success: true, iframeUrl });
    } catch (error) {
        next(new AppError((error as Error).message, 500, 'ERROR_CREATING_PAYMENT'))
    }
}


