// home_about.validation.ts - home_about module
import { z } from "zod";

// Validation Schema
export const HomeAboutValidationSchema = z.object({
  title: z.string().min(3, {message: "Title must be at least 3 characters"}),
  description: z.string().min(1, { message: "Name is required." }),
  heading: z.string().min(3, {message: "Heading is required."})
});

