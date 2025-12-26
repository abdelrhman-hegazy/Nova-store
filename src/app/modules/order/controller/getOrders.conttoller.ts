import { Request, Response, NextFunction } from "express";
import { GetOrderServices } from "../services/getOrder.services";
import AppError from "../../../shared/utils/AppError";

export async function getOrders(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = (req as any).user.id;
        const status = req.query.status as string
        const orders = await GetOrderServices.getOrders(userId, status);
        res.status(200).json({ success: true, orders });
    } catch (error) {
        next(new AppError((error as Error).message, 500, 'server_error'))
    }
}
