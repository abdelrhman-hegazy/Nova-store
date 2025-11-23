"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCommentService = void 0;
const services_1 = require("../../../shared/services");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const product_repository_1 = require("../../product/repository/product.repository");
class DeleteCommentService {
    static async deleteComment(productId, userId) {
        const product = await services_1.sharedServices.existProductById(productId);
        const commentIndex = product.comments.findIndex((c) => c.userId.toString() === userId);
        if (commentIndex === -1) {
            throw new AppError_1.default("Comment not found", 404, "NOT_FOUND");
        }
        let newRate;
        if (product.comments.length === 1) {
            newRate = 0;
        }
        else {
            let totalRate = product.comments.length * product.rateProduct - product.comments[commentIndex].rate;
            newRate = totalRate / (product.comments.length - 1);
        }
        const updatedProduct = await product_repository_1.productRepository.updateOne({ _id: productId }, {
            $pull: { comments: { userId } },
            $set: { rateProduct: newRate }
        });
        return updatedProduct;
    }
}
exports.DeleteCommentService = DeleteCommentService;
