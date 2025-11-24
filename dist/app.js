"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("./app/shared/middleware/handleError"));
const app = (0, express_1.default)();
const routers_1 = require("./app/shared/routers");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", apiLimiter, routers_1.sharedRouter);
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
