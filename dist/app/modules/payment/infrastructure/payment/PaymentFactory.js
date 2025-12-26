"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentFactory = void 0;
const stripeService_1 = require("../stripe/stripeService");
const paymobService_1 = require("../paymob/paymobService");
const config_1 = __importDefault(require("../../../../shared/config"));
const AppError_1 = __importDefault(require("../../../../shared/utils/AppError"));
const paymentFactory = (provider) => {
    if (provider === "stripe") {
        return new stripeService_1.StripeService(config_1.default.stripe.STRIPE_SECRET_KEY);
    }
    else if (provider === "paymob") {
        return new paymobService_1.PaymobService();
    }
    else {
        throw new AppError_1.default("Not Found Provider \"paymop, stripe\" ", 404, "NOT_FOUND");
    }
};
exports.paymentFactory = paymentFactory;
