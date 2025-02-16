import { z } from "zod";

export const projectValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  image: z.string().url("Invalid image URL").optional(),
  technologies: z.array(z.string()).nonempty("At least one technology is required"),
  stars: z.string().min(0, "Stars must be at least 0").max(5, "Stars cannot be more than 5"),
  demoUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  features: z.array(z.string()).nonempty("At least one feature is required"),
  overview: z.string().min(10, "Overview must be at least 10 characters long"),
  challenges: z.array(z.string()).nonempty("At least one challenge is required"),
  impact: z.array(z.string()).nonempty("At least one impact point is required"),
});
