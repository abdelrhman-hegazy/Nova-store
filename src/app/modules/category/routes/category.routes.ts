import express from "express";
import { createCategory, getCategory, updateCategory, deleteCategory } from "../controller/category.controller";
import { upload } from "../../../shared/utils/cloudinary";
import { identifyVendor } from "../../../shared/middleware/authorization/identifier";
const router = express.Router();

router.post(
    "/create",
    identifyVendor,
    upload.single("image"),
    createCategory
);
router.get("/", getCategory);
router.put("/:id", identifyVendor, upload.single("image"), updateCategory);
router.delete("/:id", identifyVendor, deleteCategory);
export { router as categoryRouter };