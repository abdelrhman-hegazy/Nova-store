
import express from "express";
import { identifyCustomer } from "../../../shared/middleware/authorization/identifier";
import { commentSchema, validate } from "../../../shared/middleware";
import { getAllComments, addComment, deleteComment } from "../controller";

const router = express.Router();

router.post("/add/:productId", validate(commentSchema), identifyCustomer, addComment);
router.get("/all/:productId", identifyCustomer, getAllComments);
router.delete("/delete/:productId", identifyCustomer, deleteComment);

export { router as commentRouter };
