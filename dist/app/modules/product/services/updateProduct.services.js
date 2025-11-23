"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductService = void 0;
const services_1 = require("../../../shared/services");
const cloudinary_1 = require("../../../shared/utils/cloudinary");
const product_repository_1 = require("../repository/product.repository");
class UpdateProductService {
    static async updateProduct(id, data) {
        const product = await services_1.sharedServices.existProductById(id);
        if (Array.isArray(data.images) && data.images.length > 0) {
            const uploadedImages = await (0, cloudinary_1.uploadMultipleToCloudinary)(data.images);
            data.images = [...product.images, ...uploadedImages];
        }
        else {
            data.images = product.images;
        }
        let price = data.price || product.price;
        let discount = data.discount || product.discount;
        let finalPrice = price - (price * (discount / 100));
        data.price = price;
        data.discount = discount;
        data.finalPrice = finalPrice;
        const updatedProduct = await product_repository_1.productRepository.updateOne({ _id: id }, data);
        return updatedProduct;
    }
}
exports.UpdateProductService = UpdateProductService;
