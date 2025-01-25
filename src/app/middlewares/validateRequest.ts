/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AnyZodObject } from "zod";

export function validateRequest(schema: AnyZodObject) {
  return catchAsync(async (req: Request, res: Response) => {
    await schema.parseAsync(req.body);
    
  });
}
