import express from "express";
import { userRouter } from "../../modules/auth/routes/auth.routes";
import { productRouter } from "../../modules/product/routes/product.routes";
import { categoryRouter } from "../../modules/category/routes/category.routes";
import { refreshTokenRouter } from "../../modules/auth/routes/refreshToken.routes";
import { commentRouter } from "../../modules/comment/routes/comment.routes";
import { favouriteRouter } from "../../modules/favourite/routes/favourite.routes";
import { cartRouter } from "../../modules/cart/routes/cart.routes";
import { paymentRouter } from "../../modules/order/routes/order.routes";
import { profileRouter } from "../../modules/profile/routes/profile.routes";
const router = express.Router();

router.use("/auth", userRouter);
router.use("/auth/refresh-token", refreshTokenRouter)
router.use("/categories", categoryRouter);
router.use("/products", productRouter)
router.use("/comments", commentRouter)
router.use("/favourites", favouriteRouter)
router.use("/cart",cartRouter)
router.use("/payment",paymentRouter)
router.use("/profile",profileRouter)
export const sharedRouter = router;