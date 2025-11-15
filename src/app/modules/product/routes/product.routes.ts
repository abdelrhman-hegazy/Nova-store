import express from "express";
import { productSchema, updateProductSchema, validate } from "../../../shared/middleware";
import { upload } from "../../../shared/utils/cloudinary";
import { identifyVendor } from "../../../shared/middleware/authorization/identifier";
import { getProductById, addProduct, getAllProducts, deleteProduct, updateProduct } from "../controller";
const router = express.Router();

router.post(
    "/create",
    upload.array("images", 10),
    validate(productSchema),
    identifyVendor,
    addProduct
);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", identifyVendor, deleteProduct);
router.put("/:id", upload.array("images", 10), validate(updateProductSchema), identifyVendor, updateProduct);
export { router as productRouter };