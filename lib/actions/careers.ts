"use server";

import { prisma } from "@/lib/db";
import {
  JobApplicationSchema,
  type JobApplicationValues,
} from "@/lib/validations/careers";
import type { ActionState } from "@/types";

export async function getPublishedJobPostings() {
  try {
    return await prisma.jobPosting.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        department: true,
        type: true,
        location: true,
        summary: true,
        requirements: true,
        closingDate: true,
        _count: { select: { applications: true } },
      },
    });
  } catch {
    return [];
  }
}

export async function getPublishedJob(slug: string) {
  try {
    return await prisma.jobPosting.findUnique({
      where: { slug, isPublished: true },
    });
  } catch {
    return null;
  }
}

export async function getAllPublishedJobSlugs() {
  try {
    const jobs = await prisma.jobPosting.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    return jobs.map((j) => j.slug);
  } catch {
    return [];
  }
}

export async function submitJobApplication(
  data: JobApplicationValues
): Promise<ActionState> {
  const parsed = JobApplicationSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const job = await prisma.jobPosting.findUnique({
      where: { id: parsed.data.jobId, isPublished: true },
      select: { id: true, title: true },
    });
    if (!job) {
      return {
        success: false,
        message: "This position is no longer available.",
      };
    }

    await prisma.jobApplication.create({
      data: {
        jobId: parsed.data.jobId,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        linkedIn: parsed.data.linkedIn || null,
        portfolioUrl: parsed.data.portfolioUrl || null,
        coverLetter: parsed.data.coverLetter,
      },
    });

    return {
      success: true,
      message: "Application submitted! We will review it and get back to you.",
    };
  } catch (error) {
    console.error("[submitJobApplication]", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}
