"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../../shared/config"));
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
class PaymentService {
    static async createPayment(amount) {
        try {
            const authToken = await this.getAuthToken();
            const orderId = await this.createOrder(authToken, amount);
            const paymentKey = await this.createPaymentKey(authToken, orderId, amount);
            const iframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${config_1.default.payment.PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
            return iframeUrl;
        }
        catch (error) {
            throw new AppError_1.default(error.message, 500, 'ERROR_CREATING_PAYMENT');
        }
    }
    static async getAuthToken() {
        const response = await axios_1.default.post(`${config_1.default.payment.PAYMOP_API_URL}/auth/tokens`, {
            api_key: config_1.default.payment.PAYMOP_API_KEY,
        });
        return response.data.token;
    }
    static async createOrder(authToken, amount) {
        const response = await axios_1.default.post(`${config_1.default.payment.PAYMOP_API_URL}/ecommerce/orders`, {
            auth_token: authToken,
            delivery_needed: "false",
            amount_cents: amount * 100,
            currency: "EGP",
            items: [],
        });
        return response.data.id;
    }
    static async createPaymentKey(authToken, orderId, amount) {
        const response = await axios_1.default.post(`${config_1.default.payment.PAYMOP_API_URL}/acceptance/payment_keys`, {
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
            integration_id: config_1.default.payment.PAYMOP_INTEGRATION_ID,
        });
        return response.data.token;
    }
}
exports.PaymentService = PaymentService;
