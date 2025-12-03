"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../../shared/config"));
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const order_repository_1 = require("../repository/order.repository");
const cart_repository_1 = require("../../cart/repository/cart.repository");
const services_1 = require("../../../shared/services");
const mongoose_1 = require("mongoose");
class PaymentService {
    static async createPayment(userId) {
        try {
            const authToken = await this.getAuthToken();
            const orderId = await this.createOrder(authToken, userId);
            const paymentKey = await this.createPaymentKey(authToken, orderId, userId);
            const iframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${config_1.default.payment.PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
            return iframeUrl;
        }
        catch (error) {
            console.log("error", error);
            throw new AppError_1.default(error.message, 500, 'ERROR_CREATING_PAYMENT');
        }
    }
    static async getAuthToken() {
        const response = await axios_1.default.post(`${config_1.default.payment.PAYMOP_API_URL}/auth/tokens`, {
            api_key: config_1.default.payment.PAYMOP_API_KEY,
        });
        return response.data.token;
    }
    static async createOrder(authToken, userId) {
        const cart = await cart_repository_1.cartRepository.findOne({ userId });
        if (!cart) {
            throw new AppError_1.default("Cart not found", 404, "CART_NOT_FOUND");
        }
        const response = await axios_1.default.post(`${config_1.default.payment.PAYMOP_API_URL}/ecommerce/orders`, {
            auth_token: authToken,
            delivery_needed: "false",
            amount_cents: cart.totalPrice * 100,
            currency: "EGP",
            items: cart.products,
        });
        const orderId = response.data.id;
        await order_repository_1.orderRepository.create({
            userId: new mongoose_1.Types.ObjectId(userId),
            amount: cart.totalPrice,
            status: "pending",
            paymentId: orderId,
            products: cart?.products,
        });
        return orderId;
    }
    static async createPaymentKey(authToken, orderId, userId) {
        const user = await services_1.sharedServices.existUserById(userId);
        const cart = await cart_repository_1.cartRepository.findOne({ userId });
        if (!cart) {
            throw new AppError_1.default("Cart not found", 404, "CART_NOT_FOUND");
        }
        const response = await axios_1.default.post(`${config_1.default.payment.PAYMOP_API_URL}/acceptance/payment_keys`, {
            auth_token: authToken,
            amount_cents: cart.totalPrice * 100,
            expiration: 3600,
            order_id: orderId,
            billing_data: {
                first_name: user.first_name,
                last_name: user.last_name,
                phone_number: user.mobileNumber,
                email: user.email,
                country: user.country,
                city: user.city,
                street: user.street,
                building: user.building,
                floor: user.floor,
                apartment: user.apartment,
            },
            currency: "EGP",
            integration_id: config_1.default.payment.PAYMOP_INTEGRATION_ID,
        });
        return response.data.token;
    }
}
exports.PaymentService = PaymentService;
