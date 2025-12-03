"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderItemSchema = new mongoose_1.Schema({
    name: String,
    amount_cents: Number,
    description: String,
    quantity: Number,
});
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    paymentId: String,
    products: {
        type: [orderItemSchema],
        default: [],
        _id: false
    },
    totalAmount: Number,
    status: String,
    createdAt: Date,
    updatedAt: Date
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
