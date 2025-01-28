/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Schema } from "mongoose";
import { TAdmin, TAdminModel } from "./admin.interface";
import bcrypt from "bcrypt";
import AppError from "../../errors/AppError";
import status from "http-status";

const adminSchema = new Schema<TAdmin, TAdminModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  needsPasswordChange: { type: Boolean, default: false },
  passwordChangeAt: { type: Date },
  role: { type: String, enum: ["admin", "employee"], default: "employee" },
  status: { type: String, enum: ["active", "blocked"], default: "active" },
  isDeleted: { type: Boolean, default: false },
  phone: { type: String, required: true },
  picture: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// hash password before saving
adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

//remove password from response
adminSchema.post("save", async function (doc, next) {
  doc.password = "";

  next();
});

// check if admin already exists
adminSchema.pre("save", async function (next) {
  const result = await adminModel.findOne({ email: this.email });
  if (result) {
    throw new AppError(status.CONFLICT, `Admin already exists, please login.`);
  }
  next();
});

export const adminModel = model<TAdmin, TAdminModel>("Admin", adminSchema);
