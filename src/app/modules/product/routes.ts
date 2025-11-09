import express from "express";
import { createProductSchema, validate } from "../../shared/middleware";
import { createProduct } from "./controller";


const router = express.Router();

router.post(
    "/products",
    validate(createProductSchema),
    createProduct
);
export { router as productRouter };