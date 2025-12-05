"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartServices = void 0;
const services_1 = require("../../../shared/services");
const cart_repository_1 = require("../repository/cart.repository");
class getCartServices {
    static async getCart(userId) {
        const user = await services_1.sharedServices.existUserById(userId);
        const cart = await cart_repository_1.cartRepository.findOne({ userId });
        if (!cart) {
            return await cart_repository_1.cartRepository.create({
                userId: user._id,
                totalPrice: 0
            });
        }
        return cart;
    }
    ;
}
exports.getCartServices = getCartServices;
