"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

// ─── Filter categories ────────────────────────────────────────────────────────

type FilterKey = "All" | "Web" | "Mobile" | "Design" | "Cloud";

const FILTERS: FilterKey[] = ["All", "Web", "Mobile", "Design", "Cloud"];

const TAG_CATEGORY_MAP: Record<string, FilterKey[]> = {
  "Next.js": ["Web"],
  React: ["Web"],
  "React Native": ["Mobile"],
  Expo: ["Mobile"],
  Figma: ["Design"],
  Flutter: ["Mobile"],
  AWS: ["Cloud"],
  GCP: ["Cloud"],
  Azure: ["Cloud"],
  Kubernetes: ["Cloud"],
  Terraform: ["Cloud"],
  Docker: ["Cloud"],
  "UI/UX": ["Design"],
};

function projectMatchesFilter(project: Project, filter: FilterKey): boolean {
  if (filter === "All") return true;
  return project.tags.some((tag) =>
    (TAG_CATEGORY_MAP[tag] ?? []).includes(filter)
  );
}

// ─── Placeholder cover ────────────────────────────────────────────────────────

const GRADIENTS = [
  "from-brand-900/80 via-brand-800/60 to-violet-900/80",
  "from-slate-900/80 via-brand-950/60 to-brand-900/80",
  "from-violet-950/80 via-brand-900/60 to-slate-900/80",
  "from-brand-950/80 via-slate-900/60 to-violet-900/80",
];

function CoverPlaceholder({ title, index }: { title: string; index: number }) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br",
        GRADIENTS[index % GRADIENTS.length]
      )}
    >
      <span className="select-none text-4xl font-bold tracking-tighter text-white/10">
        {title[0]}
      </span>
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
      {/* Cover image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <CoverPlaceholder title={project.title} index={index} />
        )}

        {/* Status */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-md border border-white/10">
            {project.status === "COMPLETED" ? "✓ Delivered" : "In Progress"}
          </span>
        </div>
        {project.isFeatured && (
          <div className="absolute right-3 top-3">
            <span className="rounded-full bg-brand-500/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5">
        {project.client && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-500">
            {project.client}
          </p>
        )}

        <h2 className="text-base font-bold tracking-tight group-hover:text-brand-500 transition-colors">
          {project.title}
        </h2>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {project.summary}
        </p>

        {/* Tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full px-2 py-0.5 text-[11px]"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-[11px]">
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-1 flex items-center gap-3 pt-1 border-t border-border">
          <Link href={`/portfolio/${project.slug}`} className="flex-1">
            <Button variant="ghost" size="sm" className="w-full justify-between text-xs">
              View Case Study
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface PortfolioFiltersProps {
  projects: Project[];
}

export function PortfolioFilters({ projects }: PortfolioFiltersProps) {
  const [activeFilter, setActiveFilter] = React.useState<FilterKey>("All");

  const filtered = React.useMemo(
    () => projects.filter((p) => projectMatchesFilter(p, activeFilter)),
    [projects, activeFilter]
  );

  return (
    <div className="space-y-8">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "rounded-full",
              activeFilter === filter && "bg-brand-gradient text-white hover:opacity-90"
            )}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed text-center">
          <p className="text-sm text-muted-foreground">
            No projects in this category yet.
          </p>
          <Button variant="ghost" size="sm" onClick={() => setActiveFilter("All")}>
            Show all
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
