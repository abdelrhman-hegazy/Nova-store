
import { Types } from "mongoose";

export interface IProduct {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    name: string;
    imageUrl: string[];
    details: string;
    price: number;
    finalPrice: number;
    discount?: number;
    categorys: ICategory[];
    stock: number;
    rateProduct: number;
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ICategory {
    name: string;
    imageUrl: string;
}

export interface IComment {
    userId: Types.ObjectId;
    rating: number;
    comment: string;
}
