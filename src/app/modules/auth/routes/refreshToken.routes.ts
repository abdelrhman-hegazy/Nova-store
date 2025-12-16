import express from "express"
import { refreshToken } from "../controller"
const router = express.Router()


router.post("/", refreshToken)

export { router as refreshTokenRouter }