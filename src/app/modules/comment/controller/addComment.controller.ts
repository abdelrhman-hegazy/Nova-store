
import { Request, Response } from "express";
import { addCommentService } from "../services";
import { catchAsync } from "../../../shared/utils";
import AppError from "../../../shared/utils/AppError";

export const addComment = catchAsync(async (req: Request, res: Response) => {
    const { comment, rate } = req.body;
    if (!comment && !rate) {
        throw new AppError("Invalid comment", 400, "BAD_REQUEST");
    }
    const productId = req.params.productId;
    const userId = (req as any).user.id;
    const result = await addCommentService.addComment({ userId, comment: comment || "", rate: rate || 1 }, productId);
    res.status(200).json(result);
})
