"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controller/category.controller");
const cloudinary_1 = require("../../../shared/utils/cloudinary");
const identifier_1 = require("../../../shared/middleware/authorization/identifier");
const router = express_1.default.Router();
exports.categoryRouter = router;
router.post("/create", identifier_1.identifyVendor, cloudinary_1.upload.single("image"), category_controller_1.createCategory);
router.get("/", category_controller_1.getCategory);
router.put("/:id", identifier_1.identifyVendor, cloudinary_1.upload.single("image"), category_controller_1.updateCategory);
router.delete("/:id", identifier_1.identifyVendor, category_controller_1.deleteCategory);
