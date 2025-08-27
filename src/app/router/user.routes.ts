import express from "express"

import{loginUser,verificationCode}from "../controller"
import {validate,verificationSchema,emailSchema} from "../middleware"


const router = express.Router()

router.post("/login",validate(emailSchema),loginUser)
router.post("/verify", validate(verificationSchema), verificationCode)

export { router as userRoutes }