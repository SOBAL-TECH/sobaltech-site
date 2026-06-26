import type React from "react";
import type {
  Service,
  Product,
  Project,
  BlogPost,
  Testimonial,
  TeamMember,
  ContactSubmission,
  QuoteRequest,
  SiteSetting,
  UserRole,
  ProjectStatus,
  PostStatus,
  SubmissionStatus,
  User,
  JobPosting,
  JobApplication,
  ApplicationStatus,
} from "@prisma/client";

// ─── Re-export Prisma types ────────────────────────────────────────────────────
export type {
  Service,
  Product,
  Project,
  BlogPost,
  Testimonial,
  TeamMember,
  ContactSubmission,
  QuoteRequest,
  SiteSetting,
  User,
  UserRole,
  ProjectStatus,
  PostStatus,
  SubmissionStatus,
  JobPosting,
  JobApplication,
  ApplicationStatus,
};

// ─── NextAuth type augmentation ───────────────────────────────────────────────
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

// JWT augmentation via next-auth (uses @auth/core/jwt internally)
declare module "@auth/core/types" {
  interface JWT {
    id?: string;
    role?: UserRole;
  }
}

// ─── API Response types ───────────────────────────────────────────────────────
export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginationParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: string;
  order?: "asc" | "desc";
};

// ─── Extended domain types ────────────────────────────────────────────────────

/** Service with computed display fields */
export type ServiceWithMeta = Service & {
  featureCount: number;
};

/** Project with computed display fields */
export type ProjectWithMeta = Project & {
  tagList: string[];
};

/** BlogPost with computed display fields */
export type BlogPostWithMeta = BlogPost & {
  isPublished: boolean;
  formattedDate: string;
};

/** Testimonial with star rating array */
export type TestimonialWithRating = Testimonial & {
  stars: number[];
};

// ─── Form action types ────────────────────────────────────────────────────────
export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// ─── Navigation types ─────────────────────────────────────────────────────────
export type NavItem = {
  label: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
};

// ─── Site settings group ──────────────────────────────────────────────────────
export type SettingsGroup = {
  [key: string]: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone?: string;
  address?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
};

// ─── Upload types ─────────────────────────────────────────────────────────────
export type UploadedFile = {
  key: string;
  url: string;
  name: string;
  size: number;
};

// ─── Dashboard stats ──────────────────────────────────────────────────────────
export type DashboardStats = {
  totalServices: number;
  totalProducts: number;
  totalProjects: number;
  totalBlogPosts: number;
  totalTestimonials: number;
  totalTeamMembers: number;
  newContacts: number;
  newQuotes: number;
  publishedPosts: number;
};
