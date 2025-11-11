
import { BaseRepository } from "../../../shared/baseRepository/base.repository";

import { ICategory } from "../interface/category.interface";
import { Category } from "../models/category.model";

export class CategoryRepository extends BaseRepository<ICategory> {
    constructor() {
        super(Category);
    }

    // Add any additional methods specific to the Category repository here
}

export const categoryRepository = new CategoryRepository()