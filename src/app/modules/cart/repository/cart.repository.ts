import { Cart } from "../models/cart.model";
import { ICart } from "../interface/cart.interface";
import { BaseRepository } from "../../../shared/baseRepository/base.repository";
import { IProduct } from "../../product/interface/product.interface";


class CartRepository extends BaseRepository<ICart> {
    constructor(){
        super(Cart)
    }
    async createProduct(userId:string,product:IProduct){
        const cart = await Cart.create({
            
        })

    }
}

export const cartRepository = new CartRepository()
