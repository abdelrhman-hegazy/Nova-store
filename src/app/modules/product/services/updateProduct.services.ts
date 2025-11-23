import { sharedServices } from "../../../shared/services";
import AppError from "../../../shared/utils/AppError";
import { uploadMultipleToCloudinary } from "../../../shared/utils/cloudinary";
import { productRepository } from "../repository/product.repository";


export class UpdateProductService {
    static async updateProduct(id: string, data: any) {
        const product = await sharedServices.existProductById(id);
        if (Array.isArray(data.images) && data.images.length > 0) {
            const uploadedImages = await uploadMultipleToCloudinary(data.images);
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

        const updatedProduct = await productRepository.updateOne({ _id: id }, data);
        return updatedProduct;
    }
}