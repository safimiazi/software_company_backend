import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";


const adminSchema = new Schema<TAdmin>({
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

export const adminModel = model<TAdmin>("Admin", adminSchema);
