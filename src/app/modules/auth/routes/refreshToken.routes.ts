import express from "express"
import { refreshTokenController } from "../controller/refreshToken.controller"
const router = express.Router()


router.post("/", refreshTokenController)

export { router as refreshTokenRouter }