"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCart = void 0;
const services_1 = require("../services");
const utils_1 = require("../../../shared/utils");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
exports.deleteFromCart = (0, utils_1.catchAsync)(async (req, res, next) => {
    try {
        const { productId, cartId } = req.params;
        const userId = req.user.id;
        if (!productId) {
            throw new AppError_1.default("should provide product id", 404, "BAD_REQUEST");
        }
        const data = await services_1.DeleteFromCartServices.deleteProduct(userId, productId, cartId);
        res.status(200).json({
            success: true,
            message: "Product deleted from cart",
            data
        });
    }
    catch (error) {
        next(error);
    }
});
