import { z } from "zod";

export const TestimonialFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  role: z
    .string()
    .min(2, "Role must be at least 2 characters")
    .max(100, "Role must be less than 100 characters"),
  company: z
    .string()
    .min(2, "Company must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  avatar: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")),
  content: z
    .string()
    .min(20, "Testimonial must be at least 20 characters")
    .max(1000, "Testimonial must be less than 1000 characters"),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .default(5),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
});

export type TestimonialFormValues = z.infer<typeof TestimonialFormSchema>;
