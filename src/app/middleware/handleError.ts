import config from "../config";
const handleError = (err: any, req: any, res: any, next: any) => {
    const statusCode = err.statusCode || 500;
    if (config.NODE_ENV === "development") {
        console.error(`[${new Date().toISOString()}]`, err);
    }
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        error: err.errorType || "server_error",
    });
};

export default handleError;
