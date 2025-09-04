import express, { Express, Request, Response, NextFunction } from "express";
import handleError from "./app/shared/middleware/handleError";
const app: Express = express();
import { sharedRouter } from "./app/shared/routers";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", sharedRouter);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "welcome to the Nova-store API." });
});

app.use(handleError);
export default app;
