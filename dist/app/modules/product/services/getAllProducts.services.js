"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const mongoose_1 = require("mongoose");
const product_repository_1 = require("../repository/product.repository");
const auth_service_1 = require("../../auth/services/auth.service");
class ProductService {
    static async getProducts(query, userId) {
        const { filter, sort, page, limit } = this.buildQuery(query);
        const skip = (page - 1) * limit;
        const [products, totalProducts] = await Promise.all([
            product_repository_1.productRepository.findWithPagination(filter, sort, skip, limit),
            product_repository_1.productRepository.countDocuments(filter)
        ]);
        const totalPages = Math.ceil(totalProducts / limit);
        let updatedProducts = [];
        if (!userId) {
            updatedProducts = products.map(p => {
                const isFavorite = false;
                return { ...p, isFavorite };
            });
        }
        else {
            await (0, auth_service_1.existUserById)(userId);
            updatedProducts = products.map(p => {
                const isFavorite = p.favorites.some(f => f.userId.toString() === userId.toString());
                return { ...p, isFavorite };
            });
        }
        return {
            products: updatedProducts,
            pagination: {
                currentPage: page,
                totalPages,
                totalProducts,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        };
    }
    static buildQuery(query) {
        const filter = {};
        const { name, categoryId, price, bestRated, offers, sortBy, order, limit, page } = query;
        if (typeof name === "string" && name.trim()) {
            filter.name = {
                $regex: name.trim(),
                $options: "i"
            };
        }
        if (typeof categoryId === "string" && categoryId.trim() && mongoose_1.Types.ObjectId.isValid(categoryId)) {
            filter.categoryId = new mongoose_1.Types.ObjectId(categoryId);
        }
        if (typeof price === "string" && price.trim()) {
            const priceRange = price.split("-").map(p => p.trim());
            if (priceRange.length === 2 && !isNaN(Number(priceRange[0])) && !isNaN(Number(priceRange[1]))) {
                filter.finalPrice = {
                    $gte: Number(priceRange[0]),
                    $lte: Number(priceRange[1])
                };
            }
        }
        if (typeof bestRated === "string" && bestRated.trim() && !isNaN(Number(bestRated))) {
            filter.rateProduct = { $gte: Number(bestRated) };
        }
        if (typeof offers === "string" && offers.trim() && !isNaN(Number(offers))) {
            filter.discount = { $gte: Number(offers) };
        }
        const sort = this.buildSort(sortBy, order);
        const pagination = this.buildPagination(page, limit);
        return { filter, sort, ...pagination };
    }
    static buildSort(sortBy, order) {
        const sort = {};
        const validSortFields = ["name", "price", "rateProduct", "offers", "discount", "createdAt"];
        const sortField = validSortFields.includes(sortBy || "") ? sortBy : "createdAt";
        sort[sortField] = order === "asc" ? 1 : -1;
        return sort;
    }
    static buildPagination(page, limit) {
        const pageNum = Math.max(1, parseInt(page || "1"));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit || "10")));
        return { page: pageNum, limit: limitNum };
    }
}
exports.ProductService = ProductService;
