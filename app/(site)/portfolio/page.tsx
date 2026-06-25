import type { Metadata } from "next";

import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";

import { CTASection } from "@/components/site/cta-section";
import { PortfolioFilters } from "./filters";
import type { Project } from "@/types";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Our Work | SobalTech",
  description:
    "Explore SobalTech's portfolio of web, mobile, and cloud projects. Real results for real clients.",
  openGraph: {
    title: "Our Work | SobalTech",
    description: "A curated selection of our most impactful client projects.",
  },
};

// ─── Placeholder ──────────────────────────────────────────────────────────────

const PLACEHOLDER_PROJECTS: Partial<Project>[] = [
  {
    id: "1",
    title: "Nexus AI Platform",
    slug: "nexus-ai-platform",
    summary:
      "End-to-end AI analytics platform with real-time dashboards, natural language query interface, and automated anomaly detection for enterprise data teams.",
    coverImage: null,
    tags: ["Next.js", "Python", "OpenAI", "PostgreSQL", "AWS"],
    client: "Nexus AI",
    liveUrl: null,
    status: "COMPLETED",
    isFeatured: true,
  },
  {
    id: "2",
    title: "GrowthStack SaaS Dashboard",
    slug: "growthstack-dashboard",
    summary:
      "Full-featured growth analytics SaaS with multi-tenant architecture, custom charting engine, Stripe billing, and team collaboration features.",
    coverImage: null,
    tags: ["React", "Node.js", "Stripe", "Redis", "Docker"],
    client: "GrowthStack",
    liveUrl: null,
    status: "COMPLETED",
    isFeatured: false,
  },
  {
    id: "3",
    title: "RetailEdge Mobile App",
    slug: "retailedge-mobile",
    summary:
      "Cross-platform React Native shopping app with AR product preview, AI-powered recommendations, offline cart, and push notifications — 4.8 stars on both stores.",
    coverImage: null,
    tags: ["React Native", "Expo", "TypeScript", "GraphQL", "Firebase"],
    client: "RetailEdge",
    liveUrl: null,
    status: "COMPLETED",
    isFeatured: false,
  },
  {
    id: "4",
    title: "Finleap Cloud Migration",
    slug: "finleap-cloud-migration",
    summary:
      "Full AWS migration for a fintech platform: containerized microservices, RDS clusters, zero-downtime deployment pipeline, and SOC 2 compliant infrastructure.",
    coverImage: null,
    tags: ["AWS", "Kubernetes", "Terraform", "Postgres", "CI/CD"],
    client: "Finleap",
    liveUrl: null,
    status: "COMPLETED",
    isFeatured: false,
  },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

async function getProjects(): Promise<Partial<Project>[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [
        { isFeatured: "desc" },
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });
    return projects.length > 0 ? projects : PLACEHOLDER_PROJECTS;
  } catch {
    return PLACEHOLDER_PROJECTS;
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
        <PortfolioFilters projects={projects as Project[]} />
      </Container>

      <CTASection />
    </>
  );
}
