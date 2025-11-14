"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../../shared/middleware");
const addProduct_controller_1 = require("../controller/addProduct.controller");
const cloudinary_1 = require("../../../shared/utils/cloudinary");
const identifier_1 = require("../../../shared/middleware/authorization/identifier");
const getAllProducts_controller_1 = require("../controller/getAllProducts.controller");
const router = express_1.default.Router();
exports.productRouter = router;
router.post("/create", (0, middleware_1.validate)(middleware_1.createProductSchema), cloudinary_1.upload.array("images", 10), identifier_1.identifyVendor, addProduct_controller_1.addProduct);
router.get("/", getAllProducts_controller_1.getAllProducts);
