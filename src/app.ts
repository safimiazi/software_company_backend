import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { adminRoutes } from "./app/modules/admin/admin.routes";
// parser
app.use(express.json());
app.use(cors());

app.use('/api/v1/admin', adminRoutes)



app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
