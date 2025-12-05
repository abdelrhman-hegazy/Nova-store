"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRepository = void 0;
const cart_model_1 = require("../models/cart.model");
const base_repository_1 = require("../../../shared/baseRepository/base.repository");
class CartRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(cart_model_1.Cart);
    }
}
exports.cartRepository = new CartRepository();
