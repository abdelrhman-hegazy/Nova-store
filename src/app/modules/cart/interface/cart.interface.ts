import { Types } from "mongoose";

export interface ICart {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    products: {
        productId: Types.ObjectId,
        quantity: number,
        priceQuantity: number
    }[],
    totalPrice: number
    createdAt: Date,
    updatedAt: Date
}

