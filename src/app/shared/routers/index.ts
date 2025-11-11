import express from "express";
import { userRouter } from "../../modules/auth/routes/auth.routes";
import { productRouter } from "../../modules/product/routes/product.routes";
import { categoryRouter } from "../../modules/product/routes/category.routes";
import { refreshTokenController } from "../../modules/auth/controller/refreshToken.controller";

const router = express.Router();

router.use("/auth", userRouter);
router.use("/auth/refresh-token", refreshTokenController)
router.use("/categories", categoryRouter);
router.use("/products", productRouter)
export const sharedRouter = router;