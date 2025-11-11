
import { Types } from "mongoose";

export interface IProduct {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    name: string;
    images: {url: string, publicId: string}[];
    details: string;
    price: number;
    finalPrice: number;
    discount?: number;
    categoryId: Types.ObjectId;
    stock: number;
    rateProduct: number;
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}


export interface IComment {
    userId: Types.ObjectId;
    rating: number;
    comment: string;
}
