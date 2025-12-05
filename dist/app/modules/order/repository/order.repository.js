"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = void 0;
const oreder_model_1 = require("../models/oreder.model");
const base_repository_1 = require("../../../shared/baseRepository/base.repository");
class OrderRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(oreder_model_1.Order);
    }
    async updateStatus(paymentId, status) {
        return await this.model.updateOne({ paymentId }, { status: status });
    }
}
exports.orderRepository = new OrderRepository();
