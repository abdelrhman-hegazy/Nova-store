
import { Request, Response, NextFunction } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../utils/AppError"
import { fromZodError } from "zod-validation-error"
export const validate = (schema: any) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = schema.safeParse(req.body)
    if (!result.success) {
        return next(new AppError(fromZodError(result.error).message, 400, "VALIDATION_ERROR"))
    }
    next()
})
