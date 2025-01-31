import { TAdmin } from "./admin.interface";
import { adminModel } from "./admin.model";

const create_admin_into_db = async (data: TAdmin) => {
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

const login_admin_into_db = async (data: TAdmin) => {
  
  const isAdminExist = await adminModel.findOne({email: data.email});
  console.log(isAdminExist)

};

export const adminServices = {
  create_admin_into_db,
  login_admin_into_db,
};
