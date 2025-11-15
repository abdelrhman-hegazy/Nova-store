import { catchAsync } from "../../../shared/utils";
import AppError from "../../../shared/utils/AppError";
import { DeleteCommentService } from "../services/deletComment.services";
import { Request, Response } from "express";

export const deleteComment = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const userId = (req as any).user.id;
    const result = await DeleteCommentService.deleteComment(productId, userId);
    res.status(200).json(result);
})
