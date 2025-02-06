// home_about.model.ts - home_about module
import mongoose, { Schema } from "mongoose";
import { IHomeAbout } from "./home_about.interface";

// Define the Mongoose Schema
const AboutSchema: Schema = new Schema(
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
 
    heading: {
      type: String,
      required: [true, "Heading is required"],
      trim: true,
    },
 
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create & Export the Model
const HomeAboutModel = mongoose.model<IHomeAbout>(
  "home_about",
  AboutSchema
);
export default HomeAboutModel;
