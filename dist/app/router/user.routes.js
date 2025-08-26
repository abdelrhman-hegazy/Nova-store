"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const validator_1 = require("../middleware/validator");
const schema_1 = require("../middleware/schema");
const router = express_1.default.Router();
exports.userRoutes = router;
router.post("/login", (0, validator_1.validate)(schema_1.emailSchema), controller_1.loginUser);
