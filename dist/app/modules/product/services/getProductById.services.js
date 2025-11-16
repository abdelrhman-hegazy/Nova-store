"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductByIdService = void 0;
const services_1 = require("../../../shared/services");
class GetProductByIdService {
    static async getProductById(id) {
        const product = await services_1.sharedServices.existingProduct(id);
        return product;
    }
}
exports.GetProductByIdService = GetProductByIdService;
