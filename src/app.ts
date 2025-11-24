import express, { Express, Request, Response, NextFunction } from "express";
import handleError from "./app/shared/middleware/handleError";
const app: Express = express();
import { sharedRouter } from "./app/shared/routers";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";

app.use(helmet());
app.use(cors({
    origin: "*",
    credentials: true
}));
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per 15 minutes
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes',
})
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiLimiter, sharedRouter);

app.use("/api/test", (req: Request, res: Response) => {
    res.status(200).json({ message: "test endpoint working" });
});

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "welcome to the Nova-store API." });
});

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "Server is healthy",
        timestamp: new Date().toISOString()
    });
});
app.use(handleError);
export default app;
