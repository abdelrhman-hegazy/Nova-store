import express from "express";
import { createCategory } from "../controller/category.controller";
import { upload } from "../../../shared/utils/cloudinary";

const router = express.Router();

router.post(
    "/create",
    upload.single("image"),
    createCategory
);
export { router as categoryRouter };