// services/product.service.ts
import { FilterQuery, Types } from "mongoose";
import { IProduct } from "../interface/product.interface";
import { productRepository } from "../repository/product.repository";
import { ProductQueryParams, PaginatedProducts } from "../interface/product.interface";
import { sharedServices } from "../../../shared/services";

export class GetAllProductService {
    static async getProducts(query: ProductQueryParams, userId: Types.ObjectId | undefined): Promise<PaginatedProducts> {
        const { filter, sort, page, limit } = this.buildQuery(query);
        const skip = (page - 1) * limit;
        const [products, totalProducts] = await Promise.all([
            productRepository.findWithPagination(filter, sort, skip, limit),
            productRepository.countDocuments(filter)
        ]);

        const totalPages = Math.ceil(totalProducts / limit);
        let updatedProducts: IProduct[] = [];
        if (!userId) {
            updatedProducts = products.map(p => {
                const isFavorite = false
                return { ...p, isFavorite }
            });
        }
        else {
            await sharedServices.existUserById(userId.toString())
            updatedProducts = products.map(p => {
                const isFavorite = p.favorites.some(f => f.userId.toString() === userId.toString())
                return { ...p, isFavorite }
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
    private static buildQuery(query: ProductQueryParams) {
        const filter: FilterQuery<IProduct> = {};
        const { name, categoryId, price, bestRated, offers, sortBy, order, limit, page } = query;

        // Search by name (case-insensitive)
        if (typeof name === "string" && name.trim()) {
            filter.name = {
                $regex: name.trim(),
                $options: "i"
            };
        }

        // Filter by category
        if (typeof categoryId === "string" && categoryId.trim() && Types.ObjectId.isValid(categoryId)) {
            filter.categoryId = new Types.ObjectId(categoryId);
        }

        // Filter by price range
        if (typeof price === "string" && price.trim()) {
            const priceRange = price.split("-").map(p => p.trim());
            if (priceRange.length === 2 && !isNaN(Number(priceRange[0])) && !isNaN(Number(priceRange[1]))) {
                filter.finalPrice = {
                    $gte: Number(priceRange[0]),
                    $lte: Number(priceRange[1])
                };
            }
        }

        // Filter by minimum rating
        if (typeof bestRated === "string" && bestRated.trim() && !isNaN(Number(bestRated))) {
            filter.rateProduct = { $gte: Number(bestRated) };
        }

        // Filter by minimum discount
        if (typeof offers === "string" && offers.trim() && !isNaN(Number(offers))) {
            filter.discount = { $gte: Number(offers) };
        }

        const sort = this.buildSort(sortBy, order); // ex createAt = 1 || -1
        const pagination = this.buildPagination(page, limit);

        return { filter, sort, ...pagination };
    }

    private static buildSort(sortBy?: string, order?: string) {
        const sort: { [key: string]: 1 | -1 } = {};
        const validSortFields = ["name", "price", "rateProduct", "offers", "discount", "createdAt"];
        const sortField = validSortFields.includes(sortBy || "") ? sortBy : "createdAt";
        sort[sortField as string] = order === "asc" ? 1 : -1;
        return sort;
    }

    private static buildPagination(page?: string, limit?: string) {
        const pageNum = Math.max(1, parseInt(page || "1"));
        const limitNum = Math.min(100, Math.max(1, parseInt(limit || "10")));
        return { page: pageNum, limit: limitNum };
    }
}