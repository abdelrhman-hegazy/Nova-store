import { Document } from "mongoose";
export interface IUser{
    email: string,
    mobileNumber?:string,
    username?: string,
    nationality?: string,
    dateOfBirth?: string,
    verificationCode?: string,
    isVerified: boolean,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date
}

export interface IUserDocument extends IUser, Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}