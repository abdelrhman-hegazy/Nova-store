"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("./app/middleware/handleError"));
const app = (0, express_1.default)();
const catchAsync_1 = __importDefault(require("./app/utils/catchAsync"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Example route using catchAsync
app.get("/example", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Simulate an async operation
    res.status(200).json({ message: "This is an example route." });
})));
app.use(handleError_1.default);
exports.default = app;
