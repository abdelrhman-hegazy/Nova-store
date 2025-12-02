import express from "express"
import { addToCart, deleteFromCart, getCart, updateCountProductCart } from "../controller"
import { identifyCustomer } from "../../../shared/middleware/authorization/identifier"
import { cartSchema, validate } from "../../../shared/middleware"

const router = express.Router()

router.post("/add/:productId", validate(cartSchema), identifyCustomer, addToCart)
router.delete("/delete/:productId", identifyCustomer, deleteFromCart)
router.get("/", identifyCustomer, getCart)
router.put("/update/:productId", identifyCustomer, updateCountProductCart)

export const cartRouter = router