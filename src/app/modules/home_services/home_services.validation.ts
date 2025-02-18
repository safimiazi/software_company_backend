// home_services.validation.ts - home_services module
import { z } from "zod";

export const serviceValidationSchema = z.object({
  sectionHeader: z.string(),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .trim()
    .max(100, "Title can't be more than 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .trim()
    .max(500, "Description can't be more than 500 characters"),

  ctaText: z
    .string()
    .min(3, "CTA text must be at least 3 characters")
    .trim()
    .max(100, "CTA text can't be more than 100 characters"),
  ctaLink: z.string().trim(),
});

export const servicePutValidationSchema = z.object({
  sectionHeader: z.string().optional(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title can't be more than 100 characters")
    .trim()
    .optional(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description can't be more than 500 characters")
    .trim()
    .optional(),

  ctaText: z
    .string()
    .min(3, "CTA text must be at least 3 characters")
    .max(100, "CTA text can't be more than 100 characters")
    .trim()
    .optional(),

  ctaLink: z.string().trim().optional(),
});
