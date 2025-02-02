import status from "http-status";
import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import { TAdmin } from "./admin.interface";
import { adminModel } from "./admin.model";
import jwt from "jsonwebtoken";
import config from "../../config";

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

  const isPasswordMatched = await bcrypt.compare(
    data.password,
    isAdminExist.password
  );

  if (!isPasswordMatched) {
    throw new AppError(status.FORBIDDEN, "Password does not matched!");
  }

  const newData = {
    id: isAdminExist.id,
    role: isAdminExist.role,
  };

  const access_token = jwt.sign(newData, (config.jwt_access_secret as string), { expiresIn: '1h' });

  return access_token;
};

export const adminServices = {
  create_admin_into_db,
  login_admin_into_db,
};
