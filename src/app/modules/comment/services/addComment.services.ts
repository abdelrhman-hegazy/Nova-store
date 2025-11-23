import { productRepository } from "../../product/repository/product.repository";
import { IComment } from "../interface/comment.interface";
import { sharedServices } from "../../../shared/services";

export class AddCommentService {
    async addComment(comment: IComment, productId: string) {
        let updatedProduct;
        const product = await sharedServices.existProductById(productId);
        let newRate: number;
        let totalRate: number;
        const commentIndex = product.comments.findIndex((c: IComment) => c.userId.toString() === comment.userId.toString());
        if (commentIndex !== -1) {
            totalRate = product.comments.length * product.rateProduct - product.comments[commentIndex].rate + comment.rate;
            newRate = totalRate / product.comments.length;
            updatedProduct = await productRepository.updateOne({ _id: productId }, {
                $set: { rateProduct: newRate, comments: comment }
            } as any);
        } else {
            totalRate = product.comments.length * product.rateProduct + comment.rate;
            newRate = totalRate / (product.comments.length + 1);
            updatedProduct = await productRepository.updateOne({ _id: productId }, {
                $set: { rateProduct: newRate },
                $push: { comments: comment }
            } as any);
        }

        return updatedProduct;
    }
}

export const addCommentService = new AddCommentService();