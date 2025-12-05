"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = void 0;
const services_1 = require("../services");
const utils_1 = require("../../../shared/utils");
exports.getCart = (0, utils_1.catchAsync)(async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await services_1.getCartServices.getCart(userId);
        res.status(200).json({
            status: "success",
            data: cart
        });
    }
    catch (error) {
        next(error);
    }
});
