/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const meassage = err.meassage || "Something went wrong.";
  res.status(statusCode).json({
    success: false,
    meassage,
    error: err,
  });
};

export default globalErrorHandler;
