import { Types } from "mongoose";

export interface  ICart {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    products: {
        product: {
            productId: Types.ObjectId,
            name: string,
            description: string,
            image: string,
            quantity: number,
            priceQuantity: number
        },
    }[],
    paymentId:String,
    totalPrice: number
    createdAt: Date,
    updatedAt: Date
}

