"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const addComment_controller_1 = require("../controller/addComment.controller");
const identifier_1 = require("../../../shared/middleware/authorization/identifier");
const middleware_1 = require("../../../shared/middleware");
const getAllComments_controller_1 = require("../controller/getAllComments.controller");
const deleteComment_controller_1 = require("../controller/deleteComment.controller");
const router = express_1.default.Router();
exports.commentRouter = router;
router.post("/add/:productId", (0, middleware_1.validate)(middleware_1.commentSchema), identifier_1.identifyCustomer, addComment_controller_1.addCommentController);
router.get("/all/:productId", identifier_1.identifyCustomer, getAllComments_controller_1.getAllCommentsController);
router.delete("/delete/:productId", identifier_1.identifyCustomer, deleteComment_controller_1.deleteComment);
