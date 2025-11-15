
import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/AppError";
import { Schema } from "joi";

export const validate = (schema: Schema) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        convert: true,
        stripUnknown: true
    });

    if (error) {
        return next(new AppError(error.details.map(detail => detail.message).join(", "), 400, "VALIDATION_ERROR"));
    }

    req.body = value;
    next();
}); 
