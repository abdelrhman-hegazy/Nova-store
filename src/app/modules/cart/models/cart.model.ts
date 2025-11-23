import { Schema, model } from "mongoose";
import { ICart } from "../interface/cart.interface";


const cartSchema = new Schema<ICart>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
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

}, { timestamps: true })

export const Cart = model<ICart>("Cart", cartSchema)
