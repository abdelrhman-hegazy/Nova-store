import express from "express";
import { createProductSchema, validate } from "../../../shared/middleware";
import { addProduct } from "../controller/addProduct.controller";
import { upload } from "../../../shared/utils/cloudinary";
import { identifyVendor, identifyCustomer } from "../../../shared/middleware/authorization/identifier";
import { getAllProducts } from "../controller/getAllProducts.controller";
const router = express.Router();

router.post(
    "/create",
    validate(createProductSchema),
    upload.array("images", 10),
    identifyVendor,
    addProduct
);
router.get("/", getAllProducts);
export { router as productRouter };