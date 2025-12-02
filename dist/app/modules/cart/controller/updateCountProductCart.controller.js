"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCountProductCart = void 0;
const services_1 = require("../../../shared/services");
const updateCountProductCart_services_1 = require("../services/updateCountProductCart.services");
const updateCountProductCart = async (req, res, next) => {
    try {
        const { count } = req.body;
        const { productId } = req.params;
        const userId = req.user.id;
        await services_1.sharedServices.existUserById(userId);
        const updatedCart = await updateCountProductCart_services_1.updateCountProductCartServices.updateCountProductCart(userId, productId, count);
        res.status(200).json(updatedCart);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCountProductCart = updateCountProductCart;
