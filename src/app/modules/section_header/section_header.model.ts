// section_header.model.ts - section_header module
import mongoose, { Schema } from "mongoose";
import { ISectionHeader } from "./section_header.interface";

// Define the Mongoose Schema
const SectionHeaderSchema: Schema = new Schema<ISectionHeader>(
  {
    title: {
      type: String,
      trim: true,
    },
    heading: {
      type: String,
      trim: true,
    },
    ctaText: {
      type: String,
      trim: true,
    },
    ctaLink: {
      type: String,
    },

  },
  { timestamps: true }
);

// Create & Export the Model
const SectionHeaderModel = mongoose.model<ISectionHeader>("SectionHeader", SectionHeaderSchema);
export default SectionHeaderModel;
