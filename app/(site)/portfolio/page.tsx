import type { Metadata } from "next";

import { prisma } from "@/lib/db";
import { buildMeta } from "@/lib/seo";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";

import { CTASection } from "@/components/site/cta-section";
import { FALLBACK_PROJECTS } from "@/lib/portfolio-fallbacks";
import { PortfolioFilters } from "./filters";
import type { Project } from "@/types";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMeta({
  title: "Our Work | SobalTech",
  description:
    "Explore SobalTech's portfolio of web, mobile, and cloud projects. Real results for real clients.",
  path: "/portfolio",
});

// ─── Data ─────────────────────────────────────────────────────────────────────

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [
        { isFeatured: "desc" },
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });
    return projects.length > 0 ? projects : FALLBACK_PROJECTS;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        title="Our Work"
        description="A selection of our most impactful projects. Every delivery ships with clean code, thoughtful UX, and production-grade reliability."
        breadcrumbs={[{ label: "Portfolio" }]}
      />

      <Container className="py-16 sm:py-20">
        {/* Client-side filter tabs */}
        <PortfolioFilters projects={projects} />
      </Container>

      <CTASection />
    </>
  );
}
