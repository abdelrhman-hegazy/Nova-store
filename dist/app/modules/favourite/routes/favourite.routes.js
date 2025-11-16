"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favouriteRouter = void 0;
const express_1 = __importDefault(require("express"));
const toggleFavourite_controller_1 = require("../controller/toggleFavourite.controller");
const getAllFavourite_controller_1 = require("../controller/getAllFavourite.controller");
const identifier_1 = require("../../../shared/middleware/authorization/identifier");
const router = express_1.default.Router();
exports.favouriteRouter = router;
router.post("/:productId", identifier_1.identifyCustomer, toggleFavourite_controller_1.toggleFavourite);
router.get("/", identifier_1.identifyCustomer, getAllFavourite_controller_1.getAllFavourite);
