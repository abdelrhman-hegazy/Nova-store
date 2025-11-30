import express from "express"
import { addToCart, deleteFromCart, getCart } from "../controller"
import { identifyCustomer } from "../../../shared/middleware/authorization/identifier"
import { cartSchema, validate } from "../../../shared/middleware"

const router = express.Router()

router.post("/add", validate(cartSchema), identifyCustomer, addToCart)
router.delete("/:cartId/delete/:productId", identifyCustomer, deleteFromCart)
router.get("/:cartId", identifyCustomer, getCart)

export const cartRouter = router