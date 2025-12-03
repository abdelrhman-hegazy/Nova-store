"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [],
    totalAmount: Number,
    status: String,
    createdAt: Date,
    updatedAt: Date
});
