"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepository = exports.ProductRepository = void 0;
const base_repository_1 = require("../../../shared/baseRepository/base.repository");
const product_model_1 = require("../models/product.model");
class ProductRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(product_model_1.Product);
    }
    async findWithPagination(filter, sort, skip, limitNumber) {
        return this.model
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limitNumber)
            .select("name images rateProduct finalPrice price discount favorites.userId")
            .lean()
            .exec();
    }
    async getProductById(id) {
        return this.model.findById(id).select("-createdAt -updatedAt -favorites -__v").lean().exec();
    }
}
exports.ProductRepository = ProductRepository;
exports.productRepository = new ProductRepository();
