"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    image: { type: { url: String, publicId: String }, required: true, trim: true },
});
exports.Category = (0, mongoose_1.model)("Category", CategorySchema);
