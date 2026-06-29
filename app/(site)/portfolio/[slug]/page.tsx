import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink,
  Github,
  ArrowRight,
  ArrowLeft,
  Calendar,
  User,
  Tag,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { buildMeta, breadcrumbJsonLd } from "@/lib/seo";
import { CTASection } from "@/components/site/cta-section";
import { FALLBACK_PROJECTS, getFallbackProject } from "@/lib/portfolio-fallbacks";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

// ─── Cover palettes ───────────────────────────────────────────────────────────

const COVERS = [
  { grad: "from-indigo-900 via-indigo-800 to-violet-900", glow: "rgba(99,102,241,0.3)", accent: "#818cf8" },
  { grad: "from-slate-900 via-indigo-950 to-blue-900", glow: "rgba(79,70,229,0.25)", accent: "#60a5fa" },
  { grad: "from-violet-950 via-indigo-900 to-slate-900", glow: "rgba(139,92,246,0.28)", accent: "#a78bfa" },
  { grad: "from-blue-950 via-slate-900 to-indigo-900", glow: "rgba(59,130,246,0.25)", accent: "#67e8f9" },
  { grad: "from-emerald-950 via-slate-900 to-teal-900", glow: "rgba(16,185,129,0.25)", accent: "#34d399" },
  { grad: "from-rose-950 via-slate-900 to-indigo-900", glow: "rgba(244,63,94,0.22)", accent: "#fb7185" },
  { grad: "from-amber-950 via-slate-900 to-orange-900", glow: "rgba(245,158,11,0.22)", accent: "#fbbf24" },
];

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    const slugs = new Set([
      ...projects.map((p) => p.slug),
      ...FALLBACK_PROJECTS.map((p) => p.slug),
    ]);
    return Array.from(slugs).map((slug) => ({ slug }));
  } catch {
    return FALLBACK_PROJECTS.map((p) => ({ slug: p.slug }));
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project =
      (await prisma.project.findFirst({
        where: { slug, isPublished: true },
        select: {
          title: true,
          summary: true,
          seoTitle: true,
          seoDesc: true,
          coverImage: true,
        },
      })) ?? getFallbackProject(slug);
    if (!project) return { title: "Project Not Found" };
    const title = project.seoTitle || `${project.title} | SobalTech Portfolio`;
    const description = project.seoDesc || project.summary;
    return buildMeta({
      title,
      description,
      path: `/portfolio/${slug}`,
      image: project.coverImage,
    });
  } catch {
    return { title: "Project" };
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

async function getProjectData(slug: string) {
  const [project, related] = await Promise.all([
    prisma.project.findFirst({ where: { slug, isPublished: true } }),
    prisma.project.findMany({
      where: { isPublished: true, NOT: { slug } },
      orderBy: [{ isFeatured: "desc" }, { order: "asc" }],
      take: 3,
    }),
  ]);
  const fallbackProject = project ?? getFallbackProject(slug);
  const fallbackRelated = FALLBACK_PROJECTS.filter((p) => p.slug !== slug).slice(0, 3);
  return {
    project: fallbackProject,
    related: related.length > 0 ? related : fallbackRelated,
  };
}

// ─── Cover index lookup ───────────────────────────────────────────────────────

function getCoverIndex(slug: string) {
  const idx = FALLBACK_PROJECTS.findIndex((p) => p.slug === slug);
  return idx >= 0 ? idx : 0;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project: Project | null = null;
  let related: Project[] = [];

  try {
    const data = await getProjectData(slug);
    project = data.project;
    related = data.related;
  } catch {
    notFound();
  }

  if (!project) notFound();

  const coverIdx = getCoverIndex(slug);
  const cover = COVERS[coverIdx % COVERS.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Portfolio", href: "/portfolio" },
              { name: project.title, href: `/portfolio/${slug}` },
            ])
          ),
        }}
      />

      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Gradient cover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            project.coverImage ? "" : cover.grad,
          )}
        >
          {!project.coverImage && (
            <>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 60% 60% at 60% 40%, ${cover.glow} 0%, transparent 70%)`,
                }}
              />
              {/* Decorative UI mockup */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-15 flex flex-col p-12 gap-3 justify-center">
                <div className="flex gap-2 mb-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/40" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                </div>
                <div className="h-2 w-3/4 rounded-full bg-white/40" />
                <div className="h-2 w-1/2 rounded-full bg-white/25" />
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-14 rounded-lg bg-white/10" />
                  ))}
                </div>
                <div className="h-2 w-2/3 rounded-full bg-white/20 mt-2" />
                <div className="h-2 w-1/2 rounded-full bg-white/15" />
              </div>
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
            </>
          )}
          {project.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          )}
          {/* Dark scrim for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/portfolio" className="hover:text-white/80 transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-white/70">{project.title}</span>
          </nav>

          <div className="max-w-2xl">
            {/* Client badge */}
            {project.client && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/80">
                  {project.client}
                </span>
              </div>
            )}

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-white/70 leading-relaxed max-w-xl">
              {project.summary}
            </p>

            {/* Action buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-md hover:bg-white/90 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 backdrop-blur-sm px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                All projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Meta strip ──────────────────────────────────────────────── */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {project.client && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4 text-indigo-500" />
                <span className="font-medium text-foreground">{project.client}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag className="h-4 w-4 text-indigo-500" />
              <span className={cn(
                "font-medium",
                project.status === "COMPLETED" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
              )}>
                {project.status === "COMPLETED" ? "Delivered" : "In Progress"}
              </span>
            </div>
            {project.completedAt && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-indigo-500" />
                <span>{formatDate(project.completedAt)}</span>
              </div>
            )}
            {project.tags.length > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Layers className="h-4 w-4 text-indigo-500" />
                <span>{project.tags.length} technologies</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Main content ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

          {/* Description */}
          <main className="lg:col-span-2">
            {/* Styled HTML content */}
            <div
              className={cn(
                "text-sm leading-relaxed text-muted-foreground",
                "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:first:mt-0",
                "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-7 [&_h3]:mb-3",
                "[&_p]:mb-4 [&_p]:leading-7",
                "[&_ul]:space-y-2 [&_ul]:mb-4 [&_ul]:pl-0 [&_ul]:list-none",
                "[&_li]:flex [&_li]:items-start [&_li]:gap-2.5 [&_li]:leading-6",
                "[&_li]:before:content-[''] [&_li]:before:mt-1.5 [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-indigo-500 [&_li]:before:shrink-0",
                "[&_strong]:font-semibold [&_strong]:text-foreground",
                "[&_a]:text-indigo-500 [&_a]:hover:underline",
              )}
              dangerouslySetInnerHTML={{ __html: project.description }}
            />

            {/* Gallery */}
            {project.images.length > 0 && (
              <section className="mt-14">
                <h2 className="text-lg font-bold text-foreground mb-6">Gallery</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.images.map((url, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border border-border shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="w-full object-cover aspect-video"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 flex flex-col gap-5">

              {/* Project details card */}
              <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
                <div className={cn("h-1.5 w-full bg-gradient-to-r", cover.grad)} />
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
                    Project Details
                  </p>
                  <dl className="space-y-4">
                    {project.client && (
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40">
                          <User className="h-3.5 w-3.5 text-indigo-500" />
                        </div>
                        <div>
                          <dt className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Client</dt>
                          <dd className="text-sm font-semibold text-foreground">{project.client}</dd>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                      </div>
                      <div>
                        <dt className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Status</dt>
                        <dd className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          {project.status === "COMPLETED" ? "Delivered" : "In Progress"}
                        </dd>
                      </div>
                    </div>
                    {project.completedAt && (
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/40">
                          <Calendar className="h-3.5 w-3.5 text-violet-500" />
                        </div>
                        <div>
                          <dt className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">Completed</dt>
                          <dd className="text-sm font-semibold text-foreground">{formatDate(project.completedAt)}</dd>
                        </div>
                      </div>
                    )}
                  </dl>

                  {/* Tech stack */}
                  {project.tags.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                          Tech Stack
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* External links */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="mt-5 pt-5 border-t border-border flex flex-col gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Visit live site
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          <Github className="h-3.5 w-3.5" />
                          View on GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* CTA card */}
              <div className="rounded-lg border border-indigo-200 dark:border-indigo-800/40 bg-gradient-to-br from-indigo-50/80 to-violet-50/40 dark:from-indigo-950/30 dark:to-violet-950/20 p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm mb-4">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
                <p className="font-semibold text-foreground mb-1">Want something similar?</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Let us scope your project and send you a detailed proposal within 2 business days.
                </p>
                <Link
                  href="/request-quote"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
                >
                  Request a quote
                </Link>
              </div>

              {/* Related quick links */}
              <div className="rounded-lg border border-border bg-card p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
                  Also explore
                </p>
                <nav className="space-y-1">
                  {[
                    { label: "All projects", href: "/portfolio" },
                    { label: "Case studies", href: "/case-studies" },
                    { label: "Client testimonials", href: "/testimonials" },
                  ].map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      {label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>

        {/* ─── Related projects ──────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                More projects
              </h2>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((p) => {
                const relCover = COVERS[getCoverIndex(p.slug) % COVERS.length];
                return (
                  <Link
                    key={p.id}
                    href={`/portfolio/${p.slug}`}
                    className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.1)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                  >
                    <div className="relative h-32 overflow-hidden">
                      {p.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className={cn("relative h-full w-full bg-gradient-to-br", relCover.grad)}>
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{ background: `radial-gradient(ellipse 60% 60% at 50% 40%, ${relCover.glow} 0%, transparent 70%)` }}
                          />
                          <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-3 gap-1.5 opacity-25">
                            <div className="h-1.5 rounded-full bg-white/30 w-3/4" />
                            <div className="h-1.5 rounded-full bg-white/20 w-1/2" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      {p.client && (
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-indigo-500 dark:text-indigo-400">
                          {p.client}
                        </p>
                      )}
                      <h3 className="text-sm font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-5">
                        {p.summary}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-500">
                        View project <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>

      <CTASection />
    </>
  );
}
