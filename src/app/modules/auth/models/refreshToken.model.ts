import { model, Schema } from "mongoose"
import { IRefreshToken } from "../interface/auth.interface"
const refreshTokenSchema = new Schema<IRefreshToken>({
    token: {
        type: String,
        required: true
    }, userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    expiresAt: { type: Date, required: true }
}, { timestamps: true })
export const RefreshToken = model("RefreshToken", refreshTokenSchema)

