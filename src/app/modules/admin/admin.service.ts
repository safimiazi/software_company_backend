import { TAdmin } from "./admin.interface";
import { adminModel } from "./admin.model";

const create_admin_into_db = async (data: TAdmin) => {
  try {
    const adminData = {
      ...data,
      role: "admin",
    };

    // Create a new admin document
    const newAdmin = new adminModel(adminData);

    // Save to the database
    const savedAdmin = await newAdmin.save();
    return savedAdmin;
  } catch (error) {
    console.error("Error while saving admin:", error);
    throw new Error("Failed to register admin.");
  }
};

export const adminServices = {
  create_admin_into_db,
};
