"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const utils_1 = require("../../../shared/utils");
const services_1 = require("../services");
const services_2 = require("../../../shared/services");
exports.addProduct = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { id: userId } = req.user;
    const user = await services_2.sharedServices.existUserById(userId.toString());
    let files = req.files;
    const { body } = req;
    const result = await services_1.AddProductService.addProduct(body, files, user);
    res.status(201).json({
        status: "success",
        message: "Product added successfully",
        data: result
    });
});
