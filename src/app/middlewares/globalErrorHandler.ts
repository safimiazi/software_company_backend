/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import status from "http-status";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction
) => {
  const statusCode = status.INTERNAL_SERVER_ERROR;
  const meassage = err?.message || "Something went wrong.";

  type TErrorSource = {
    path: string | number;
    message: string;
  };

  const errorSource: TErrorSource[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  res.status(statusCode).json({
    success: false,
    meassage,
    errorSource,
  });
};

export default globalErrorHandler;
