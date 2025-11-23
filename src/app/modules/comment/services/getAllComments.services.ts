import { sharedServices } from "../../../shared/services";


export class GetAllCommentsService {
    static async getAllComments(productId: string) {
        const product = await sharedServices.existProductById(productId);
        return product.comments;
    }
}