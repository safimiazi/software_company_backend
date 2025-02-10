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

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.options('*', cors({
  origin: (origin, callback) => {
    console.log("Preflight Request Origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));



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
