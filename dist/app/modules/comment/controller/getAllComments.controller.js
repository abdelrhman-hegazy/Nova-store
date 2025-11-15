"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCommentsController = void 0;
const utils_1 = require("../../../shared/utils");
const getAllComments_services_1 = require("../services/getAllComments.services");
exports.getAllCommentsController = (0, utils_1.catchAsync)(async (req, res) => {
    const productId = req.params.productId;
    const result = await getAllComments_services_1.GetAllCommentsService.getAllComments(productId);
    res.status(200).json(result);
});
