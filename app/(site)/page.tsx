import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { buildMeta } from "@/lib/seo";
import { HeroSection } from "@/components/site/hero-section";
import { LiveDashboardSection } from "@/components/site/live-dashboard-section";
import { ServicesPreview } from "@/components/site/services-preview";
import { FeaturedProjects } from "@/components/site/featured-projects";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { CTASection } from "@/components/site/cta-section";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMeta({
  title: "SobalTech — Building the Future, One Line at a Time",
  description:
    "SobalTech is a full-service digital agency building high-performance web apps, mobile solutions, and cloud infrastructure for ambitious companies. Start your project today.",
  path: "/",
});

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({
      where: { isFeatured: true, isPublished: true },
      orderBy: { order: "asc" },
      take: 4,
    });
  } catch {
    return [];
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
      <LiveDashboardSection />
      <ServicesPreview />
      <FeaturedProjects projects={projects} />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </>
  );
}
