
import { Types } from "mongoose";
import { IComment } from "../../comment/interface/comment.interface";

export interface IProduct {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    name: string;
    images: { url: string, publicId: string }[];
    details: string;
    price: number;
    finalPrice: number;
    discount?: number;
    categoryId: Types.ObjectId;
    stock: number;
    rateProduct: number;
    comments: IComment[];
    favorites: IFavorite[];
    createdAt: Date;
    updatedAt: Date;
}


export interface IFavorite {
    userId: Types.ObjectId;
}
export interface ProductQueryParams {
    name?: string;
    categoryId?: string;
    price?: string;
    bestRated?: string;
    offers?: string;
    sortBy?: string;
    order?: string;
    limit?: string;
    page?: string;
}

export interface PaginatedProducts {
    products: IProduct[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalProducts: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}