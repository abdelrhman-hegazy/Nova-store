import {model,Schema} from "mongoose";
import {IOrder} from "../interface/order.interface";

const orderSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    paymentId : String,
    products : [],
    totalAmount : Number,
    status : String,
    createdAt : Date,
    updatedAt : Date
});

export const Order = model<IOrder>("Order",orderSchema);