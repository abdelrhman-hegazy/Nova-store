import { sharedServices } from "../../../shared/services";

export class getCartServices {
    static async getCart(cartId: string) {  
        const cart = await sharedServices.exitCartById(cartId)
        return cart;
    };
}