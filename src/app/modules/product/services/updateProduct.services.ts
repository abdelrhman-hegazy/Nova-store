import AppError from "../../../shared/utils/AppError";
import { productRepository } from "../repository/product.repository";


export class UpdateProductService {
    static async updateProduct(id: string, data: any) {
        const product = await productRepository.findById(id);
        if (!product) {
            throw new AppError("Product not found", 404, "NOT_FOUND");
        }
        return productRepository.updateOne({ _id: id }, data);
    }
}