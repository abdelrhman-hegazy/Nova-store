import { model, Schema } from "mongoose";
import { IOrderItem, IOrder } from "../interface/order.interface";

const orderItemSchema = new Schema<IOrderItem>({
    name: String,
    amount_cents: Number,
    description: String,
    quantity: Number,
});

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
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

export const Order = model<IOrder>("Order", orderSchema);