import { z } from "zod";

export const JobApplicationSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[+\d\s\-()]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  linkedIn: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  portfolioUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  coverLetter: z
    .string()
    .min(50, "Cover letter must be at least 50 characters")
    .max(5000, "Cover letter must be less than 5000 characters"),
});

export const JobPostingFormSchema = z.object({
  title: z.string().min(2, "Title is required").max(200),
  slug: z
    .string()
    .min(2, "Slug is required")
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  department: z.string().min(1, "Department is required").max(100),
  type: z.string().min(1, "Employment type is required"),
  location: z.string().min(1, "Location is required"),
  summary: z
    .string()
    .min(20, "Summary must be at least 20 characters")
    .max(500, "Summary must be less than 500 characters"),
  description: z
    .string()
    .min(50, "Description must be at least 50 characters")
    .max(20000),
  requirements: z.array(z.string()).default([]),
  responsibilities: z.array(z.string()).default([]),
  isPublished: z.boolean().default(true),
  closingDate: z.string().optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
  seoTitle: z.string().max(200).optional().or(z.literal("")),
  seoDesc: z.string().max(500).optional().or(z.literal("")),
});

export type JobApplicationValues = z.infer<typeof JobApplicationSchema>;
export type JobPostingFormValues = z.infer<typeof JobPostingFormSchema>;
