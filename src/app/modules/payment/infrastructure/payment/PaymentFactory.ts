import { StripeService } from "../stripe/stripeService";
import { PaymobService } from "../paymob/paymobService";
import config from "../../../../shared/config";
import AppError from "../../../../shared/utils/AppError";

export const paymentFactory = (provider: "stripe" | "paymob") => {
    if (provider === "stripe") {
        return new StripeService(config.stripe.STRIPE_SECRET_KEY!)
    }
    else if (provider === "paymob") {
        return new PaymobService()
    }
    else {
        throw new AppError("Not Found Provider \"paymop, stripe\" ", 404, "NOT_FOUND")
    }
}