"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const identifier_1 = require("../../../shared/middleware/authorization/identifier");
const middleware_1 = require("../../../shared/middleware");
const router = express_1.default.Router();
router.post("/add", (0, middleware_1.validate)(middleware_1.cartSchema), identifier_1.identifyCustomer, controller_1.addToCart);
router.delete("/:cartId/delete/:productId", identifier_1.identifyCustomer, controller_1.deleteFromCart);
exports.cartRouter = router;
