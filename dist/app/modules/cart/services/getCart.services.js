"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartServices = void 0;
const services_1 = require("../../../shared/services");
class getCartServices {
    static async getCart(cartId) {
        const cart = await services_1.sharedServices.exitCartById(cartId);
        return cart;
    }
    ;
}
exports.getCartServices = getCartServices;
