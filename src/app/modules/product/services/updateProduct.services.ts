import AppError from "../../../shared/utils/AppError";
import { uploadMultipleToCloudinary } from "../../../shared/utils/cloudinary";
import { productRepository } from "../repository/product.repository";


export class UpdateProductService {
    static async updateProduct(id: string, data: any) {
        const product = await productRepository.getProductById(id);
        if (!product) {
            throw new AppError("Product not found", 404, "NOT_FOUND");
        }
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

        // // add price or discount 
        // if (data.price && data.discount) {
        //     data.finalPrice = data.price - (data.price * (data.discount / 100));
        // }
        // else if (data.discount) {
        //     data.finalPrice = product.price - (product.price * (data.discount / 100));
        //     data.price = product.price;
        // }
        // else if (data.price) {
        //     data.finalPrice = data.price - (data.price * (product.discount || 0 / 100));
        //     data.discount = product.discount;
        // }
        const updatedProduct = await productRepository.updateOne({ _id: id }, data);
        return updatedProduct;
    }
}