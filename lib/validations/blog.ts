import { z } from "zod";

export const BlogPostFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be less than 200 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(200, "Slug must be less than 200 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only"
    ),
  excerpt: z
    .string()
    .min(20, "Excerpt must be at least 20 characters")
    .max(400, "Excerpt must be less than 400 characters"),
  content: z
    .string()
    .min(100, "Content must be at least 100 characters"),
  coverImage: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")),
  tags: z.array(z.string()).default([]),
  author: z
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name must be less than 100 characters")
    .default("SobalTech Team"),
  authorImage: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  readTime: z.coerce.number().int().min(1).max(120).default(5),
  publishedAt: z.coerce.date().optional().nullable(),
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

export type BlogPostFormValues = z.infer<typeof BlogPostFormSchema>;
