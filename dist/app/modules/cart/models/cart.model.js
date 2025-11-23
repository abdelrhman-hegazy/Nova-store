"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            priceQuantity: {
                type: Number,
                min: 0,
                required: true
            },
            _id: false
        }],
    totalPrice: {
        type: Number,
        min: 0,
        required: true
    }
}, { timestamps: true });
exports.Cart = (0, mongoose_1.model)("Cart", cartSchema);
