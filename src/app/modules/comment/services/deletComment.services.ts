import { sharedServices } from "../../../shared/services";
import { IComment } from "../interface/comment.interface";
import AppError from "../../../shared/utils/AppError";
import { productRepository } from "../../product/repository/product.repository";

export class DeleteCommentService {
    static async deleteComment(productId: string, userId: string) {
        const product = await sharedServices.existProductById(productId);
        const commentIndex = product.comments.findIndex((c: IComment) => c.userId.toString() === userId);
        if (commentIndex === -1) {
            throw new AppError("Comment not found", 404, "NOT_FOUND");
        }
        let newRate: number;
        if (product.comments.length === 1) {
            newRate = 0
        }
        else {
            let totalRate: number = product.comments.length * product.rateProduct - product.comments[commentIndex].rate;
            newRate = totalRate / (product.comments.length - 1);
        }

        const updatedProduct = await productRepository.updateOne({ _id: productId }, {
            $pull: { comments: { userId } },
            $set: { rateProduct: newRate }
        } as any);
        return updatedProduct;
    }
}
