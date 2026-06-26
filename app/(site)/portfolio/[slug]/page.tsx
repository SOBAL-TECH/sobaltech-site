import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Github, ArrowRight, Tag, Calendar, User } from "lucide-react";
import { prisma } from "@/lib/db";
import { buildMeta, breadcrumbJsonLd } from "@/lib/seo";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { RichTextRenderer } from "@/components/shared/rich-text-renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/site/cta-section";
import { FALLBACK_PROJECTS, getFallbackProject } from "@/lib/portfolio-fallbacks";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

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
    const project = await prisma.project.findFirst({
      where: { slug, isPublished: true },
      select: { title: true, summary: true, seoTitle: true, seoDesc: true, coverImage: true },
    }) ?? getFallbackProject(slug);
    if (!project) return { title: "Project Not Found" };

    const title = project.seoTitle || `${project.title} | SobalTech Portfolio`;
    const description = project.seoDesc || project.summary;
    return buildMeta({ title, description, path: `/portfolio/${slug}`, image: project.coverImage });
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
      <PageHeader
        title={project.title}
        description={project.summary}
        breadcrumbs={[
          { label: "Portfolio", href: "/portfolio" },
          { label: project.title },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-brand-gradient text-white hover:opacity-90">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live
              </Button>
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </a>
          )}
        </div>
      </PageHeader>

      {/* Hero image */}
      {project.coverImage && (
        <div className="border-b border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            className="mx-auto max-h-[500px] w-full max-w-7xl object-cover"
          />
        </div>
      )}

      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* ── Main content ─────────────────────────────────────────── */}
          <div className="lg:col-span-2">
            <RichTextRenderer content={project.description} />

            {/* Gallery */}
            {project.images.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-6 text-xl font-bold tracking-tight">Gallery</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.images.map((url, i) => (
                    <div key={i} className="overflow-hidden rounded-lg border border-border">
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
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <aside className="flex flex-col gap-6">
            {/* Project details */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Project Details
              </h3>
              <dl className="space-y-3">
                {project.client && (
                  <div className="flex items-start gap-2">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs text-muted-foreground">Client</dt>
                      <dd className="text-sm font-medium">{project.client}</dd>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <Tag className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Status</dt>
                    <dd className="text-sm font-medium">
                      {project.status === "COMPLETED" ? "Delivered" : "In Progress"}
                    </dd>
                  </div>
                </div>

                {project.completedAt && (
                  <div className="flex items-start gap-2">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs text-muted-foreground">Completed</dt>
                      <dd className="text-sm font-medium">{formatDate(project.completedAt)}</dd>
                    </div>
                  </div>
                )}
              </dl>

              {/* Tags */}
              {project.tags.length > 0 && (
                <div className="mt-4 border-t border-border pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-full text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Site
                    </Button>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="w-full justify-start gap-2">
                      <Github className="h-3.5 w-3.5" />
                      View on GitHub
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-6">
              <h3 className="text-sm font-semibold">Want something similar?</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Let&apos;s build your next project together.
              </p>
              <Link href="/request-quote" className="mt-4 block">
                <Button className="w-full bg-brand-gradient text-white hover:opacity-90">
                  Start a Project
                </Button>
              </Link>
            </div>
          </aside>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-xl font-bold tracking-tight sm:text-2xl">
              More Projects
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/portfolio/${p.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {p.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-900/60 to-violet-900/60">
                        <span className="text-2xl font-bold text-white/10">{p.title[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    {p.client && (
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-brand-500">
                        {p.client}
                      </p>
                    )}
                    <h3 className="text-sm font-semibold group-hover:text-brand-500 transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {p.summary}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs text-brand-500">
                      View case study <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>

      <CTASection />
    </>
  );
}
