"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  BlogPostFormSchema,
  type BlogPostFormValues,
} from "@/lib/validations/blog";
import type { ActionState } from "@/types";

export async function createBlogPost(data: BlogPostFormValues): Promise<ActionState> {
  const parsed = BlogPostFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return {
        success: false,
        message: "A blog post with this slug already exists.",
        errors: { slug: ["Slug is already taken"] },
      };
    }

    await prisma.blogPost.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        coverImage: parsed.data.coverImage || null,
        tags: parsed.data.tags,
        author: parsed.data.author,
        authorImage: parsed.data.authorImage || null,
        status: parsed.data.status,
        isFeatured: parsed.data.isFeatured,
        readTime: parsed.data.readTime,
        publishedAt:
          parsed.data.status === "PUBLISHED"
            ? (parsed.data.publishedAt ?? new Date())
            : parsed.data.publishedAt ?? null,
        seoTitle: parsed.data.seoTitle || null,
        seoDesc: parsed.data.seoDesc || null,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    return { success: true, message: "Blog post created successfully." };
  } catch (error) {
    console.error("[createBlogPost]", error);
    return { success: false, message: "Failed to create blog post. Please try again." };
  }
}

export async function updateBlogPost(
  id: string,
  data: BlogPostFormValues
): Promise<ActionState> {
  const parsed = BlogPostFormSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const existing = await prisma.blogPost.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
    });
    if (existing) {
      return {
        success: false,
        message: "A blog post with this slug already exists.",
        errors: { slug: ["Slug is already taken"] },
      };
    }

    const current = await prisma.blogPost.findUnique({
      where: { id },
      select: { publishedAt: true, status: true },
    });

    await prisma.blogPost.update({
      where: { id },
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        coverImage: parsed.data.coverImage || null,
        tags: parsed.data.tags,
        author: parsed.data.author,
        authorImage: parsed.data.authorImage || null,
        status: parsed.data.status,
        isFeatured: parsed.data.isFeatured,
        readTime: parsed.data.readTime,
        publishedAt:
          parsed.data.status === "PUBLISHED" && !current?.publishedAt
            ? new Date()
            : (parsed.data.publishedAt ?? current?.publishedAt ?? null),
        seoTitle: parsed.data.seoTitle || null,
        seoDesc: parsed.data.seoDesc || null,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${parsed.data.slug}`);

    return { success: true, message: "Blog post updated successfully." };
  } catch (error) {
    console.error("[updateBlogPost]", error);
    return { success: false, message: "Failed to update blog post. Please try again." };
  }
}

export async function deleteBlogPost(id: string): Promise<ActionState> {
  try {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return { success: false, message: "Blog post not found." };
    }

    await prisma.blogPost.delete({ where: { id } });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");

    return { success: true, message: "Blog post deleted successfully." };
  } catch (error) {
    console.error("[deleteBlogPost]", error);
    return { success: false, message: "Failed to delete blog post. Please try again." };
  }
}

export async function toggleBlogPostPublish(id: string): Promise<ActionState> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
      select: { status: true, slug: true, publishedAt: true },
    });
    if (!post) {
      return { success: false, message: "Blog post not found." };
    }

    const isPublished = post.status === "PUBLISHED";

    await prisma.blogPost.update({
      where: { id },
      data: {
        status: isPublished ? "DRAFT" : "PUBLISHED",
        publishedAt: !isPublished && !post.publishedAt ? new Date() : post.publishedAt,
      },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);

    return {
      success: true,
      message: isPublished ? "Blog post unpublished." : "Blog post published.",
    };
  } catch (error) {
    console.error("[toggleBlogPostPublish]", error);
    return { success: false, message: "Failed to update blog post. Please try again." };
  }
}

export async function getBlogPostById(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export async function getAllBlogPostsAdmin() {
  return prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
}
