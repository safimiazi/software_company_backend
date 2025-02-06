import { z } from "zod";

// Validation Schema
export const HomeBannerValidationSchema = z.object({
  title: z.string().min(3, {message: "Title must be at least 3 characters"}),
  description: z.string().min(1, { message: "Name is required" }),
  ctaText: z.string().min(1, { message: "CTA Text is required" }),
  ctaLink: z.string().min(1, { message: "CTA Link is required" }),
});

