import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";
import { Model } from "mongoose";


interface IAdminMethods {
  isExist(id :string): Promise<TAdmin | null>;
}

type TAdminModel = Model<TAdmin, object, IAdminMethods>;


const adminSchema = new Schema<TAdmin, TAdminModel, IAdminMethods>({
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

adminSchema.method('isExist', function (id: string){
  const isExistUser =  adminModel.findOne({id})
  return isExistUser;
})

export const adminModel = model<TAdmin, TAdminModel>("Admin", adminSchema);
