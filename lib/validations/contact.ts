import { z } from "zod";

export const ContactFormSchema = z.object({
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
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000, "Message must be less than 5000 characters"),
});

export const QuoteFormSchema = z.object({
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
  company: z
    .string()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional().or(z.literal("")),
  timeline: z.string().optional().or(z.literal("")),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(5000, "Description must be less than 5000 characters"),
  services: z
    .array(z.string())
    .min(1, "Please select at least one service"),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;
export type QuoteFormValues = z.infer<typeof QuoteFormSchema>;
