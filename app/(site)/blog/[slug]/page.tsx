import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { RichTextRenderer } from "@/components/shared/rich-text-renderer";

import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/site/cta-section";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
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
    const post = await prisma.blogPost.findUnique({
      where: { slug, status: "PUBLISHED" },
      select: {
        title: true,
        excerpt: true,
        seoTitle: true,
        seoDesc: true,
        coverImage: true,
        author: true,
        publishedAt: true,
      },
    });
    if (!post) return { title: "Post Not Found" };

    return {
      title: post.seoTitle || `${post.title} | SobalTech Blog`,
      description: post.seoDesc || post.excerpt,
      openGraph: {
        title: post.seoTitle || post.title,
        description: post.seoDesc || post.excerpt,
        type: "article",
        publishedTime: post.publishedAt?.toISOString(),
        authors: [post.author],
        images: post.coverImage ? [{ url: post.coverImage }] : [],
      },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

async function getPostData(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: "PUBLISHED" },
  });

  if (!post) return { post: null, related: [] };

  // Increment views fire-and-forget
  prisma.blogPost
    .update({ where: { id: post.id }, data: { views: { increment: 1 } } })
    .catch(() => {});

  const related = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      NOT: { id: post.id },
      tags: { hasSome: post.tags },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return { post, related };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: BlogPost | null = null;
  let related: BlogPost[] = [];

  try {
    const data = await getPostData(slug);
    post = data.post;
    related = data.related;
  } catch {
    notFound();
  }

  if (!post) notFound();

  const authorInitials = post.author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {/* Cover image */}
      {post.coverImage && (
        <div className="w-full border-b border-border bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="mx-auto max-h-[480px] w-full max-w-7xl object-cover"
          />
        </div>
      )}

      <Container size="md" className="py-12 sm:py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author + meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={post.authorImage ?? undefined}
                  alt={post.author}
                />
                <AvatarFallback className="bg-brand-500/10 text-brand-600 text-xs font-semibold">
                  {authorInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{post.author}</p>
                {post.publishedAt && (
                  <p className="text-xs text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </p>
                )}
              </div>
            </div>

            <Separator orientation="vertical" className="h-8 hidden sm:block" />

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} min read
              </span>
              {post.views > 0 && (
                <span>{post.views.toLocaleString()} views</span>
              )}
            </div>
          </div>
        </header>

        <Separator className="my-8" />

        {/* Content */}
        <RichTextRenderer content={post.content} className="text-base" />

        {/* Tags footer */}
        {post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Tagged:
            </span>
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Container>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="border-t border-border">
          <Container className="py-16">
            <h2 className="mb-8 text-xl font-bold tracking-tight sm:text-2xl">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  {rel.coverImage ? (
                    <div className="aspect-video overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-brand-900/40 to-violet-900/40" />
                  )}
                  <div className="p-4">
                    {rel.tags.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-1">
                        {rel.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="rounded-full text-[11px] px-2 py-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <h3 className="text-sm font-semibold leading-snug group-hover:text-brand-500 transition-colors">
                      {rel.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {rel.excerpt}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      {rel.publishedAt && (
                        <span>{formatDate(rel.publishedAt)}</span>
                      )}
                      <span className="ml-auto flex items-center gap-1 text-brand-500">
                        Read{" "}
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}

      <CTASection />
    </>
  );
}
