import { productRepository } from "../repository/product.repository"

export class DeleteProductService {
    static async deleteProduct(id: string) {
        const product = await productRepository.deleteById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        return "Product deleted successfully";
    }
}
