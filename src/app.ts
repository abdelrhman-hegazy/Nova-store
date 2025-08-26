import express, { Express, Request, Response, NextFunction } from "express";
import handleError from "./app/middleware/handleError";
const app: Express = express();
import catchAsync from "./app/utils/catchAsync";
import { routers } from "./app/router";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example route using catchAsync
app.get("/example", catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Simulate an async operation
    res.status(200).json({ message: "This is an example route." });
}));

app.use("/api/v1", routers);
app.use(handleError);
export default app;
