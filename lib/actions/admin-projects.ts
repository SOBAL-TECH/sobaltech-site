"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  ProjectFormSchema,
  type ProjectFormValues,
} from "@/lib/validations/project";
import type { ActionState } from "@/types";

export async function createProject(data: ProjectFormValues): Promise<ActionState> {
  const parsed = ProjectFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.project.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return {
        success: false,
        message: "A project with this slug already exists.",
        errors: { slug: ["Slug is already taken"] },
      };
    }

    await prisma.project.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        summary: parsed.data.summary,
        description: parsed.data.description,
        coverImage: parsed.data.coverImage || null,
        images: parsed.data.images,
        tags: parsed.data.tags,
        client: parsed.data.client || null,
        liveUrl: parsed.data.liveUrl || null,
        githubUrl: parsed.data.githubUrl || null,
        status: parsed.data.status,
        isFeatured: parsed.data.isFeatured,
        order: parsed.data.order,
        isPublished: parsed.data.isPublished,
        completedAt: parsed.data.completedAt ?? null,
        seoTitle: parsed.data.seoTitle || null,
        seoDesc: parsed.data.seoDesc || null,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");

    return { success: true, message: "Project created successfully." };
  } catch (error) {
    console.error("[createProject]", error);
    return { success: false, message: "Failed to create project. Please try again." };
  }
}

export async function updateProject(
  id: string,
  data: ProjectFormValues
): Promise<ActionState> {
  const parsed = ProjectFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.project.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
    });
    if (existing) {
      return {
        success: false,
        message: "A project with this slug already exists.",
        errors: { slug: ["Slug is already taken"] },
      };
    }

    await prisma.project.update({
      where: { id },
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        summary: parsed.data.summary,
        description: parsed.data.description,
        coverImage: parsed.data.coverImage || null,
        images: parsed.data.images,
        tags: parsed.data.tags,
        client: parsed.data.client || null,
        liveUrl: parsed.data.liveUrl || null,
        githubUrl: parsed.data.githubUrl || null,
        status: parsed.data.status,
        isFeatured: parsed.data.isFeatured,
        order: parsed.data.order,
        isPublished: parsed.data.isPublished,
        completedAt: parsed.data.completedAt ?? null,
        seoTitle: parsed.data.seoTitle || null,
        seoDesc: parsed.data.seoDesc || null,
      },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${parsed.data.slug}`);

    return { success: true, message: "Project updated successfully." };
  } catch (error) {
    console.error("[updateProject]", error);
    return { success: false, message: "Failed to update project. Please try again." };
  }
}

export async function deleteProject(id: string): Promise<ActionState> {
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return { success: false, message: "Project not found." };
    }

    await prisma.project.delete({ where: { id } });

    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");

    return { success: true, message: "Project deleted successfully." };
  } catch (error) {
    console.error("[deleteProject]", error);
    return { success: false, message: "Failed to delete project. Please try again." };
  }
}

export async function toggleProjectPublish(id: string): Promise<ActionState> {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      select: { isPublished: true, slug: true },
    });
    if (!project) {
      return { success: false, message: "Project not found." };
    }

    await prisma.project.update({
      where: { id },
      data: { isPublished: !project.isPublished },
    });

    revalidatePath("/admin/projects");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${project.slug}`);

    return {
      success: true,
      message: project.isPublished ? "Project unpublished." : "Project published.",
    };
  } catch (error) {
    console.error("[toggleProjectPublish]", error);
    return { success: false, message: "Failed to update project. Please try again." };
  }
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function getAllProjectsAdmin() {
  return prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}
