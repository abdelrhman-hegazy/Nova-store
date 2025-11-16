import { productRepository } from "../../product/repository/product.repository";
import { IProduct } from "../../product/interface/product.interface";

export class getAllFavouriteServices {
    static async getAllFavouriteServices(userId: string): Promise<IProduct[]> {
        const favouriteProducts = await productRepository.getProductByFavorite(userId);
        const updatedProducts: IProduct[] = favouriteProducts.map((p: IProduct) => {
            const isFavorite = true;
            return { ...p, isFavorite } as IProduct;
        });
        return updatedProducts;
    }
}
