import { Model, model, Schema } from "mongoose";
import { ICategory } from "../interface/category.interface";


const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, trim: true },
        image: { type: { url: String, publicId: String }, _id: false, required: true, trim: true },
    }
);
export const Category: Model<ICategory> = model<ICategory>("Category", CategorySchema);