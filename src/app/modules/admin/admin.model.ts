import { model, Schema } from "mongoose";
import {  Admin } from "./admin.interface";

const adminSchema = new Schema<Admin>({

  id: {
    type: String,
    unique: true

  },
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true

  },
  phone: {
    type: String,

  },
  picture: {
    type: String,

  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },

});


export const adminModel = model<Admin>('Admin', adminSchema);
