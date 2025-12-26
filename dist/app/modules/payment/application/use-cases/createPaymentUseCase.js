"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentUseCase = void 0;
class CreatePaymentUseCase {
    gateway;
    constructor(gateway) {
        this.gateway = gateway;
    }
    async execute(userId) {
        return this.gateway.createPayment(userId);
    }
}
exports.CreatePaymentUseCase = CreatePaymentUseCase;
