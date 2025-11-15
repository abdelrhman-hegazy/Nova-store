"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRepository = exports.CommentRepository = void 0;
const product_repository_1 = require("../../product/repository/product.repository");
class CommentRepository extends product_repository_1.ProductRepository {
    constructor() {
        super();
    }
    async addComment(comment, productId) {
        const product = await this.model.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        product.comments.push(comment);
        return await product.save();
    }
}
exports.CommentRepository = CommentRepository;
exports.commentRepository = new CommentRepository();
