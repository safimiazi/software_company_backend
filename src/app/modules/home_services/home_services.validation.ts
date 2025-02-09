// home_services.validation.ts - home_services module
import { z } from "zod";

export const serviceValidationSchema = z.object({
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
  heading: z
    .string()
    .min(3, "Heading must be at least 3 characters")
    .trim()
    .max(100, "Heading can't be more than 100 characters"),
  ctaText: z
    .string()
    .min(3, "CTA text must be at least 3 characters")
    .trim()
    .max(100, "CTA text can't be more than 100 characters"),
  ctaLink: z.string().trim(),
  services: z
    .array(
      z.object({
        title: z
          .string()
          .min(3, "Service title must be at least 3 characters")
          .trim()
          .max(100, "Service title can't be more than 100 characters"),
        description: z
          .string()
          .min(10, "Service description must be at least 10 characters")
          .trim()
          .max(500, "Service description can't be more than 500 characters"),
        ctaText: z
          .string()
          .min(3, "Service CTA text must be at least 3 characters")
          .trim()
          .max(100, "Service CTA text can't be more than 100 characters"),
        ctaLink: z.string().trim(),
      })
    )
    .min(1, "At least one service is required"),
});

export const servicePutValidationSchema = z.object({
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

  heading: z
    .string()
    .min(3, "Heading must be at least 3 characters")
    .max(100, "Heading can't be more than 100 characters")
    .trim()
    .optional(),

  ctaText: z
    .string()
    .min(3, "CTA text must be at least 3 characters")
    .max(100, "CTA text can't be more than 100 characters")
    .trim()
    .optional(),

  ctaLink: z.string().trim().optional(),

  services: z
    .array(
      z.object({
        title: z
          .string()
          .min(3, "Service title must be at least 3 characters")
          .max(100, "Service title can't be more than 100 characters")
          .trim()
          .optional(),

        description: z
          .string()
          .min(10, "Service description must be at least 10 characters")
          .max(500, "Service description can't be more than 500 characters")
          .trim()
          .optional(),

        ctaText: z
          .string()
          .min(3, "Service CTA text must be at least 3 characters")
          .max(100, "Service CTA text can't be more than 100 characters")
          .trim()
          .optional(),

        ctaLink: z.string().trim().optional(),

        image: z.string().trim().optional(),
      })
    )
    .optional(), 
});
