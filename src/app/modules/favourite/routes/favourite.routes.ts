import express from "express";
import { toggleFavourite } from "../controller/toggleFavourite.controller";
import { getAllFavourite } from "../controller/getAllFavourite.controller";
import { identifyCustomer } from "../../../shared/middleware/authorization/identifier";
const router = express.Router();


router.post("/:productId", identifyCustomer, toggleFavourite);
router.get("/", identifyCustomer, getAllFavourite);


export { router as favouriteRouter }