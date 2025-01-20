/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { model, Schema } from "mongoose";
import { TAdmin, TAdminModel } from "./admin.interface";
import bcrypt from "bcrypt";



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

adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

adminSchema.post("save", async function (doc, next) {
  doc.password = "";

  next();
});

adminSchema.static('isAdminExist', async function (email: string) {
  try {
    const result = await this.findOne({ email });
    return result;
  } catch (error : any) {
    throw new Error("Failed to check admin existence.");
  }
});


export const adminModel = model<TAdmin, TAdminModel>("Admin", adminSchema);
