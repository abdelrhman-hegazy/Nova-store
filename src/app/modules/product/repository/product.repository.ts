import { BaseRepository } from "../../../shared/baseRepository/base.repository";
import { FilterQuery } from "mongoose";
import { IProduct } from "../interface/product.interface";
import { Product } from "../models/product.model";

export class ProductRepository extends BaseRepository<IProduct> {
    constructor() {
        super(Product);
    }
    async findWithPagination(filter: FilterQuery<IProduct>, sort: { [key: string]: 1 | -1 }, skip: number, limitNumber: number) {
        return this.model
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber)
            .select("name images rateProduct finalPrice price discount favorites.userId ")
            .lean()
            .exec();
    }

    async getProductByFavorite  (userId: string) {
        return this.model.find({ "favorites.userId": userId }).select("-createdAt -updatedAt -favorites -__v").lean().exec();
    }

}


export const productRepository = new ProductRepository()
