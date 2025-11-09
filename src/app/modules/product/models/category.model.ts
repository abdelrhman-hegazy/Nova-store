import { Model, model, Schema } from "mongoose";
import { ICategory } from "../product.interface";


const CategorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, trim: true },
        imageUrl: { type: String, required: true, trim: true },
    }
);
export const Category: Model<ICategory> = model<ICategory>("Category", CategorySchema);