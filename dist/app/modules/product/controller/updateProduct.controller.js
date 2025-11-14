"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = void 0;
const utils_1 = require("../../../shared/utils");
const updateProduct_services_1 = require("../services/updateProduct.services");
exports.updateProduct = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, discount, images } = req.body;
    const result = await updateProduct_services_1.UpdateProductService.updateProduct(id, { name, description, price, discount, images });
    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: result
    });
});
