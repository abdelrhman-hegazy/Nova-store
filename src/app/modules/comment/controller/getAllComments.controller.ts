import { Request, Response } from "express";
import { catchAsync } from "../../../shared/utils";
import AppError from "../../../shared/utils/AppError";
import { GetAllCommentsService } from "../services/getAllComments.services";

export const getAllCommentsController = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const result = await GetAllCommentsService.getAllComments(productId);
    res.status(200).json(result);
})
