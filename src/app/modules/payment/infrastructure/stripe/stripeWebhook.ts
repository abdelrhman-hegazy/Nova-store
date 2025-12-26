import Stripe from 'stripe';
import config from '../../../../shared/config';

export class StripeGateway {
    private stripe = new Stripe(config.stripe.STRIPE_SECRET_KEY!)

    verifySignature(payload: Buffer, sig: string) {
        return this.stripe.webhooks.constructEvent(
            payload,
            sig,
            config.stripe.STRIPE_WEBHOOK_SECRET!
        );
    }
}