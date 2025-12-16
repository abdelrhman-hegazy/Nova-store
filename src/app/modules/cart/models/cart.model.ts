import { Schema, model } from "mongoose";
import { ICart } from "../interface/cart.interface";


const cartSchema = new Schema<ICart>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        product: {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            name: String,
            description: String,
            image: String,
            quantity: Number,
            priceQuantity: Number
        },
        _id: false
    }],
    totalPrice: {
        type: Number,
        min: 0,
        required: true
    },
    orderId:{
       type:String,
       default:null
    }

}, { timestamps: true })

export const Cart = model<ICart>("Cart", cartSchema)
