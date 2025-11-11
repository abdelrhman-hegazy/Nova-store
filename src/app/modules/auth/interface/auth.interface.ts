import { Types } from "mongoose";
export interface IUser {
    _id: Types.ObjectId,
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


export interface IRefreshToken {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
}
