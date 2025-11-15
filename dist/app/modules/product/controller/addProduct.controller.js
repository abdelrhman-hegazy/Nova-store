"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = void 0;
const utils_1 = require("../../../shared/utils");
const auth_service_1 = require("../../auth/services/auth.service");
const addProduct_services_1 = require("../services/addProduct.services");
exports.addProduct = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { id: userId } = req.user;
    const user = await (0, auth_service_1.existUserById)(userId);
    let files = req.files;
    const { body } = req;
    const result = await addProduct_services_1.AddProductService.addProduct(body, files, user);
    res.status(201).json({
        status: "success",
        data: result
    });
});
