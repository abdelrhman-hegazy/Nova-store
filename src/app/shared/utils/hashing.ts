import { createHmac } from "crypto"
import config from "../config"

export const hmacProcess= (code:number, key:string) =>{
    return createHmac("sha256", key)
        .update(code.toString())
        .digest("hex");
}
