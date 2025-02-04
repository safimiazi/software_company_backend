import mongoose, { Schema } from "mongoose";
import { IHomeBanner } from "./home_banner.interface";

// Define the Mongoose Schema
const BannerSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    ctaText: {
      type: String,
      trim: true,
    },
    ctaLink: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create & Export the Model
const HomeBannerModel = mongoose.model<IHomeBanner>(
  "home_banner",
  BannerSchema
);
export default HomeBannerModel;
