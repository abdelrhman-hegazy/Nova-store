import { NextFunction, Request, Response } from 'express';
import AppError from '../../../shared/utils/AppError';
import { sharedServices } from '../../../shared/services';
import { CreatePaymentUseCase } from '../../payment/application/use-cases/createPaymentUseCase';
import { paymentFactory } from '../../payment/infrastructure/payment/PaymentFactory';
export async function createPayment(req: Request, res: Response, next: NextFunction) {
    try {
        const { provider } = req.body
        const userId = (req as any).user.id;
        
        await sharedServices.existUserById(userId);
        await sharedServices.existCartByUserId(userId);

        const gateway = paymentFactory(provider)
        const useCase = new CreatePaymentUseCase(gateway)
        const result = await useCase.execute(userId)
        
        res.status(200).json({ success: true, result });
    } catch (error) {
        next(new AppError((error as Error).message, 500, 'ERROR_CREATING_PAYMENT'))
    }
}


