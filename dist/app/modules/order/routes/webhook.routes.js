"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("../controller/webhook.controller");
const express_2 = __importDefault(require("express"));
const router = (0, express_1.Router)();
router.post("/webhook/paymob", express_2.default.json({ limit: "2mb" }), webhook_controller_1.paymobWebhook);
exports.default = router;
