import { Document } from "mongoose";
export interface IUser extends Document {
    _id: string;
    email: string,
    mobileNumber?: string,
    username?: string,
    nationality?: string,
    dateOfBirth?: string,
    verificationCode?: string | null,
    isVerified: boolean,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date
}


export interface IRefreshToken extends Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    token: string;
    expiresAt: Date;
}
