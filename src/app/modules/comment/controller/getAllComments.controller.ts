import { Request, Response } from "express";
import { catchAsync } from "../../../shared/utils";
import { GetAllCommentsService } from "../services";

export const getAllComments = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const result = await GetAllCommentsService.getAllComments(productId);
    res.status(200).json(result);
})
