import status from "http-status";
import AppError from "../../errors/AppError";
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
  const isAdminExist = await adminModel.findOne({ email: data.email });
  if (!isAdminExist) {
    throw new AppError(status.NOT_FOUND, "Admin is not found.");
  }

  const isDeleted = isAdminExist.isDeleted;
  if (isDeleted) {
    throw new AppError(status.FORBIDDEN, "Admin is deleted!");
  }

  const isAdminBlocked = isAdminExist.status === "blocked";
  if (isAdminBlocked) {
    throw new AppError(status.FORBIDDEN, "Admin is blocked!");
  }

  
};

export const adminServices = {
  create_admin_into_db,
  login_admin_into_db,
};
