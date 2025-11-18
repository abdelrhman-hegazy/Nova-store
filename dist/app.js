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
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", routers_1.sharedRouter);
app.get("/", (req, res) => {
    res.status(200).json({ message: "welcome to the Nova-store API." });
});
app.use(handleError_1.default);
exports.default = app;
