

import { sharedServices } from "../../../shared/services";
import { productRepository } from "../../product/repository/product.repository";

export class FavouriteServices {

    static async toggleFavouriteServices(userId: string, productId: string) {
        const user: any = await sharedServices.existUserById(userId);
        const product: any = await sharedServices.existingProduct(productId)
        let favourite
        const isFavourite = product.favorites.some((favorite: any) => favorite.userId.toString() === user._id.toString())
        if (isFavourite) {
            favourite = await productRepository.updateById(productId, { $pull: { favorites: { userId: user._id } } })
            return "Favorite removed successfully"
        } else {
            favourite = await productRepository.updateById(productId, { $push: { favorites: { userId: user._id } } })
            return "Favorite added successfully"
        }

    }
}
