"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  JobPostingFormSchema,
  type JobPostingFormValues,
} from "@/lib/validations/careers";
import type { ActionState, ApplicationStatus } from "@/types";

// ─── Job Postings ─────────────────────────────────────────────────────────────

export async function getAllJobPostingsAdmin() {
  return prisma.jobPosting.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { applications: true } } },
  });
}

export async function createJobPosting(
  data: JobPostingFormValues
): Promise<ActionState> {
  const parsed = JobPostingFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.jobPosting.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return {
        success: false,
        message: "A job posting with this slug already exists.",
        errors: { slug: ["Slug is already taken"] },
      };
    }

    await prisma.jobPosting.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        department: parsed.data.department,
        type: parsed.data.type,
        location: parsed.data.location,
        summary: parsed.data.summary,
        description: parsed.data.description,
        requirements: parsed.data.requirements,
        responsibilities: parsed.data.responsibilities,
        isPublished: parsed.data.isPublished,
        closingDate: parsed.data.closingDate ? new Date(parsed.data.closingDate) : null,
        order: parsed.data.order,
        seoTitle: parsed.data.seoTitle || null,
        seoDesc: parsed.data.seoDesc || null,
      },
    });

    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true, message: "Job posting created successfully." };
  } catch (error) {
    console.error("[createJobPosting]", error);
    return { success: false, message: "Failed to create job posting." };
  }
}

export async function updateJobPosting(
  id: string,
  data: JobPostingFormValues
): Promise<ActionState> {
  const parsed = JobPostingFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const conflict = await prisma.jobPosting.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
    });
    if (conflict) {
      return {
        success: false,
        message: "A job posting with this slug already exists.",
        errors: { slug: ["Slug is already taken"] },
      };
    }

    await prisma.jobPosting.update({
      where: { id },
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        department: parsed.data.department,
        type: parsed.data.type,
        location: parsed.data.location,
        summary: parsed.data.summary,
        description: parsed.data.description,
        requirements: parsed.data.requirements,
        responsibilities: parsed.data.responsibilities,
        isPublished: parsed.data.isPublished,
        closingDate: parsed.data.closingDate ? new Date(parsed.data.closingDate) : null,
        order: parsed.data.order,
        seoTitle: parsed.data.seoTitle || null,
        seoDesc: parsed.data.seoDesc || null,
      },
    });

    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true, message: "Job posting updated successfully." };
  } catch (error) {
    console.error("[updateJobPosting]", error);
    return { success: false, message: "Failed to update job posting." };
  }
}

export async function deleteJobPosting(id: string): Promise<ActionState> {
  try {
    await prisma.jobPosting.delete({ where: { id } });
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return { success: true, message: "Job posting deleted." };
  } catch (error) {
    console.error("[deleteJobPosting]", error);
    return { success: false, message: "Failed to delete job posting." };
  }
}

export async function toggleJobPostingPublish(id: string): Promise<ActionState> {
  try {
    const job = await prisma.jobPosting.findUnique({ where: { id } });
    if (!job) return { success: false, message: "Job posting not found." };

    await prisma.jobPosting.update({
      where: { id },
      data: { isPublished: !job.isPublished },
    });

    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    return {
      success: true,
      message: job.isPublished ? "Job posting unpublished." : "Job posting published.",
    };
  } catch (error) {
    console.error("[toggleJobPostingPublish]", error);
    return { success: false, message: "Failed to update publish status." };
  }
}

// ─── Applications ─────────────────────────────────────────────────────────────

export async function getAllApplicationsAdmin(jobId?: string) {
  return prisma.jobApplication.findMany({
    where: jobId ? { jobId } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      job: { select: { title: true, slug: true } },
    },
  });
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
): Promise<ActionState> {
  try {
    await prisma.jobApplication.update({ where: { id }, data: { status } });
    revalidatePath("/admin/careers");
    return { success: true, message: "Application status updated." };
  } catch (error) {
    console.error("[updateApplicationStatus]", error);
    return { success: false, message: "Failed to update status." };
  }
}

export async function updateApplicationNotes(
  id: string,
  notes: string
): Promise<ActionState> {
  try {
    await prisma.jobApplication.update({ where: { id }, data: { notes } });
    revalidatePath("/admin/careers");
    return { success: true, message: "Notes saved." };
  } catch (error) {
    console.error("[updateApplicationNotes]", error);
    return { success: false, message: "Failed to save notes." };
  }
}
