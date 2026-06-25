"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  TestimonialFormSchema,
  type TestimonialFormValues,
} from "@/lib/validations/testimonial";
import type { ActionState } from "@/types";

export async function createTestimonial(data: TestimonialFormValues): Promise<ActionState> {
  const parsed = TestimonialFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.testimonial.create({
      data: {
        name: parsed.data.name,
        role: parsed.data.role,
        company: parsed.data.company,
        avatar: parsed.data.avatar || null,
        content: parsed.data.content,
        rating: parsed.data.rating,
        isFeatured: parsed.data.isFeatured,
        isPublished: parsed.data.isPublished,
        order: parsed.data.order,
      },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");

    return { success: true, message: "Testimonial created successfully." };
  } catch (error) {
    console.error("[createTestimonial]", error);
    return { success: false, message: "Failed to create testimonial. Please try again." };
  }
}

export async function updateTestimonial(
  id: string,
  data: TestimonialFormValues
): Promise<ActionState> {
  const parsed = TestimonialFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.testimonial.update({
      where: { id },
      data: {
        name: parsed.data.name,
        role: parsed.data.role,
        company: parsed.data.company,
        avatar: parsed.data.avatar || null,
        content: parsed.data.content,
        rating: parsed.data.rating,
        isFeatured: parsed.data.isFeatured,
        isPublished: parsed.data.isPublished,
        order: parsed.data.order,
      },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");

    return { success: true, message: "Testimonial updated successfully." };
  } catch (error) {
    console.error("[updateTestimonial]", error);
    return { success: false, message: "Failed to update testimonial. Please try again." };
  }
}

export async function deleteTestimonial(id: string): Promise<ActionState> {
  try {
    await prisma.testimonial.delete({ where: { id } });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");

    return { success: true, message: "Testimonial deleted successfully." };
  } catch (error) {
    console.error("[deleteTestimonial]", error);
    return { success: false, message: "Failed to delete testimonial. Please try again." };
  }
}

export async function toggleTestimonialPublish(id: string): Promise<ActionState> {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      select: { isPublished: true },
    });
    if (!testimonial) {
      return { success: false, message: "Testimonial not found." };
    }

    await prisma.testimonial.update({
      where: { id },
      data: { isPublished: !testimonial.isPublished },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");

    return {
      success: true,
      message: testimonial.isPublished ? "Testimonial hidden." : "Testimonial published.",
    };
  } catch (error) {
    console.error("[toggleTestimonialPublish]", error);
    return { success: false, message: "Failed to update testimonial. Please try again." };
  }
}

export async function getAllTestimonialsAdmin() {
  return prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}
