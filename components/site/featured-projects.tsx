"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

// ─── Placeholder data ─────────────────────────────────────────────────────────

const PLACEHOLDER_PROJECTS: Pick<
  Project,
  | "id"
  | "title"
  | "slug"
  | "summary"
  | "coverImage"
  | "tags"
  | "client"
  | "liveUrl"
  | "status"
>[] = [
  {
    id: "1",
    title: "Nexus AI Platform",
    slug: "nexus-ai-platform",
    summary:
      "End-to-end AI analytics platform with real-time dashboards, natural language query interface, and automated anomaly detection for enterprise data teams.",
    coverImage: null,
    tags: ["Next.js", "Python", "OpenAI", "PostgreSQL", "AWS"],
    client: "Nexus AI",
    liveUrl: "https://nexusai.example.com",
    status: "COMPLETED",
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
    liveUrl: "https://growthstack.example.com",
    status: "COMPLETED",
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
  },
];

// ─── Gradient covers ──────────────────────────────────────────────────────────

const COVER_STYLES = [
  {
    bg: "from-indigo-900 via-indigo-800 to-violet-900",
    glow: "rgba(99,102,241,0.2)",
  },
  {
    bg: "from-slate-900 via-indigo-950 to-blue-900",
    glow: "rgba(79,70,229,0.2)",
  },
  {
    bg: "from-violet-950 via-indigo-900 to-slate-900",
    glow: "rgba(139,92,246,0.2)",
  },
  {
    bg: "from-blue-950 via-slate-900 to-indigo-900",
    glow: "rgba(99,102,241,0.18)",
  },
] as const;

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PLACEHOLDER_PROJECTS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cover = COVER_STYLES[index % COVER_STYLES.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_42px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_14px_42px_rgba(0,0,0,0.38)]"
    >
      {/* ── Cover image area ── */}
      <div className="relative h-32 overflow-hidden sm:h-36">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-gradient-to-br",
              cover.bg,
            )}
          >
            {/* Inner glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${cover.glow} 0%, transparent 70%)`,
              }}
            />
            {/* Large ghost letter */}
            <span className="select-none text-5xl font-black tracking-tighter text-white/[0.06]">
              {project.title[0]}
            </span>
            {/* Simulated UI lines */}
            <div className="pointer-events-none absolute inset-6 flex flex-col justify-end gap-2 opacity-20">
              <div className="h-1.5 w-3/4 rounded-full bg-white/30" />
              <div className="h-1.5 w-1/2 rounded-full bg-white/20" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/15" />
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-indigo-600/0 transition-colors duration-300 group-hover:bg-indigo-600/[0.04]" />

        {/* Status badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-2.5 py-0.5 text-[10px] font-medium text-white/75 backdrop-blur-md">
            {project.status === "COMPLETED" ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Delivered
              </>
            ) : (
              <>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                In Progress
              </>
            )}
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col gap-3 p-4">
        {/* Client eyebrow */}
        {project.client && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400">
            {project.client}
          </p>
        )}

        {/* Title */}
        <h3 className="line-clamp-1 text-base font-bold text-foreground transition-colors duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
          {project.title}
        </h3>

        {/* Summary */}
        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
          {project.summary}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <Link href={`/portfolio/${project.slug}`}>
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 rounded-lg px-3 text-xs"
            >
              View
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live site
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface FeaturedProjectsProps {
  projects?: Project[];
}

export function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
  const items =
    projects.length > 0
      ? projects.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          summary: p.summary,
          coverImage: p.coverImage,
          tags: p.tags,
          client: p.client,
          liveUrl: p.liveUrl,
          status: p.status,
        }))
      : PLACEHOLDER_PROJECTS;

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-4 py-1.5 mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
              Our Work
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Recent projects we&apos;re proud of
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            A selection of our most impactful work. Every project ships with
            clean code, thoughtful UX, and production-grade reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-9 text-center"
        >
          <Link href="/portfolio">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-xl px-7"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
