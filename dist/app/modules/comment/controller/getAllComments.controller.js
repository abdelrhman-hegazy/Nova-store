"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllComments = void 0;
const utils_1 = require("../../../shared/utils");
const services_1 = require("../services");
exports.getAllComments = (0, utils_1.catchAsync)(async (req, res) => {
    const productId = req.params.productId;
    const result = await services_1.GetAllCommentsService.getAllComments(productId);
    res.status(200).json(result);
});
