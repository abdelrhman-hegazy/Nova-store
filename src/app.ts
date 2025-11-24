import express, { Express, Request, Response, NextFunction } from "express";
import handleError from "./app/shared/middleware/handleError";
import { sharedRouter } from "./app/shared/routers";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

const app: Express = express();

app.use(helmet());
app.use(compression());
app.use(cors({
    origin: "*",
    credentials: true
}));


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", sharedRouter);

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
