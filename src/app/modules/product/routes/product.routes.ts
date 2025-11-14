import express from "express";
import { createProductSchema, validate } from "../../../shared/middleware";
import { upload } from "../../../shared/utils/cloudinary";
import { identifyVendor } from "../../../shared/middleware/authorization/identifier";
import { getProductById, addProduct, getAllProducts, deleteProductController } from "../controller";
const router = express.Router();

router.post(
    "/create",
    validate(createProductSchema),
    upload.array("images", 10),
    identifyVendor,
    addProduct
);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductController);
export { router as productRouter };