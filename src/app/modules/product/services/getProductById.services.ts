import { sharedServices } from "../../../shared/services";


export class GetProductByIdService {
    static async getProductById(id: string) {
        const product = await sharedServices.existingProduct(id);
        return product;
    }
}