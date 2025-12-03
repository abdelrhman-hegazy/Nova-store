import mongoose from "mongoose";

export interface IOrder {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    paymentId: string;
    products: []
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}