import { productRepository } from "../repository/product.repository";
import AppError from "../../../shared/utils/AppError";


export class GetProductByIdService {
    static async getProductById(id: string) {
        const product = await productRepository.getProductById(id);
        if (!product) {
            throw new AppError("Product not found", 404, "NOT_FOUND");
        }
        return product;
    }
}