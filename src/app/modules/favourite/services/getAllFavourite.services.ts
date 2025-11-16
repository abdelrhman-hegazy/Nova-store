import { productRepository } from "../../product/repository/product.repository";

export class getAllFavouriteServices {
    static async getAllFavouriteServices(userId: string) {
        const favouriteProducts = await productRepository.getProductByFavorite(userId)
        const updatedProducts = favouriteProducts.map(p => {
            const isFavorite = true
            return { ...p, isFavorite }
        });
        return updatedProducts
    }
}
