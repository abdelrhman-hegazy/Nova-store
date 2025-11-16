"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = __importDefault(require("express"));
const identifier_1 = require("../../../shared/middleware/authorization/identifier");
const middleware_1 = require("../../../shared/middleware");
const controller_1 = require("../controller");
const router = express_1.default.Router();
exports.commentRouter = router;
router.post("/add/:productId", (0, middleware_1.validate)(middleware_1.commentSchema), identifier_1.identifyCustomer, controller_1.addComment);
router.get("/all/:productId", identifier_1.identifyCustomer, controller_1.getAllComments);
router.delete("/delete/:productId", identifier_1.identifyCustomer, controller_1.deleteComment);
