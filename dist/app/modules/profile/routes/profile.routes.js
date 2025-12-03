"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = __importDefault(require("express"));
const updatePofile_controller_1 = require("../controller/updatePofile.controller");
const identifier_1 = require("../../../shared/middleware/authorization/identifier");
const middleware_1 = require("../../../shared/middleware");
const getProfile_controller_1 = require("../controller/getProfile.controller");
const router = express_1.default.Router();
router.put('/update', (0, middleware_1.validate)(middleware_1.updateProfileSchema), identifier_1.identifyCustomer, updatePofile_controller_1.updateProfile);
router.get('/get', identifier_1.identifyCustomer, getProfile_controller_1.getProfile);
exports.profileRouter = router;
