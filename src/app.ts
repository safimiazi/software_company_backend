/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import router from "./app/routes";
// parser
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = 500;
  const meassage = err.meassage || "Something went wrong.";
  res.status(statusCode).json({
    success: false,
    meassage,
    error: err,
  });
});

export default app;
