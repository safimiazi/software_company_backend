import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import { adminValidationSchema } from "./admin.validation";

const createAdmin = (req: Request, res: Response) => {
  try {
    const {admin} = req.body;

    const validatedAdmin = adminValidationSchema.parse(admin)

    const result = adminServices.createAdminIntoDB(validatedAdmin);
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