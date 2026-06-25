import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";

import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/site/cta-section";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Blog | SobalTech",
  description:
    "Insights, tutorials, and engineering deep-dives from the SobalTech team.",
  openGraph: {
    title: "Blog | SobalTech",
    description: "Engineering insights and tutorials from SobalTech.",
  },
};

// ─── Placeholder data ─────────────────────────────────────────────────────────

const PLACEHOLDER_POSTS: Partial<BlogPost>[] = [
  {
    id: "1",
    title: "How We Achieved Sub-100ms Response Times with Edge Caching",
    slug: "sub-100ms-response-times-edge-caching",
    excerpt:
      "A deep dive into the architecture decisions and caching strategies that helped us hit 99th-percentile response times under 100ms for a high-traffic SaaS product.",
    coverImage: null,
    tags: ["Performance", "Next.js", "CDN"],
    author: "SobalTech Team",
    readTime: 8,
    isFeatured: true,
    status: "PUBLISHED",
    publishedAt: new Date("2024-11-15"),
  },
  {
    id: "2",
    title: "Building a Multi-Tenant SaaS with Prisma and Row-Level Security",
    slug: "multitenant-saas-prisma-rls",
    excerpt:
      "Row-level security in PostgreSQL combined with Prisma middleware makes multi-tenancy both safe and ergonomic. Here's the pattern we use.",
    coverImage: null,
    tags: ["Prisma", "PostgreSQL", "SaaS"],
    author: "SobalTech Team",
    readTime: 12,
    isFeatured: false,
    status: "PUBLISHED",
    publishedAt: new Date("2024-10-28"),
  },
  {
    id: "3",
    title: "React Native Performance: From 40fps to 60fps in 3 Steps",
    slug: "react-native-performance-tips",
    excerpt:
      "Common pitfalls that tank React Native performance and the exact refactors we applied to a client app to hit consistent 60fps.",
    coverImage: null,
    tags: ["React Native", "Performance", "Mobile"],
    author: "SobalTech Team",
    readTime: 6,
    isFeatured: false,
    status: "PUBLISHED",
    publishedAt: new Date("2024-10-12"),
  },
  {
    id: "4",
    title: "Our Terraform Module Monorepo Setup for AWS",
    slug: "terraform-module-monorepo-aws",
    excerpt:
      "How we structure and version Terraform modules across multiple client environments while keeping drift minimal and deployments auditable.",
    coverImage: null,
    tags: ["Terraform", "AWS", "DevOps"],
    author: "SobalTech Team",
    readTime: 10,
    isFeatured: false,
    status: "PUBLISHED",
    publishedAt: new Date("2024-09-30"),
  },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

async function getBlogPosts(): Promise<Partial<BlogPost>[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    });
    return posts.length > 0 ? posts : PLACEHOLDER_POSTS;
  } catch {
    return PLACEHOLDER_POSTS;
  }
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function BlogCard({ post }: { post: Partial<BlogPost> }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
    >
      {/* Cover */}
      {post.coverImage ? (
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-brand-900/40 to-violet-900/40" />
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full px-2 py-0 text-[11px]"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <h2 className="text-base font-bold leading-snug tracking-tight group-hover:text-brand-500 transition-colors">
          {post.title}
        </h2>

        <p className="flex-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-3">
          {post.author && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </span>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1 ml-auto">
              <Clock className="h-3 w-3" />
              {post.readTime} min
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ─── Featured hero ────────────────────────────────────────────────────────────

function FeaturedPost({ post }: { post: Partial<BlogPost> }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-glow-lg"
    >
      {/* Left: image */}
      <div className="relative hidden aspect-video w-2/5 shrink-0 overflow-hidden sm:block">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title ?? ""}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-brand-900/60 via-brand-800/40 to-violet-900/60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card" />
      </div>

      {/* Right: content */}
      <div className="flex flex-col justify-center gap-4 p-8">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-500">
            Featured
          </span>
          {post.tags?.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h2 className="text-xl font-bold tracking-tight sm:text-2xl group-hover:text-brand-500 transition-colors">
          {post.title}
        </h2>

        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {post.author && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </span>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
          )}
        </div>

        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-500">
          Read article{" "}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const featured = posts.find((p) => p.isFeatured);
  const rest = posts.filter((p) => !p.isFeatured);

  return (
    <>
      <PageHeader
        title="Blog"
        description="Insights, tutorials, and engineering deep-dives from the SobalTech team."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <Container className="py-16 sm:py-20">
        {/* Featured post hero */}
        {featured && (
          <div className="mb-12">
            <FeaturedPost post={featured} />
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed text-center">
            <p className="text-muted-foreground">No posts published yet.</p>
            <p className="text-sm text-muted-foreground">Check back soon!</p>
          </div>
        )}
      </Container>

      <CTASection />
    </>
  );
}
