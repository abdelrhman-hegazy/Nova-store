"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FavoriteSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
}, { _id: false });
