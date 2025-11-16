"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = void 0;
const utils_1 = require("../../../shared/utils");
const services_1 = require("../services");
exports.deleteComment = (0, utils_1.catchAsync)(async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user.id;
    const result = await services_1.DeleteCommentService.deleteComment(productId, userId);
    res.status(200).json(result);
});
