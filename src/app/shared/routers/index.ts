import express from "express";
import { userRouter } from "../../modules/auth/routes/auth.routes";
import { productRouter } from "../../modules/product/routes/product.routes";
import { categoryRouter } from "../../modules/category/routes/category.routes";
import { refreshTokenController } from "../../modules/auth/controller/refreshToken.controller";
import { commentRouter } from "../../modules/comment/routes/comment.routes";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/auth/refresh-token", refreshTokenController)
router.use("/categories", categoryRouter);
router.use("/products", productRouter)
router.use("/comments", commentRouter)
export const sharedRouter = router;