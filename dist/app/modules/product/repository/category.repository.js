"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRepository = exports.CategoryRepository = void 0;
const base_repository_1 = require("../../../shared/baseRepository/base.repository");
const category_model_1 = require("../models/category.model");
class CategoryRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(category_model_1.Category);
    }
}
exports.CategoryRepository = CategoryRepository;
exports.categoryRepository = new CategoryRepository();
