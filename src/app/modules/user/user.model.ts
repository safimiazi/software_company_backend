import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { userStatus } from "./user.constant";

const userSchema = new Schema<TUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  needsPasswordChange: {
    type: Boolean,
    default: true,
  },
  passwordChangeAt: {
    type: Date,
  },
  role: {
    type: String,
    enum: ["superAdmin", "admin", "employee"],
  },
  status: {
    type: String,
    enum: userStatus,
    default: "active",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

 export const User = model<TUser>('User', userSchema);

