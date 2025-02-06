import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], 
    credentials: true, // Important for cookies/session
  })
);

// app.post('/track', (req, res) => {
//   const { url, timestamp, childId } = req.body;
//  console.log("url", url)
// });


app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Not Found Middleware
app.use(notFound);

app.use(globalErrorHandler);

export default app;
