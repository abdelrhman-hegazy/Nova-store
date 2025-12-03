
import { Schema, model } from "mongoose";
import { IUser } from "../interface/user.interface";

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, "email is required"],
            trim: true,
            unique: true,
            lowercase: true,
        },
        mobileNumber: {
            type: String,
            maxlength: [18, "mobileNumber can't be greater than 18 characters"],
            trim: true,
            default: null,
        },

        username: {
            type: String,
            trim: true,
            default: null,
            minlength: [3, "Name can't be smaller than 3 characters"],
            maxlength: [15, "Name can't be greater than 15 characters"],
        },
        country: { type: String, trim: true, default: null },
        city: { type: String, trim: true, default: null },
        street: { type: String, trim: true, default: null },
        building: { type: String, trim: true, default: null },
        floor: { type: String, trim: true, default: null },
        apartment: { type: String, trim: true, default: null },
        dateOfBirth: { type: String, maxlength: 15, trim: true ,default: null},
        verificationCode: { type: String, trim: true ,default: null},
        isVerified: { type: Boolean, default: false },
        isAdmin: { type: Boolean, required: true },
    },
    { timestamps: true }
);

export const User = model<IUser>("User", UserSchema)
