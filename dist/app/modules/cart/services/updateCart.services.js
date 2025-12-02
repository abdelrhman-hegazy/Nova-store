"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartServices = void 0;
const services_1 = require("../../../shared/services");
class updateCartServices {
    static async updateCart(cartId) {
        const cart = await services_1.sharedServices.exitCartById(cartId);
        return cart;
    }
    ;
}
exports.updateCartServices = updateCartServices;
