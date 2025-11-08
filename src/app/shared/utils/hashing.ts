import { createHmac } from "crypto"
import config from "../config";

export const hmacProcess = (code: number) => {
    return createHmac("sha256", config.HASHING_SECRET as string)
        .update(code.toString())
        .digest("hex");
}
