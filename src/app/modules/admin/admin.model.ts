import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const adminSchema = new Schema<TAdmin>({
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
  password: {
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

adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, config.SALT);
  next();
});

adminSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

export const adminModel = model<TAdmin>("Admin", adminSchema);
