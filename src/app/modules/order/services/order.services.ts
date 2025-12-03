
import axios from 'axios';
import config from '../../../shared/config';
import AppError from '../../../shared/utils/AppError';


export class PaymentService {
    static async createPayment(amount: number) {
        try {
            const authToken = await this.getAuthToken();
            const orderId = await this.createOrder(authToken, amount);
            const paymentKey = await this.createPaymentKey(authToken, orderId, amount);

            const iframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${config.payment.PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
            return iframeUrl;
        } catch (error) {
            throw new AppError((error as Error).message, 500, 'ERROR_CREATING_PAYMENT')
        }
    }

    static async getAuthToken() {
        const response = await axios.post(`${config.payment.PAYMOP_API_URL}/auth/tokens`, {
            api_key: config.payment.PAYMOP_API_KEY,
        });
        return (response as any).data.token;
    }


    static async createOrder(authToken: string, amount: number) {
        const response = await axios.post(
            `${config.payment.PAYMOP_API_URL}/ecommerce/orders`,
            {
                auth_token: authToken,
                delivery_needed: "false",
                amount_cents: amount * 100,
                currency: "EGP",
                items: [],
            }
        );
        return (response as any).data.id;
    }

    static async createPaymentKey(authToken: string, orderId: string, amount: number) {
        const response = await axios.post(
            `${config.payment.PAYMOP_API_URL}/acceptance/payment_keys`,
            {
                auth_token: authToken,
                amount_cents: amount * 100,
                expiration: 3600,
                order_id: orderId,
                billing_data: {
                    first_name: "Customer",
                    last_name: "User",
                    phone_number: "01000000000",
                    email: "customer@example.com",
                    country: "Na",
                    city: "Na",
                    street: "Na",
                    building: "Na",
                    floor: "Na",
                    apartment: "Na",
                },
                currency: "EGP",
                integration_id: config.payment.PAYMOP_INTEGRATION_ID,
            }
        );
        return (response as any).data.token;
    }


}
