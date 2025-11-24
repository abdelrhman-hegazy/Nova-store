
import express from "express"
import { verificationCode } from "../controller/verificationCode.controller"
import { loginUser } from "../controller/loginUser.controller"
import { validate, verificationSchema, emailSchema } from "../../../shared/middleware"
const router = express.Router()

router.get("/login", validate(emailSchema), loginUser)
router.get("/verify", validate(verificationSchema), verificationCode)

export { router as userRouter }