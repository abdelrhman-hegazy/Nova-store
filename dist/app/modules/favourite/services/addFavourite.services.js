"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFavouriteServices = void 0;
const services_1 = require("../../../shared/services");
const product_repository_1 = require("../../product/repository/product.repository");
class AddFavouriteServices {
    static async addFavourite(userId, productId) {
        const user = await services_1.sharedServices.existUserById(userId);
        await services_1.sharedServices.existingProduct(productId);
        const favorite = await product_repository_1.productRepository.updateById(productId, { $addToSet: { favorites: user._id } });
        return favorite;
    }
}
exports.AddFavouriteServices = AddFavouriteServices;
