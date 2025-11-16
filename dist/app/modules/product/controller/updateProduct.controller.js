"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = void 0;
const utils_1 = require("../../../shared/utils");
const services_1 = require("../services");
exports.updateProduct = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    let files = req.files;
    const { name, categoryId, price, discount, stock, details } = req.body;
    const result = await services_1.UpdateProductService.updateProduct(id, { name, categoryId, price, discount, stock, details, images: files || [] });
    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: result
    });
});
