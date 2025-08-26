import express from "express"

import{loginUser}from "../controller"
import { validate } from "../middleware/validator"
import { emailSchema } from "../middleware/schema"

const router = express.Router()

router.post("/login",validate(emailSchema),loginUser)

export { router as userRoutes }