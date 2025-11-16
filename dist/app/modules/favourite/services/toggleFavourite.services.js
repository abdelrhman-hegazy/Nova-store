"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavouriteServices = void 0;
const services_1 = require("../../../shared/services");
const product_repository_1 = require("../../product/repository/product.repository");
class FavouriteServices {
    static async toggleFavouriteServices(userId, productId) {
        const user = await services_1.sharedServices.existUserById(userId);
        const product = await services_1.sharedServices.existingProduct(productId);
        let favourite;
        const isFavourite = product.favorites.some((favorite) => favorite.userId.toString() === user._id.toString());
        if (isFavourite) {
            favourite = await product_repository_1.productRepository.updateById(productId, { $pull: { favorites: { userId: user._id } } });
            return "Favorite removed successfully";
        }
        else {
            favourite = await product_repository_1.productRepository.updateById(productId, { $push: { favorites: { userId: user._id } } });
            return "Favorite added successfully";
        }
    }
}
exports.FavouriteServices = FavouriteServices;
