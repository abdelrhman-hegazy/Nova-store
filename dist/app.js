"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("./app/shared/middleware/handleError"));
const routers_1 = require("./app/shared/routers");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const webhook_controller_1 = require("./app/modules/order/controller/webhook.controller");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
app.post("/api/v1/payment/webhook/stripe", express_1.default.raw({ type: "application/json" }), webhook_controller_1.WebhookController.stripe());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", routers_1.sharedRouter);
app.use("/api/test", (req, res) => {
    res.status(200).json({ message: "test endpoint working" });
});
app.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to the Nova-store API." });
});
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is healthy",
        timestamp: new Date().toISOString()
    });
});
app.use(handleError_1.default);
exports.default = app;
