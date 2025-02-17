import mongoose, { Schema } from "mongoose";
import { ICaseStudy, ITestimonial } from "./case_study.interface";

// case_study.model.ts - case_study module
const TestimonialSchema = new Schema<ITestimonial>({
    quote: { type: String, required: true },
    author: { type: String, required: true },
    position: { type: String, required: true },
  });
  
  const CaseStudySchema = new Schema<ICaseStudy>({
    title: { type: String, required: true },
    client: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    results: { type: [String], required: true },
    technologies: { type: [String], required: true },
    testimonial: { type: TestimonialSchema, required: true },
  });
  
  const CaseStudyModel = mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
  
  export default CaseStudyModel;