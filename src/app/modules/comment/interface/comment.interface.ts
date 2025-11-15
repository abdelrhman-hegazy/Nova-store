import { Types } from "mongoose";


export interface IComment {
    userId: Types.ObjectId;
    rate: number;
    comment: string;
}