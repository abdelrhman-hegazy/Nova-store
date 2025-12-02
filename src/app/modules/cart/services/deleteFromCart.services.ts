import { cartRepository } from "../repository/cart.repository";
import { sharedServices } from "../../../shared/services";
import AppError from "../../../shared/utils/AppError";
import { productRepository } from "../../product/repository/product.repository";
export class DeleteFromCartServices {
    static async deleteProduct(userId: string, productId: string) {
        const product = await sharedServices.existProductById(productId);
        await sharedServices.existUserById(userId)
        const cart = await sharedServices.existCartByUserId(userId)
        const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId)
        if (productIndex === -1) {
            throw new AppError("Product Not Found In Cart", 404, "not_found")
        }
        cart.totalPrice = await this.totalPrice(cart.totalPrice, cart.products[productIndex].priceQuantity)
        product.stock += cart.products[productIndex].quantity
        cart.products.splice(productIndex, 1)
        cart.updatedAt = new Date()
        const updatedCart = await cartRepository.updateById(cart._id, cart)
        await productRepository.updateById(product._id, product)
        return updatedCart
    }

    static async totalPrice(totalPrice: number, priceQuantity: number) {
        totalPrice -= priceQuantity
        return totalPrice
    }

}


