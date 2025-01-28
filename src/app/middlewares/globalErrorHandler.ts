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

  const handleZodError = (err: ZodError) => {
    const errorSource: TErrorSource[] = err.issues.map((issue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    const statusCode = 400;

    return {
      statusCode,
      message: "Validation error",
      errorSource,
    };
  };

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
  });
};

export default globalErrorHandler;
