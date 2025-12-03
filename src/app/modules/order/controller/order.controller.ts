import { NextFunction, Request, Response } from 'express';
import { PaymentService } from '../services/order.services';
import AppError from '../../../shared/utils/AppError';
import { sharedServices } from '../../../shared/services';

export async function createPayment(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).user.id;
        await sharedServices.existUserById(userId);
        await sharedServices.existCartByUserId(userId);
        const iframeUrl = await PaymentService.createPayment(userId);

        res.status(200).json({ success: true, iframeUrl });
    } catch (error) {
        next(new AppError((error as Error).message, 500, 'ERROR_CREATING_PAYMENT'))
    }
}


