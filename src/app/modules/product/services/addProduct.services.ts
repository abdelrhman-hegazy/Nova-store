import { productRepository } from "../repository/product.repository";
import { categoryRepository } from "../../category/repository/category.repository";
import AppError from "../../../shared/utils/AppError";
import { uploadMultipleToCloudinary } from "../../../shared/utils/cloudinary";
import { IProduct } from "../interface/product.interface";


export class AddProductService {
    static async addProduct(body: IProduct, files: any, user: any) {
        const category = await categoryRepository.findById(body.categoryId);
        if (!category) {
            throw new AppError("Category not found", 404, "NOT_FOUND");
        }

        const finalPrice = body.discount
            ? body.price - (body.price * (body.discount / 100))
            : body.price;

        const uploadedImages = await uploadMultipleToCloudinary(files);
        const product = await productRepository.create({
            name: body.name,
            details: body.details,
            price: body.price,
            discount: body.discount || 0,
            finalPrice: finalPrice,
            stock: body.stock || 1,
            categoryId: category._id,
            userId: user._id,
            images: uploadedImages
        });
        return product;
    }
}