import mongoose, { Schema } from "mongoose";
import { IProject } from "./project.interface";



// Define the Project Schema
const ProjectSchema: Schema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    technologies: { type: [String], required: true },
    stars: { type: Number, required: true, min: 0, max: 5 },
    demoUrl: { type: String },
    githubUrl: { type: String },
    features: { type: [String], required: true },
    overview: { type: String, required: true },
    challenges: { type: [String], required: true },
    impact: { type: [String], required: true },
  },
  { timestamps: true }
);

// Create the Project model
const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectModel;
