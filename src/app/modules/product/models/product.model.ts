import { Model, model, Schema } from "mongoose";
import { IProduct, IComment } from "../interface/product.interface";

const FavoriteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
},
    { _id: false }
)

const CommentSchema = new Schema<IComment>(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        rating: { type: Number, required: true, default: 1 },
        comment: { type: String, required: true, trim: true },
    },
    { _id: false }
);

const ProductSchema = new Schema<IProduct>(
    {
        userId: {
            type: Schema.Types.ObjectId,
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
            type: Schema.Types.ObjectId,
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
            type: [CommentSchema],
            default: []
        },
        favorites: {
            type: [FavoriteSchema],
            default: []
        }
    },
    { timestamps: true }
);

export const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);