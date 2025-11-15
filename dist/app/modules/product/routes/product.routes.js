"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../../shared/middleware");
const cloudinary_1 = require("../../../shared/utils/cloudinary");
const identifier_1 = require("../../../shared/middleware/authorization/identifier");
const controller_1 = require("../controller");
const router = express_1.default.Router();
exports.productRouter = router;
router.post("/create", cloudinary_1.upload.array("images", 10), (0, middleware_1.validate)(middleware_1.productSchema), identifier_1.identifyVendor, controller_1.addProduct);
router.get("/", controller_1.getAllProducts);
router.get("/:id", controller_1.getProductById);
router.delete("/:id", identifier_1.identifyVendor, controller_1.deleteProduct);
router.put("/:id", cloudinary_1.upload.array("images", 10), (0, middleware_1.validate)(middleware_1.updateProductSchema), identifier_1.identifyVendor, controller_1.updateProduct);
