import express from "express";
import { createProductSchema, validate } from "../../../shared/middleware";
import { createProduct } from "../controller/product.controller";
import { upload } from "../../../shared/utils/cloudinary";
import { identifyVendor, identifyCustomer } from "../../../shared/middleware/authorization/identifier";

const router = express.Router();

router.post(
    "/create",
    validate(createProductSchema),
    upload.array("images", 10),
    identifyVendor,
    createProduct
);
export { router as productRouter };