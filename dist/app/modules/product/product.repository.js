"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepository = exports.ProductRepository = void 0;
const base_repository_1 = require("../../shared/baseRepository/base.repository");
const product_model_1 = require("./product.model");
class ProductRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(product_model_1.Product);
    }
}
exports.ProductRepository = ProductRepository;
exports.productRepository = new ProductRepository();
