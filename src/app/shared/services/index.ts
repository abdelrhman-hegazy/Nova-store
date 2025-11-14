import { Types } from "mongoose";
import AppError from "../utils/AppError";


export class sharedServices {
    static async validateObjectId(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid ID", 400, "BAD_REQUEST");
        }
    }
}