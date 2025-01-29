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
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";

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
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    meassage = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }
  else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    meassage = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }
  else if (err?.code === "11000") {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    meassage = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }



  
  res.status(statusCode).json({
    success: false,
    meassage,
    errorSource,
    stack: config.node_env === "development" ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
