import { Types } from "mongoose";

export interface ICategory {
    _id: Types.ObjectId;
    name: string;
    image: {url: string, publicId: string}
}
