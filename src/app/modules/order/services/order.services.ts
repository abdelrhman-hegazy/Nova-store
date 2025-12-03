
import axios from 'axios';
import config from '../../../shared/config';
import AppError from '../../../shared/utils/AppError';
import { orderRepository } from '../repository/order.repository';
import { cartRepository } from '../../cart/repository/cart.repository';
import { sharedServices } from '../../../shared/services';
import { Types } from 'mongoose';
export class PaymentService {

    static async createPayment(userId: string) {
        try {
            const authToken = await this.getAuthToken();
            const orderId = await this.createOrder(authToken, userId);
            const paymentKey = await this.createPaymentKey(authToken, orderId, userId);

            const iframeUrl = `https://accept.paymobsolutions.com/api/acceptance/iframes/${config.payment.PAYMOB_IFRAME_ID}?payment_token=${paymentKey}`;
            return iframeUrl;
        } catch (error) {
            console.log("error", error);

            throw new AppError((error as Error).message, 500, 'ERROR_CREATING_PAYMENT')
        }
    }

    static async getAuthToken() {
        const response = await axios.post(`${config.payment.PAYMOP_API_URL}/auth/tokens`, {
            api_key: config.payment.PAYMOP_API_KEY,
        });
        return (response as any).data.token;
    }


    static async createOrder(authToken: string, userId: string) {
        const cart = await cartRepository.findOne({ userId });

        if (!cart) {
            throw new AppError("Cart not found", 404, "CART_NOT_FOUND");
        }
        // const orderItems = cart.products.map(item => ({
            
        //     name: item.productId.name,
        //     amount_cents: Math.round(item.priceQuantity * 100),
        //     description: item.productId.description || '',
        //     quantity: item.quantity
        // }));

        const response = await axios.post(
            `${config.payment.PAYMOP_API_URL}/ecommerce/orders`,
            {
                auth_token: authToken,
                delivery_needed: "false",
                amount_cents: cart.totalPrice * 100,
                currency: "EGP",
                items: cart.products,
            }
        );
        const orderId = (response as any).data.id;
        await orderRepository.create({
            userId: new Types.ObjectId(userId),
            amount: cart.totalPrice,
            status: "pending",
            paymentId: orderId,
            products: cart?.products as [],
        });
        return orderId;
    }

    static async createPaymentKey(authToken: string, orderId: string, userId: string) {
        const user = await sharedServices.existUserById(userId);
        const cart = await cartRepository.findOne({ userId });
        if (!cart) {
            throw new AppError("Cart not found", 404, "CART_NOT_FOUND");
        }
        const response = await axios.post(
            `${config.payment.PAYMOP_API_URL}/acceptance/payment_keys`,
            {
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
                integration_id: config.payment.PAYMOP_INTEGRATION_ID,
            }
        );
        return (response as any).data.token;
    }


}
