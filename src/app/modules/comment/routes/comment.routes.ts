
import express from "express";
import { addCommentController } from "../controller/addComment.controller";
import { identifyCustomer } from "../../../shared/middleware/authorization/identifier";
import { commentSchema, validate } from "../../../shared/middleware";
import { getAllCommentsController } from "../controller/getAllComments.controller";
import { deleteComment } from "../controller/deleteComment.controller";
const router = express.Router();

router.post("/add/:productId", validate(commentSchema), identifyCustomer, addCommentController);
router.get("/all/:productId", identifyCustomer, getAllCommentsController);
router.delete("/delete/:productId", identifyCustomer, deleteComment);

export { router as commentRouter };
