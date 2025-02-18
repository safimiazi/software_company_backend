// case_study.validation.ts - case_study module
import { z } from 'zod';



export const CaseStudyValidationSchema = z.object({
  sectionHeader: z.string(),

  title: z.string().min(1, "Title is required"),
  client: z.string().min(1, "Client is required"),
  category: z.string().min(1, "Category is required"),
  duration: z.string().min(1, "Duration is required"),
  challenge: z.string().min(1, "Challenge description is required"),
  solution: z.string().min(1, "Solution description is required"),
  results: z.array(z.string()).min(1, "At least one result is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  "testimonial.quote": z.string().min(1, "Quote is required"),
  "testimonial.author": z.string().min(1, "Author is required"),
  "testimonial.position": z.string().min(1, "Position is required")
});
export const CaseStudyEditValidationSchema = z.object({
  sectionHeader: z.string().optional(),

  title: z.string().min(1, "Title is required").optional(),
  client: z.string().min(1, "Client is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  duration: z.string().min(1, "Duration is required").optional(),
  challenge: z.string().min(1, "Challenge description is required").optional(),
  solution: z.string().min(1, "Solution description is required").optional(),
  results: z.array(z.string()).min(1, "At least one result is required").optional(),
  technologies: z.array(z.string()).min(1, "At least one technology is required").optional(),
  "testimonial.quote": z.string().min(1, "Quote is required").optional(),
  "testimonial.author": z.string().min(1, "Author is required").optional(),
  "testimonial.position": z.string().min(1, "Position is required").optional()
});