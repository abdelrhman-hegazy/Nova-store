import { Cart } from "../models/cart.model";
import { ICart } from "../interface/cart.interface";
import { BaseRepository } from "../../../shared/baseRepository/base.repository";
import { Types } from "mongoose";


class CartRepository extends BaseRepository<ICart> {
    constructor() {
        super(Cart)
    }

}

export const cartRepository = new CartRepository()
