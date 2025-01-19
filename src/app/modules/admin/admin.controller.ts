import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const registration = async (req: Request, res: Response) => {
  try {
    // Extract data from request body
    const data = req.body;

    // Register the admin in the database
    const result = await adminServices.registrationIntoDB(data);

    // Send a success response
    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    // Send an error response
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    });
  }
};

export const adminControllers = {
  registration,
};
