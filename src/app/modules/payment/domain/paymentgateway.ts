
export interface PaymentGateway {
    createPayment(userId: string): Promise<{
        paymentId: string,
        redirectUrl?: string |null,
        clientSecret?: string |null
    }>;
}