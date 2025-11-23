"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentService = exports.AddCommentService = void 0;
const product_repository_1 = require("../../product/repository/product.repository");
const services_1 = require("../../../shared/services");
class AddCommentService {
    async addComment(comment, productId) {
        let updatedProduct;
        const product = await services_1.sharedServices.existProductById(productId);
        let newRate;
        let totalRate;
        const commentIndex = product.comments.findIndex((c) => c.userId.toString() === comment.userId.toString());
        if (commentIndex !== -1) {
            totalRate = product.comments.length * product.rateProduct - product.comments[commentIndex].rate + comment.rate;
            newRate = totalRate / product.comments.length;
            updatedProduct = await product_repository_1.productRepository.updateOne({ _id: productId }, {
                $set: { rateProduct: newRate, comments: comment }
            });
        }
        else {
            totalRate = product.comments.length * product.rateProduct + comment.rate;
            newRate = totalRate / (product.comments.length + 1);
            updatedProduct = await product_repository_1.productRepository.updateOne({ _id: productId }, {
                $set: { rateProduct: newRate },
                $push: { comments: comment }
            });
        }
        return updatedProduct;
    }
}
exports.AddCommentService = AddCommentService;
exports.addCommentService = new AddCommentService();
