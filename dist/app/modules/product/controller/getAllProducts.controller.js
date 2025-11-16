"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = void 0;
const utils_1 = require("../../../shared/utils");
const services_1 = require("../services");
const mongoose_1 = require("mongoose");
exports.getAllProducts = (0, utils_1.catchAsync)(async (req, res, next) => {
    const rawUserId = req.user?.id;
    const userId = rawUserId && mongoose_1.Types.ObjectId.isValid(rawUserId) ? new mongoose_1.Types.ObjectId(rawUserId) : undefined;
    const result = await services_1.GetAllProductService.getProducts(req.query, userId);
    res.status(200).json({
        status: "success",
        message: "Products fetched successfully",
        data: result
    });
});
