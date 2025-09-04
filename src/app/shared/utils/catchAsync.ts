import { Request, Response, NextFunction } from "express";

export const catchAsync = <T>(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // Ensure the function returns a promise and catch any errors
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
export default catchAsync;