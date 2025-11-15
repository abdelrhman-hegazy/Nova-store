"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentController = void 0;
const addComment_services_1 = require("../services/addComment.services");
const utils_1 = require("../../../shared/utils");
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
exports.addCommentController = (0, utils_1.catchAsync)(async (req, res) => {
    const { comment, rate } = req.body;
    if (!comment && !rate) {
        throw new AppError_1.default("Invalid comment", 400, "BAD_REQUEST");
    }
    const productId = req.params.productId;
    const userId = req.user.id;
    const result = await addComment_services_1.addCommentService.addComment({ userId, comment: comment || "", rate: rate || 1 }, productId);
    res.status(200).json(result);
});
