// project.model.ts - project module
import mongoose, { Schema } from "mongoose";
import { IServices } from "./home_services.interface";

// Define the Mongoose Schema
const ServiceSchema: Schema = new Schema<IServices>(
  {
    title: {
      type: String,
      required: [true, "Service Title is required"],
      minlength: [3, "Service Title must be at least 3 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Service Description is required"],
      trim: true,
    },
    ctaText: {
      type: String,
      required: [true, "Service CTA text is required"],
      trim: true,
    },
    ctaLink: {
      type: String,
      required: [true, "Service CTA Link is required"],
    },
    image: {
      type: String,
      required: [true, "Icon is required"],
    },
  },
  { timestamps: true }
);

// Create & Export the Model
const ServiceModel = mongoose.model<IServices>("Service", ServiceSchema);
export default ServiceModel;
