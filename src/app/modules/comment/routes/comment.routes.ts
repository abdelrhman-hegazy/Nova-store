
import express from "express";
import { addCommentController } from "../controller/addComment.controller";
import { identifyCustomer } from "../../../shared/middleware/authorization/identifier";
import { commentSchema, validate } from "../../../shared/middleware";
const router = express.Router();

router.post("/add/:productId", validate(commentSchema), identifyCustomer, addCommentController);

export { router as commentRouter };
