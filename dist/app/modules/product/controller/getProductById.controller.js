"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = void 0;
const utils_1 = require("../../../shared/utils");
const services_1 = require("../services");
const services_2 = require("../../../shared/services");
exports.getProductById = (0, utils_1.catchAsync)(async (req, res, next) => {
    const productId = req.params.id;
    services_2.sharedServices.validateObjectId(productId);
    const result = await services_1.GetProductByIdService.getProductById(productId);
    res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: result
    });
});
