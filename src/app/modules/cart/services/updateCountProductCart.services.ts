import { sharedServices } from "../../../shared/services";
import AppError from "../../../shared/utils/AppError";
import { productRepository } from "../../product/repository/product.repository";
import { cartRepository } from "../repository/cart.repository";
import { DeleteFromCartServices } from "./deleteFromCart.services";

export class updateCountProductCartServices {
    static async updateCountProductCart(userId: string, productId: string, count: number) {
        if (count !== 1 && count !== -1) {
            throw new AppError("Count must be 1 or -1", 400, "BAD_REQUEST");
        }

        const cart = await sharedServices.existCartByUserId(userId)
        const product = await sharedServices.existProductById(productId)

        const productCart = cart.products.find((productCart) => productCart.product.productId.toString() === productId)
        if (!productCart) {
            throw new AppError("Product not found", 400, "NOT_FOUND");
        }
        if (productCart.product.quantity === 1 && count === -1) {
            return await DeleteFromCartServices.deleteProduct(userId, productId)
        }
        if (product.stock < 1 && count === 1) {
            throw new AppError("Product stock is not enough", 400, "BAD_REQUEST");
        }

        productCart.product.quantity += count;
        productCart.product.priceQuantity += count * product.price;
        cart.totalPrice = cart.totalPrice + count * product.price;
        product.stock += -count;

        const updatedCart = await cartRepository.updateById(cart._id, cart)
        await productRepository.updateById(productId, product)
        return updatedCart;
    };
}