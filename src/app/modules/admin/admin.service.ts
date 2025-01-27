import { TAdmin } from "./admin.interface";
import { adminModel } from "./admin.model";

const create_admin_into_db = async (data: TAdmin) => {
 
    // Check if the admin already exists
    const existingAdmin = await adminModel.isAdminExist(data.email);
    if (existingAdmin) {
      throw new Error(`Admin with email ${data.email} already exists.`);
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
