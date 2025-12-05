import { sharedServices } from "../../../shared/services";
import { cartRepository } from "../repository/cart.repository";

export class getCartServices {
    static async getCart(userId: string) {
        const user = await sharedServices.existUserById(userId)
        const cart = await cartRepository.findOne({ userId })
        if (!cart) {
            return await cartRepository.create({
                userId: user._id,
                totalPrice: 0
            })
        }
        return cart;
    };
}