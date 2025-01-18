import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const createAdmin = (req: Request, res: Response) => {
  try {
    const admin = req.body;

    const result = adminServices.createAdminIntoDB(admin);
    res.status(200).json({
      success: true,
      message: "Admin is created successfully.",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};


export const adminControllers = {
    createAdmin
}