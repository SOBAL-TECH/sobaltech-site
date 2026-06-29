"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, animate } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type CardItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: string | null;
  tags: readonly string[] | string[];
  client: string | null;
  liveUrl: string | null;
  status: string;
};

// ─── Placeholder data ─────────────────────────────────────────────────────────

const PLACEHOLDER_PROJECTS = [
  {
    id: "1",
    title: "Nexus AI Platform",
    slug: "nexus-ai-platform",
    summary: "End-to-end AI analytics platform with real-time dashboards, natural language queries, and automated anomaly detection for enterprise data teams.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&auto=format&fit=crop&q=80",
    tags: ["Next.js", "Python", "OpenAI", "PostgreSQL"],
    client: "Nexus AI",
    liveUrl: null,
    status: "COMPLETED",
  },
  {
    id: "2",
    title: "GrowthStack SaaS Dashboard",
    slug: "growthstack-dashboard",
    summary: "Multi-tenant growth analytics SaaS with custom charting engine, Stripe billing, and team collaboration features.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&auto=format&fit=crop&q=80",
    tags: ["React", "Node.js", "Stripe", "Redis"],
    client: "GrowthStack",
    liveUrl: null,
    status: "COMPLETED",
  },
  {
    id: "3",
    title: "RetailEdge Mobile App",
    slug: "retailedge-mobile",
    summary: "Cross-platform React Native shopping app with AI recommendations, offline cart, and push notifications. 4.8 stars, 60k downloads in month one.",
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&auto=format&fit=crop&q=80",
    tags: ["React Native", "Expo", "GraphQL", "Firebase"],
    client: "RetailEdge",
    liveUrl: null,
    status: "COMPLETED",
  },
  {
    id: "4",
    title: "Finleap Cloud Migration",
    slug: "finleap-cloud-migration",
    summary: "Zero-downtime AWS migration for a live fintech platform with Kubernetes, Terraform, and SOC 2 compliant infrastructure.",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&auto=format&fit=crop&q=80",
    tags: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    client: "Finleap",
    liveUrl: null,
    status: "COMPLETED",
  },
  {
    id: "5",
    title: "HealthOS Patient Portal",
    slug: "healthos-patient-portal",
    summary: "HIPAA-compliant patient portal with appointment booking, secure messaging, and EHR integration. 40k active patients in 3 months.",
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&auto=format&fit=crop&q=80",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
    client: "HealthOS",
    liveUrl: null,
    status: "COMPLETED",
  },
  {
    id: "6",
    title: "TradeFlow Logistics Platform",
    slug: "tradeflow-logistics",
    summary: "Real-time logistics platform with live fleet tracking, route optimisation, and automated invoicing across 200 active vehicles.",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&auto=format&fit=crop&q=80",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    client: "TradeFlow",
    liveUrl: null,
    status: "COMPLETED",
  },
] as const;

// ─── Cover visuals ─────────────────────────────────────────────────────────────

const COVERS = [
  { grad: "from-indigo-900 via-indigo-800 to-violet-900", glow: "rgba(99,102,241,0.25)", accent: "#818cf8" },
  { grad: "from-slate-900 via-indigo-950 to-blue-900", glow: "rgba(79,70,229,0.22)", accent: "#60a5fa" },
  { grad: "from-violet-950 via-indigo-900 to-slate-900", glow: "rgba(139,92,246,0.22)", accent: "#a78bfa" },
  { grad: "from-blue-950 via-slate-900 to-indigo-900", glow: "rgba(59,130,246,0.2)", accent: "#67e8f9" },
  { grad: "from-emerald-950 via-slate-900 to-teal-900", glow: "rgba(16,185,129,0.2)", accent: "#34d399" },
  { grad: "from-rose-950 via-slate-900 to-indigo-900", glow: "rgba(244,63,94,0.18)", accent: "#fb7185" },
  { grad: "from-amber-950 via-slate-900 to-orange-900", glow: "rgba(245,158,11,0.2)", accent: "#fbbf24" },
] as const;

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  cardWidth,
}: {
  project: CardItem;
  index: number;
  cardWidth: number;
}) {
  const cover = COVERS[index % COVERS.length];

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] select-none"
      style={{ width: cardWidth, minWidth: cardWidth }}
    >
      {/* Cover */}
      <div className="relative h-40 overflow-hidden shrink-0">
        {project.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={cn("relative flex h-full w-full items-center justify-center bg-gradient-to-br", cover.grad)}>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: `radial-gradient(ellipse 60% 70% at 50% 40%, ${cover.glow} 0%, transparent 70%)` }}
            />
            {/* Fake UI chrome */}
            <div className="pointer-events-none absolute inset-0 flex flex-col p-4 gap-2 opacity-30">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="h-2 w-2 rounded-full" style={{ background: cover.accent, opacity: 0.7 }} />
                <div className="h-1.5 w-16 rounded-full bg-white/20" />
              </div>
              <div className="h-1.5 rounded-full bg-white/20 w-3/4" />
              <div className="h-1.5 rounded-full bg-white/15 w-1/2" />
              <div className="mt-auto grid grid-cols-3 gap-1.5">
                <div className="h-8 rounded-md bg-white/10" />
                <div className="h-8 rounded-md bg-white/10" />
                <div className="h-8 rounded-md bg-white/10" />
              </div>
              <div className="h-1.5 rounded-full bg-white/10 w-2/3" />
            </div>
            {/* First-letter ghost */}
            <span className="select-none text-6xl font-black tracking-tighter text-white/[0.05]">
              {project.title[0]}
            </span>
          </div>
        )}
        {/* Status badge */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-2.5 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Delivered
          </span>
        </div>
        {/* Hover tint */}
        <div className="absolute inset-0 bg-indigo-600/0 transition-colors duration-300 group-hover:bg-indigo-600/[0.05]" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 gap-2.5 p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400">
          {project.client}
        </p>
        <h3 className="line-clamp-1 text-sm font-bold text-foreground transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground flex-1">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-1 pt-0.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-1 border-t border-border">
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            View project <ArrowRight className="h-3 w-3" />
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

const GAP = 20;

interface FeaturedProjectsProps {
  projects?: Project[];
}

export function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
  const items: CardItem[] =
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
      : (PLACEHOLDER_PROJECTS as unknown as CardItem[]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(960);
  const [visible, setVisible] = useState(3);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const isDragging = useRef(false);
  const x = useMotionValue(0);

  const cardWidth = Math.floor((containerW - (visible - 1) * GAP) / visible);
  const STEP = cardWidth + GAP;
  const maxIdx = Math.max(0, items.length - visible);

  // Measure container for responsive card count
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      setContainerW(w);
      setVisible(w < 560 ? 1 : w < 900 ? 2 : 3);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, maxIdx));
      setCurrent(clamped);
      animate(x, -(clamped * STEP), {
        type: "spring",
        damping: 32,
        stiffness: 260,
        restDelta: 0.5,
      });
    },
    [maxIdx, STEP, x],
  );

  // Re-snap when visible count changes (resize)
  useEffect(() => {
    goTo(Math.min(current, maxIdx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxIdx, STEP]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      const next = current >= maxIdx ? 0 : current + 1;
      goTo(next);
    }, 4000);
    return () => clearInterval(t);
  }, [current, paused, maxIdx, goTo]);

  const handleDragStart = () => {
    isDragging.current = true;
    setPaused(true);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    isDragging.current = false;
    const threshold = STEP * 0.22;
    if (info.offset.x < -threshold) goTo(current + 1);
    else if (info.offset.x > threshold) goTo(current - 1);
    else goTo(current);
    // Resume auto-advance after a short pause
    setTimeout(() => setPaused(false), 2000);
  };

  // Progress dots (one per possible position)
  const dotCount = maxIdx + 1;

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-4 py-1.5 mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
              Our Work
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Projects we&apos;re proud of
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            A selection of our most impactful work. Every project ships with clean code, thoughtful UX, and production-grade reliability.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => !isDragging.current && setPaused(true)}
          onMouseLeave={() => !isDragging.current && setPaused(false)}
        >
          {/* Edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-background to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-background to-transparent"
          />

          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            style={{ x, gap: GAP }}
            drag="x"
            dragConstraints={{ left: -(maxIdx * STEP), right: 0 }}
            dragElastic={0.06}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: "grabbing" }}
          >
            {items.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                cardWidth={cardWidth}
              />
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mt-7 flex items-center justify-between gap-4">
          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setPaused(true); goTo(current - 1); setTimeout(() => setPaused(false), 2000); }}
              disabled={current === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => { setPaused(true); goTo(current + 1); setTimeout(() => setPaused(false), 2000); }}
              disabled={current >= maxIdx}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Carousel navigation">
            {Array.from({ length: dotCount }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => { setPaused(true); goTo(i); setTimeout(() => setPaused(false), 2000); }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === current
                    ? "w-6 bg-indigo-500"
                    : "w-1.5 bg-border hover:bg-indigo-300 dark:hover:bg-indigo-700",
                )}
              />
            ))}
          </div>

          {/* View all */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
