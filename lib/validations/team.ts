import { z } from "zod";

export const TeamMemberFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  role: z
    .string()
    .min(2, "Role must be at least 2 characters")
    .max(100, "Role must be less than 100 characters"),
  bio: z
    .string()
    .max(1000, "Bio must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
  avatar: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  linkedIn: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  twitter: z
    .string()
    .url("Please enter a valid Twitter URL")
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url("Please enter a valid GitHub URL")
    .optional()
    .or(z.literal("")),
  order: z.coerce.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export type TeamMemberFormValues = z.infer<typeof TeamMemberFormSchema>;
