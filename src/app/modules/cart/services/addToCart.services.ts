import { sharedServices } from "../../../shared/services";
import AppError from "../../../shared/utils/AppError";
import { IProduct } from "../../product/interface/product.interface";
import { productRepository } from "../../product/repository/product.repository";
import { cartRepository } from "../repository/cart.repository";



export class AddToCartService {
    static async addToCart(userId: string, productId: string, quantity: number) {
        if (!userId || !productId || !quantity) {
            throw new AppError("Missing required fields", 400, "BAD_REQUEST")
        }
        const user = await sharedServices.existUserById(userId)
        const product = await sharedServices.existProductById(productId)
        const cartModel = await cartRepository.findOne({ userId })

        if (!cartModel) {
            const { priceQuantity, totalPrice } = await this.countPrice(product.finalPrice, quantity)
            await this.inStock(product, quantity)

            const cart = await cartRepository.create({
                userId: user._id,
                products: [{
                    productId: product._id,
                    quantity,
                    priceQuantity
                }],
                totalPrice
            })
            return cart
        } else {
            let cart;
            const productInCart = cartModel.products.find(p => p.productId.toString() === productId)
            if (!productInCart) {
                const { priceQuantity, totalPrice } = await this.countPrice(product.finalPrice, quantity, cartModel.totalPrice)
                await this.inStock(product, quantity)
                cartModel.products.push({
                    productId: product._id,
                    quantity,
                    priceQuantity
                })
                cartModel.totalPrice = totalPrice
                cart = await cartRepository.updateById(cartModel._id, cartModel)
                return cart
            }
            throw new AppError("Product already in cart", 400, "BAD_REQUEST")
        }
    }
    static async countPrice(productFinalPrice: number, quantity: number, totalPrice: number = 0): Promise<{ priceQuantity: number, totalPrice: number }> {
        let priceQuantity = productFinalPrice * quantity
        totalPrice = priceQuantity + totalPrice
        return { priceQuantity, totalPrice }
    }
    static async inStock(product: IProduct, quantity: number) {
        if (product.stock < quantity) {
            throw new AppError("Not enough stock", 400, "BAD_REQUEST")
        }
        product.stock -= quantity
        await productRepository.updateById(product._id, product)
    }
}