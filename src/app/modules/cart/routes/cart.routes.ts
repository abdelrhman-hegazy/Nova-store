import express from "express"
import { addToCart } from "../controller"
import { identifyCustomer } from "../../../shared/middleware/authorization/identifier"
import { cartSchema, validate } from "../../../shared/middleware"

const router = express.Router()
router.post("/add-to-cart", validate(cartSchema), identifyCustomer, addToCart)


export const cartRouter = router