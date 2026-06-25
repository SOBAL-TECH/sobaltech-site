"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  ServiceFormSchema,
  type ServiceFormValues,
} from "@/lib/validations/service";
import type { ActionState } from "@/types";

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createService(data: ServiceFormValues): Promise<ActionState> {
  const parsed = ServiceFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.service.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return {
        success: false,
        message: "A service with this slug already exists.",
        errors: { slug: ["Slug is already taken"] },
      };
    }

    await prisma.service.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        description: parsed.data.description,
        content: parsed.data.content,
        icon: parsed.data.icon || null,
        image: parsed.data.image || null,
        features: parsed.data.features,
        order: parsed.data.order,
        isPublished: parsed.data.isPublished,
        seoTitle: parsed.data.seoTitle || null,
        seoDesc: parsed.data.seoDesc || null,
      },
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");

    return { success: true, message: "Service created successfully." };
  } catch (error) {
    console.error("[createService]", error);
    return { success: false, message: "Failed to create service. Please try again." };
  }
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateService(
  id: string,
  data: ServiceFormValues
): Promise<ActionState> {
  const parsed = ServiceFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.service.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
    });
    if (existing) {
      return {
        success: false,
        message: "A service with this slug already exists.",
        errors: { slug: ["Slug is already taken"] },
      };
    }

    await prisma.service.update({
      where: { id },
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        description: parsed.data.description,
        content: parsed.data.content,
        icon: parsed.data.icon || null,
        image: parsed.data.image || null,
        features: parsed.data.features,
        order: parsed.data.order,
        isPublished: parsed.data.isPublished,
        seoTitle: parsed.data.seoTitle || null,
        seoDesc: parsed.data.seoDesc || null,
      },
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath(`/services/${parsed.data.slug}`);

    return { success: true, message: "Service updated successfully." };
  } catch (error) {
    console.error("[updateService]", error);
    return { success: false, message: "Failed to update service. Please try again." };
  }
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteService(id: string): Promise<ActionState> {
  try {
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) {
      return { success: false, message: "Service not found." };
    }

    await prisma.service.delete({ where: { id } });

    revalidatePath("/admin/services");
    revalidatePath("/services");

    return { success: true, message: "Service deleted successfully." };
  } catch (error) {
    console.error("[deleteService]", error);
    return { success: false, message: "Failed to delete service. Please try again." };
  }
}

// ─── Toggle publish ───────────────────────────────────────────────────────────

export async function toggleServicePublish(id: string): Promise<ActionState> {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
      select: { isPublished: true, slug: true },
    });
    if (!service) {
      return { success: false, message: "Service not found." };
    }

    await prisma.service.update({
      where: { id },
      data: { isPublished: !service.isPublished },
    });

    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);

    return {
      success: true,
      message: service.isPublished ? "Service unpublished." : "Service published.",
    };
  } catch (error) {
    console.error("[toggleServicePublish]", error);
    return { success: false, message: "Failed to update service. Please try again." };
  }
}

// ─── Get by ID ────────────────────────────────────────────────────────────────

export async function getServiceById(id: string) {
  return prisma.service.findUnique({ where: { id } });
}

// ─── Get all (admin) ──────────────────────────────────────────────────────────

export async function getAllServicesAdmin() {
  return prisma.service.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
}
