import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { buildMeta } from "@/lib/seo";
import { FALLBACK_PROJECTS } from "@/lib/portfolio-fallbacks";
import { HeroSection } from "@/components/site/hero-section";
import { LiveDashboardSection } from "@/components/site/live-dashboard-section";
import { ServicesPreview } from "@/components/site/services-preview";
import { FeaturedProjects } from "@/components/site/featured-projects";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { TechStackSection } from "@/components/site/tech-stack-section";
import { CTASection } from "@/components/site/cta-section";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMeta({
  title: "SobalTech | Building the Future, One Line at a Time",
  description:
    "SobalTech is a full-service digital agency building high-performance web apps, mobile solutions, and cloud infrastructure for ambitious companies. Start your project today.",
  path: "/",
});

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getFeaturedProjects() {
  try {
    const dbProjects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ isFeatured: "desc" }, { order: "asc" }],
    });
    if (dbProjects.length >= 6) return dbProjects.slice(0, 6);
    // Pad with fallbacks so we always have 6 cards
    const dbSlugs = new Set(dbProjects.map((p) => p.slug));
    const extras = FALLBACK_PROJECTS.filter((p) => !dbSlugs.has(p.slug));
    return [...dbProjects, ...extras].slice(0, 6);
  } catch {
    return FALLBACK_PROJECTS;
  }
}

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
      take: 12,
    });
  } catch {
    return [];
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [projects, testimonials] = await Promise.all([
    getFeaturedProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection />
      <TechStackSection />
      <LiveDashboardSection />
      <ServicesPreview />
      <FeaturedProjects projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
