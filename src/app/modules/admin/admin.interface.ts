import { Model } from "mongoose";

export type TAdmin = {
  name: string;

  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangeAt: Date;
  role: "admin" | "employee";
  status: "active" | "blocked";
  isDeleted: boolean;

  phone: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
};



export interface TAdminModel extends Model<TAdmin> {
  isAdminExist(email: string): Promise<TAdmin | null>;
}

