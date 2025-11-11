
import express from "express"
import { loginUser, verificationCode } from "../controller/auth.controller"
import { validate, verificationSchema, emailSchema } from "../../../shared/middleware"
const router = express.Router()

router.post("/login", validate(emailSchema), loginUser)
router.post("/verify", validate(verificationSchema), verificationCode)

export { router as userRouter }