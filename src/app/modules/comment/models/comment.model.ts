import { Schema } from "mongoose";
import { IComment } from "../interface/comment.interface";

export const CommentSchema = new Schema<IComment>(
    {
        userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        rate: { type: Number, required: true, default: 1 },
        comment: { type: String, required: true, trim: true },
    },
    { _id: false }
);
