import express, { Express, Request, Response, NextFunction } from "express";
import handleError from "./app/middleware/handleError";
const app: Express = express();
import catchAsync from "./app/utils/catchAsync";
import { routers } from "./app/router";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "This is the Nova-store route." });
}));

app.use("/api/v1", routers);
app.use(handleError);
export default app;
