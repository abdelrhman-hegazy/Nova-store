export * from "./user.routes";




import express from "express";
import { userRoutes } from "./user.routes";
const router = express.Router();

router.use("/users", userRoutes);

export { router as routers };
