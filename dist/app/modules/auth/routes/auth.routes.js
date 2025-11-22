"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const verificationCode_controller_1 = require("../controller/verificationCode.controller");
const loginUser_controller_1 = require("../controller/loginUser.controller");
const middleware_1 = require("../../../shared/middleware");
const router = express_1.default.Router();
exports.userRouter = router;
router.post("/login", (0, middleware_1.validate)(middleware_1.emailSchema), loginUser_controller_1.loginUser);
router.post("/verify", (0, middleware_1.validate)(middleware_1.verificationSchema), verificationCode_controller_1.verificationCode);
