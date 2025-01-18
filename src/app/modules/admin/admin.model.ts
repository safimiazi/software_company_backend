import { model, Schema } from "mongoose";
import { Admin } from "./admin.interface";

const adminSchema = new Schema<Admin>({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "First Name is required"],
    maxlength: [20, "Name can not be more than 20 characters"],
    validate: {
      validator: function (value: string) {
        const name = value.charAt(0).toUpperCase() + value.slice(1);
        return value === name;
      },
      message: "{VALUE} is not capitalized format.",
    },
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  picture: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

export const adminModel = model<Admin>("Admin", adminSchema);
