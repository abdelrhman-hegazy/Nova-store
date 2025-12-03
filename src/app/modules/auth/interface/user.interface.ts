import { Types } from "mongoose";
export interface IUser {
    _id: Types.ObjectId,
    email: string,
    mobileNumber?: string,
    first_name: string,
    last_name: string,
    country: string,
    city: string,
    street: string,
    building: string,
    floor: string,
    apartment: string,
    username?: string,
    dateOfBirth?: string,
    verificationCode?: string | null,
    isVerified: boolean,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date
}
export interface IRefreshToken {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
}
