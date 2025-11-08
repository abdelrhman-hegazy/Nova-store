import express from "express";
import { userRouter } from "../../modules/auth/auth.routes";

export * from "../../modules/auth/auth.routes";

const router = express.Router();

router.use("/auth", userRouter);

export const sharedRouter = router;