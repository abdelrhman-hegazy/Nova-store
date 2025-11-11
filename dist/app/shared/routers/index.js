"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../../modules/auth/routes/auth.routes");
const product_routes_1 = require("../../modules/product/routes/product.routes");
const category_routes_1 = require("../../modules/product/routes/category.routes");
const refreshToken_controller_1 = require("../../modules/auth/controller/refreshToken.controller");
const router = express_1.default.Router();
router.use("/auth", auth_routes_1.userRouter);
router.use("/auth/refresh-token", refreshToken_controller_1.refreshTokenController);
router.use("/categories", category_routes_1.categoryRouter);
router.use("/products", product_routes_1.productRouter);
exports.sharedRouter = router;
