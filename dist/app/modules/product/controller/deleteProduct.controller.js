"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = void 0;
const services_1 = require("../services");
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await services_1.DeleteProductService.deleteProduct(id);
    return res.status(200).json({ success: true, message: deletedProduct });
};
exports.deleteProduct = deleteProduct;
