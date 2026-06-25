import { z } from "zod";

export const ProjectFormSchema = z.object({
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
  summary: z
    .string()
    .min(20, "Summary must be at least 20 characters")
    .max(300, "Summary must be less than 300 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters"),
  coverImage: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  images: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  client: z
    .string()
    .max(100, "Client name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  liveUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "ARCHIVED"]).default("COMPLETED"),
  isFeatured: z.boolean().default(false),
  order: z.coerce.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
  completedAt: z.coerce.date().optional().nullable(),
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

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;
