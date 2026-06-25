"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  ProductFormSchema,
  type ProductFormValues,
} from "@/lib/validations/product";
import type { ActionState } from "@/types";

export async function createProduct(data: ProductFormValues): Promise<ActionState> {
  const parsed = ProductFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.product.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return {
        success: false,
        message: "A product with this slug already exists.",
        errors: { slug: ["Slug is already taken"] },
      };
    }

    await prisma.product.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        description: parsed.data.description,
        content: parsed.data.content,
        icon: parsed.data.icon || null,
        image: parsed.data.image || null,
        features: parsed.data.features,
        price: parsed.data.price || null,
        ctaLabel: parsed.data.ctaLabel,
        ctaHref: parsed.data.ctaHref,
        order: parsed.data.order,
        isPublished: parsed.data.isPublished,
        seoTitle: parsed.data.seoTitle || null,
        seoDesc: parsed.data.seoDesc || null,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true, message: "Product created successfully." };
  } catch (error) {
    console.error("[createProduct]", error);
    return { success: false, message: "Failed to create product. Please try again." };
  }
}

export async function updateProduct(
  id: string,
  data: ProductFormValues
): Promise<ActionState> {
  const parsed = ProductFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.product.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
    });
    if (existing) {
      return {
        success: false,
        message: "A product with this slug already exists.",
        errors: { slug: ["Slug is already taken"] },
      };
    }

    await prisma.product.update({
      where: { id },
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        description: parsed.data.description,
        content: parsed.data.content,
        icon: parsed.data.icon || null,
        image: parsed.data.image || null,
        features: parsed.data.features,
        price: parsed.data.price || null,
        ctaLabel: parsed.data.ctaLabel,
        ctaHref: parsed.data.ctaHref,
        order: parsed.data.order,
        isPublished: parsed.data.isPublished,
        seoTitle: parsed.data.seoTitle || null,
        seoDesc: parsed.data.seoDesc || null,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${parsed.data.slug}`);

    return { success: true, message: "Product updated successfully." };
  } catch (error) {
    console.error("[updateProduct]", error);
    return { success: false, message: "Failed to update product. Please try again." };
  }
}

export async function deleteProduct(id: string): Promise<ActionState> {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return { success: false, message: "Product not found." };
    }

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin/products");
    revalidatePath("/products");

    return { success: true, message: "Product deleted successfully." };
  } catch (error) {
    console.error("[deleteProduct]", error);
    return { success: false, message: "Failed to delete product. Please try again." };
  }
}

export async function toggleProductPublish(id: string): Promise<ActionState> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { isPublished: true, slug: true },
    });
    if (!product) {
      return { success: false, message: "Product not found." };
    }

    await prisma.product.update({
      where: { id },
      data: { isPublished: !product.isPublished },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);

    return {
      success: true,
      message: product.isPublished ? "Product unpublished." : "Product published.",
    };
  } catch (error) {
    console.error("[toggleProductPublish]", error);
    return { success: false, message: "Failed to update product. Please try again." };
  }
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function getAllProductsAdmin() {
  return prisma.product.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}
