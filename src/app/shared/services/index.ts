import { Types } from "mongoose";
import AppError from "../utils/AppError";
import { productRepository } from "../../modules/product/repository/product.repository";
import { userRepository } from "../../modules/auth/repository/user.repository";

export class sharedServices {
    static async validateObjectId(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid ID", 400, "BAD_REQUEST");
        }
    }
    static async existingProduct(id: string) {
        const product = await productRepository.findById(id);
        if (!product) {
            throw new AppError("Product not found", 404, "NOT_FOUND");
        }
        return product;
    }
    static async existUserById(userId: string) {
        const user = await userRepository.findById(userId)
        if (!user) {
            throw new AppError("User No Found", 404, "NOT_FOUND")
        }
        return user
    }
}