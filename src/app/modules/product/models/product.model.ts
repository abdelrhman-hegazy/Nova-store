import { Model, model, Schema } from "mongoose";
import { IProduct } from "../interface/product.interface";
import { CommentSchema } from "../../comment/models/comment.model";
import { FavoriteSchema } from "../../favourite/models/favourite.model";


const ProductSchema = new Schema<IProduct>(
    ({
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
            min: 0,
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
    }) as any,
    { timestamps: true }
);

export const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);