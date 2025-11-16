"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFavouriteServices = void 0;
const product_repository_1 = require("../../product/repository/product.repository");
class getAllFavouriteServices {
    static async getAllFavouriteServices(userId) {
        const favouriteProducts = await product_repository_1.productRepository.getProductByFavorite(userId);
        const updatedProducts = favouriteProducts.map((p) => {
            const isFavorite = true;
            return { ...p, isFavorite };
        });
        return updatedProducts;
    }
}
exports.getAllFavouriteServices = getAllFavouriteServices;
