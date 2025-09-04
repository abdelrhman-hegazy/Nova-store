import express from "express";
import { userRouter } from "../../modules/authentication/auth.routes";

export * from "../../modules/authentication/auth.routes";

const router = express.Router();

router.use("/auth", userRouter);

export const sharedRouter = router;