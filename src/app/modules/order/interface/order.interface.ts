import mongoose from "mongoose";

export interface IOrder {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    paymentId: string;
    products: IOrderItem[];
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export type IOrderItem = {
    name: string;
    amount_cents: number;
    description: string;
    quantity: number;
}
