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
import { TErrorSource } from "../interface/error";
import { ZodError } from "zod";
import config from "../config";
import handleZodError from "../errors/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction
) => {
  let statusCode: string | number = status.INTERNAL_SERVER_ERROR;
  let meassage = err?.message || "Something went wrong.";
  let errorSource: TErrorSource[] = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];


// handle zod error
  if (err instanceof ZodError) {
    const simplifiedErrors = handleZodError(err);
    statusCode = simplifiedErrors?.statusCode;
    meassage = simplifiedErrors?.message;
    errorSource = simplifiedErrors?.errorSource;
  }

  res.status(statusCode).json({
    success: false,
    meassage,
    errorSource,
    stack: config.node_env === "development" ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
