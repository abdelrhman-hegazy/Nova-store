import { cartRepository } from "../repository/cart.repository";
import { sharedServices } from "../../../shared/services";
import AppError from "../../../shared/utils/AppError";
import { ICart } from "../interface/cart.interface";
export class DeleteFromCartServices {
    static async deleteProduct(userId: string, productId: string, cartId: string) {
        await sharedServices.existProductById(productId);
        await sharedServices.existUserById(userId)
        const cart = await sharedServices.exitCartById(cartId)

        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId)
        if (productIndex === -1) {
            throw new AppError("Product Not Found In Cart", 404, "not_found")
        }
        cart.totalPrice = await this.totalPrice(cart.totalPrice, cart.products[productIndex].priceQuantity)

        cart.products.splice(productIndex, 1)
        cart.updatedAt = new Date()
        const updatedCart = await cartRepository.updateById(cart._id, cart)
        return updatedCart
    }

    static async totalPrice(totalPrice: number, priceQuantity: number) {
        totalPrice -= priceQuantity
        return totalPrice
    }

}


