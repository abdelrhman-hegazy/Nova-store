"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeGateway = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../../../shared/config"));
class StripeGateway {
    stripe = new stripe_1.default(config_1.default.stripe.STRIPE_SECRET_KEY);
    verifySignature(payload, sig) {
        return this.stripe.webhooks.constructEvent(payload, sig, config_1.default.stripe.STRIPE_WEBHOOK_SECRET);
    }
}
exports.StripeGateway = StripeGateway;
