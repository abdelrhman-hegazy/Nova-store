

import { PaymentGateway } from "../../domain/paymentgateway";

export class CreatePaymentUseCase {
    constructor(private gateway: PaymentGateway) {}

    async execute(userId: string) {
        return this.gateway.createPayment(userId);
    }
}