"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
}, { _id: false });
const CommentSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    rating: { type: Number, required: true, default: 1 },
    comment: { type: String, required: true, trim: true },
}, { _id: false });
const ProductSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true, ref: "User"
    },
    name: {
        type: String,
        required: true, trim: true
    },
    imageUrl: {
        type: [String],
        required: true
    },
    details: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    categorys: {
        type: [CategorySchema],
        default: []
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    rateProduct: {
        type: Number,
        required: true,
        default: 0
    },
    comments: {
        type: [CommentSchema],
        default: []
    },
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
