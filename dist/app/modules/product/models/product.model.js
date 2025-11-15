"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const comment_model_1 = require("../../comment/models/comment.model");
const FavoriteSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
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
    images: {
        type: [{ url: String, publicId: String, _id: false }],
        required: true
    },
    details: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    finalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    rateProduct: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5
    },
    comments: {
        type: [comment_model_1.CommentSchema],
        default: []
    },
    favorites: {
        type: [FavoriteSchema],
        default: []
    }
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)("Product", ProductSchema);
