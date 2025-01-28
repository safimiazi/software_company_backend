import status from "http-status";
import AppError from "../../errors/AppError";
import { TAdmin } from "./admin.interface";
import { adminModel } from "./admin.model";

const create_admin_into_db = async (data: TAdmin) => {
 
    // Check if the admin already exists
    const existingAdmin = await adminModel.isAdminExist(data.email);

    if (existingAdmin) {
      throw new AppError(status.CONFLICT,`Admin already exists, please login.`);
    }


    const adminData = {
      ...data,
      role: "admin",
    };

    
    

    // Create a new admin document
    const newAdmin = new adminModel(adminData);

    // Save to the database
    const savedAdmin = await newAdmin.save();
    return savedAdmin;
 
};

export const adminServices = {
  create_admin_into_db,
};
