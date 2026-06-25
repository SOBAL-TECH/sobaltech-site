import { z } from "zod";

export const ServiceFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug must be less than 100 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only"
    ),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters"),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters"),
  icon: z.string().optional().or(z.literal("")),
  image: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  features: z.array(z.string()).default([]),
  order: z.coerce.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
  seoTitle: z
    .string()
    .max(70, "SEO title must be less than 70 characters")
    .optional()
    .or(z.literal("")),
  seoDesc: z
    .string()
    .max(160, "SEO description must be less than 160 characters")
    .optional()
    .or(z.literal("")),
});

export type ServiceFormValues = z.infer<typeof ServiceFormSchema>;
