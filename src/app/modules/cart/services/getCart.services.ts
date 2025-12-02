import { sharedServices } from "../../../shared/services";

export class getCartServices {
    static async getCart(userId: string) {
        const cart = await sharedServices.existCartByUserId(userId)
        return cart;
    };
}