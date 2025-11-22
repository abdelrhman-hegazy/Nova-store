import { Request , Response} from "express";  
import config from "../config";
const handleError = (err: any, req: Request, res: Response, next: any) => {
    const status = err.status || 500;
    console.log("Error Middleware Invoked");
    if (config.NODE_ENV === "development") {
        console.error(`[${new Date().toISOString()}]`, err);        
    }
    res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.errorType || "server_error",
    });
};
export default handleError;
