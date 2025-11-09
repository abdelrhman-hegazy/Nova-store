import { BaseRepository } from "../../shared/baseRepository/base.repository";

import { IProduct } from "./product.interface";
import { Product } from "./product.model";

export class ProductRepository extends BaseRepository<IProduct> {
    constructor() {
        super(Product);
    }

    // Add any additional methods specific to the Product repository here
}

export const productRepository = new ProductRepository();