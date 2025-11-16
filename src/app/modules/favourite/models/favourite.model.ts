import { Schema } from "mongoose";

export const FavoriteSchema = new Schema(({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
}) as any,
    { _id: false }
)