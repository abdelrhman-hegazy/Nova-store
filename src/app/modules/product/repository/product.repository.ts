import { BaseRepository } from "../../../shared/baseRepository/base.repository";
import { FilterQuery } from "mongoose";
import { IProduct } from "../interface/product.interface";
import { Product } from "../models/product.model";

export class ProductRepository extends BaseRepository<IProduct> {
    constructor() {
        super(Product);
    }
    async findWithPagination(
        filter: FilterQuery<IProduct>,
        sort: { [key: string]: 1 | -1 },
        skip: number,
        limitNumber: number
    ): Promise<IProduct[]> {
        return this.model
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber)
            .select("name images rateProduct finalPrice price discount favorites.userId ")
            .lean<IProduct[]>()
            .exec();
    }

    async getProductByFavorite(userId: string): Promise<IProduct[]> {
        return this.model
            .find({ "favorites.userId": userId })
            .select("-createdAt -updatedAt -favorites -__v")
            .lean<IProduct[]>()
            .exec();
    }

}


export const productRepository = new ProductRepository()
