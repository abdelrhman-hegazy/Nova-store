import { PaymentGateway } from "../../domain/paymentgateway";
import Stripe from "stripe";
import { cartRepository } from "../../../cart/repository/cart.repository";
import AppError from "../../../../shared/utils/AppError";
import { orderRepository } from "../../../order/repository/order.repository";
import { Types } from "mongoose";

export class StripeService implements PaymentGateway {

    private stripe: Stripe
    constructor(secretKey: string) {
        this.stripe = new Stripe(secretKey)
    }
    async createPayment(userId: string) {
        const cart = await cartRepository.findOne({ userId });
        if (!cart) {
            throw new AppError("Cart not found", 404, "CART_NOT_FOUND");
        }
        if (cart.products.length === 0) {
            throw new AppError("Cart is empty", 400, "BAD_REQUEST")
        }

        const orderItems = cart.products.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.name,
                    description: item.product.description || '',
                },
                unit_amount: item.product.priceQuantity * 100,
            },
            quantity: item.product.quantity,
        }));

        const products = cart.products.map(item => ({
            name: item.product.name,
            amount_cents: item.product.priceQuantity,
            description: item.product.description || '',
            quantity: item.product.quantity
        }));
        const order = await orderRepository.create({
            userId: new Types.ObjectId(userId),
            amount: cart.totalPrice,
            status: "pending",
            paymentId: "null",
            products: products,
        });

        const session = await this.stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: orderItems,
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            client_reference_id: order._id.toString(),
            metadata: {
                userId: userId,
                totalPrice: cart.totalPrice,
            }
        })
        console.log("session.client_reference_id:", session.client_reference_id);
        console.log("session", session);

        await cartRepository.updateOne({ userId }, { paymentId: session.client_reference_id });

        return {
            paymentId: session.id,
            redirectUrl: session.url
        }
    }
}