import { sharedServices } from "../../../shared/services";


export class GetAllCommentsService {
    static async getAllComments(productId: string) {
        const product = await sharedServices.existingProduct(productId);
        return product.comments;
    }
}