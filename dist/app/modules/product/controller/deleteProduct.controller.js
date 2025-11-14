"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = void 0;
const deleteProduct_services_1 = require("../services/deleteProduct.services");
const deleteProductController = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await deleteProduct_services_1.DeleteProductService.deleteProduct(id);
    return res.status(200).json({ success: true, message: deletedProduct });
};
exports.deleteProductController = deleteProductController;
