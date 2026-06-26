import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ─── Static routes ─────────────────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/request-quote`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  // ─── Dynamic routes ─────────────────────────────────────────────────────────
  try {
    const [services, products, projects, posts, jobs] = await Promise.all([
      prisma.service.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.product.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.project.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.jobPosting.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
      url: `${siteUrl}/services/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${siteUrl}/products/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `${siteUrl}/portfolio/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    const jobRoutes: MetadataRoute.Sitemap = jobs.map((j) => ({
      url: `${siteUrl}/careers/${j.slug}`,
      lastModified: j.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    return [
      ...staticRoutes,
      ...serviceRoutes,
      ...productRoutes,
      ...projectRoutes,
      ...postRoutes,
      ...jobRoutes,
    ];
  } catch {
    return staticRoutes;
  }
}
