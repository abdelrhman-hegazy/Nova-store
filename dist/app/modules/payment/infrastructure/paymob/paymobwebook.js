"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymobGateway = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = __importDefault(require("../../../../shared/config"));
class PaymobGateway {
    verifyHmac(data, receivedHmac) {
        const ordered = [
            data.obj.amount_cents,
            data.obj.created_at,
            data.obj.currency,
            data.obj.error_occured,
            data.obj.has_parent_transaction,
            data.obj.id,
            data.obj.integration_id,
            data.obj.is_3d_secure,
            data.obj.is_auth,
            data.obj.is_capture,
            data.obj.is_refunded,
            data.obj.is_standalone_payment,
            data.obj.is_voided,
            data.obj.order.id,
            data.obj.owner,
            data.obj.pending,
            data.obj.source_data.pan,
            data.obj.source_data.sub_type,
            data.obj.source_data.type,
            data.obj.success
        ].join("");
        const calculated = crypto_1.default
            .createHmac("sha512", config_1.default.paymob.PAYMOB_HMAC_SECRET)
            .update(ordered)
            .digest("hex");
        return calculated === receivedHmac;
    }
}
exports.PaymobGateway = PaymobGateway;
