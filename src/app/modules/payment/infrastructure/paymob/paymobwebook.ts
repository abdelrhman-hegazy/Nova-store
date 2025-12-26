
// infrastructure/gateways/PaymobGateway.ts
import crypto from "crypto";
import config from "../../../../shared/config";

export class PaymobGateway {
    verifyHmac(data: any, receivedHmac: string) {
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

        const calculated = crypto
            .createHmac("sha512", config.paymob.PAYMOB_HMAC_SECRET!)
            .update(ordered)
            .digest("hex");

        return calculated === receivedHmac;
    }
}
