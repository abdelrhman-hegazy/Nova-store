import { Types } from "mongoose";
import AppError from "../utils/AppError";
import { productRepository } from "../../modules/product/repository/product.repository";
import { userRepository } from "../../modules/auth/repository/user.repository";
import { cartRepository } from "../../modules/cart/repository/cart.repository";

export class sharedServices {
    static async existUserByEmail(email: string) {
        const user = await userRepository.findOne({ email });
        if (!user) {
            throw new AppError("User Not Found", 404, "NOT_FOUND");
        }
        return user;
    }
    static async validateObjectId(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new AppError("Not Valid Id", 400, "BAD_REQUEST");
        }
    }
    static async existProductById(id: string) {
        const product = await productRepository.findById(id);
        if (!product) {
            throw new AppError("Product Not Found", 404, "NOT_FOUND");
        }
        return product;
    }
    static async existUserById(userId: string) {
        const user = await userRepository.findById(userId)
        if (!user) {
            throw new AppError("User Not Found", 404, "NOT_FOUND")
        }
        return user
    }
    static async exitCartById(cartId:string){
         const cart = await cartRepository.findById(cartId)
        if (!cart) {
            throw new AppError("Cart Not Found", 404, "NOT_FOUND")
        }
        return cart
    }
    static async existCartByUserId(userId:string){
        const cart = await cartRepository.findOne({userId})
        if (!cart) {
            throw new AppError("Cart Not Found", 404, "NOT_FOUND")
        }
        return cart
    }
}