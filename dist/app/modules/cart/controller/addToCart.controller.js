"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCart = void 0;
const utils_1 = require("../../../shared/utils");
const addToCart_services_1 = require("../services/addToCart.services");
exports.addToCart = (0, utils_1.catchAsync)(async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const productId = req.params.productId;
        const userId = req.user.id;
        const cart = await addToCart_services_1.AddToCartService.addToCart(userId, productId, quantity);
        res.status(200).json({
            status: "success",
            data: cart
        });
    }
    catch (error) {
        next(error);
    }
});
