import { model, Schema } from "mongoose"
import { IRefreshToken } from "../auth.interface"
const refreshTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },

})
const RefreshToken = model<IRefreshToken>("RefreshToken", refreshTokenSchema)
export { RefreshToken }
