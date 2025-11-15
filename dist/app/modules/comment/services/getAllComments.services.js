"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCommentsService = void 0;
const services_1 = require("../../../shared/services");
class GetAllCommentsService {
    static async getAllComments(productId) {
        const product = await services_1.sharedServices.existingProduct(productId);
        return product.comments;
    }
}
exports.GetAllCommentsService = GetAllCommentsService;
