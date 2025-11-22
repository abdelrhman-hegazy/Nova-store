
import express from "express"
import { verificationCode } from "../controller/verificationCode.controller"
import { loginUser } from "../controller/loginUser.controller"
import { validate, verificationSchema, emailSchema } from "../../../shared/middleware"
const router = express.Router()

router.post("/login", validate(emailSchema), loginUser)
router.post("/verify", validate(verificationSchema), verificationCode)

export { router as userRouter }