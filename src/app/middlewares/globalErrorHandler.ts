/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express";
import status from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {


  const statusCode = status.INTERNAL_SERVER_ERROR;
  const meassage = err?.message || "Something went wrong.";
  res.status(statusCode).json({
    success: false,
    meassage,
    error: err,
  });
};

export default globalErrorHandler;
