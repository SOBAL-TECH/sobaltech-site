import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMeta, breadcrumbJsonLd } from "@/lib/seo";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  LayoutDashboard,
  Layers,
  Package,
  ShoppingCart,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/site/cta-section";
import { FALLBACK_PRODUCTS, getFallbackProduct } from "@/lib/products-fallbacks";
import type { Product } from "@/types";

export const dynamic = "force-dynamic";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Package,
  Layers,
  Bot,
};

const HERO_GRADIENTS: Record<string, string> = {
  LayoutDashboard: "from-indigo-600 via-violet-600 to-fuchsia-600",
  ShoppingCart:   "from-emerald-600 via-teal-600 to-cyan-500",
  BarChart3:      "from-sky-600 via-blue-600 to-indigo-600",
  Package:        "from-violet-600 via-purple-600 to-indigo-600",
  Layers:         "from-rose-600 via-pink-600 to-fuchsia-600",
  Bot:            "from-amber-500 via-orange-600 to-rose-600",
};

const GLOW_COLORS: Record<string, string> = {
  LayoutDashboard: "bg-indigo-500/30",
  ShoppingCart:   "bg-emerald-500/25",
  BarChart3:      "bg-sky-500/30",
  Package:        "bg-violet-500/30",
  Layers:         "bg-rose-500/25",
  Bot:            "bg-amber-500/25",
};

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    const slugs = new Set([
      ...products.map((p) => p.slug),
      ...FALLBACK_PRODUCTS.map((p) => p.slug),
    ]);
    return Array.from(slugs).map((slug) => ({ slug }));
  } catch {
    return FALLBACK_PRODUCTS.map((p) => ({ slug: p.slug }));
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product =
      (await prisma.product.findUnique({
        where: { slug, isPublished: true },
        select: { title: true, description: true, seoTitle: true, seoDesc: true },
      })) ?? getFallbackProduct(slug);
    if (!product) return { title: "Product Not Found" };
    const title = product.seoTitle || `${product.title} | SobalTech`;
    const description = product.seoDesc || product.description;
    return buildMeta({ title, description, path: `/products/${slug}` });
  } catch {
    return { title: "Product" };
  }
}

async function getProductData(slug: string) {
  const fallbackRelated = FALLBACK_PRODUCTS.filter((p) => p.slug !== slug).slice(0, 3);
  try {
    const [product, related] = await Promise.all([
      prisma.product.findUnique({ where: { slug, isPublished: true } }),
      prisma.product.findMany({
        where: { isPublished: true, NOT: { slug } },
        orderBy: { order: "asc" },
        take: 3,
      }),
    ]);
    return {
      product: product ?? getFallbackProduct(slug),
      related: related.length > 0 ? related : fallbackRelated,
    };
  } catch {
    return {
      product: getFallbackProduct(slug),
      related: fallbackRelated,
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product: Product | null = null;
  let related: Product[] = [];

  try {
    const data = await getProductData(slug);
    product = data.product;
    related = data.related;
  } catch {}

  if (!product) notFound();

  const Icon = product.icon ? (ICON_MAP[product.icon] ?? Package) : Package;
  const heroGradient = product.icon
    ? (HERO_GRADIENTS[product.icon] ?? "from-indigo-600 via-violet-600 to-fuchsia-600")
    : "from-indigo-600 via-violet-600 to-fuchsia-600";
  const glowColor = product.icon
    ? (GLOW_COLORS[product.icon] ?? "bg-indigo-500/30")
    : "bg-indigo-500/30";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: product.title, href: `/products/${slug}` },
            ])
          ),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-border bg-slate-950 pt-28 text-white dark:bg-black">
        <div className="absolute inset-0 -z-10">
          <div className={`absolute -left-20 top-10 h-80 w-80 rounded-full ${glowColor} blur-3xl`} />
          <div className={`absolute right-[-8%] top-0 h-96 w-96 rounded-full ${glowColor} blur-3xl opacity-60`} />
          <div className="absolute bottom-0 left-1/2 h-64 w-[700px] -translate-x-1/2 blur-3xl opacity-50 bg-gradient-to-r from-indigo-500/10 via-violet-500/20 to-cyan-500/10" />
          <div className="site-vertical-lines site-vertical-lines-dark opacity-30" />
        </div>

        <Container className="pb-16 pt-10 sm:pb-20">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
            <Link href="/products" className="transition-colors hover:text-white">
              Products
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              {/* Icon */}
              <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br ${heroGradient} shadow-2xl`}>
                <Icon className="h-8 w-8 text-white" />
              </div>

              <Badge className="mb-4 rounded-full border-white/15 bg-white/10 text-white hover:bg-white/10">
                Product
              </Badge>

              <h1 className="text-4xl font-bold tracking-[-0.04em] text-balance sm:text-6xl">
                {product.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {product.description}
              </p>

              {/* Price + CTAs */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href={product.ctaHref}>
                  <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
                    {product.ctaLabel}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    Talk to Sales
                  </Button>
                </Link>
                {product.price && (
                  <span className="text-sm font-semibold text-slate-300">
                    {product.price}
                  </span>
                )}
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex flex-row gap-3 lg:flex-col">
              {[
                { Icon: Zap, label: "Fast delivery" },
                { Icon: Shield, label: "Production ready" },
                { Icon: Clock, label: "Ongoing support" },
              ].map(({ Icon: BadgeIcon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center backdrop-blur"
                >
                  <BadgeIcon className="h-5 w-5 text-slate-300" />
                  <span className="text-xs font-medium text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <Container className="py-14 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">

          {/* Main content */}
          <main className="min-w-0 space-y-8">
            {/* Product image */}
            {product.image && (
              <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div
              className="rounded-xl border border-border bg-card p-6 sm:p-8
                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 first:[&_h2]:mt-0
                [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2
                [&_p]:text-sm [&_p]:leading-7 [&_p]:text-muted-foreground [&_p]:mb-3
                [&_ul]:my-4 [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul]:list-none
                [&_li]:flex [&_li]:items-start [&_li]:gap-2.5 [&_li]:text-sm [&_li]:leading-6 [&_li]:text-muted-foreground
                [&_li]:before:mt-2 [&_li]:before:block [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:shrink-0 [&_li]:before:rounded-full [&_li]:before:bg-indigo-500"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />

            {/* What you get strip */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                ["Customize", "We tailor colors, branding, integrations, and workflows to fit your business."],
                ["Deploy", "We handle staging, production, and launch. You get a live URL that works."],
                ["Support", "Post-launch support, fixes, and feature additions available on retainer."],
              ].map(([title, text], i) => (
                <div key={title} className="rounded-xl border border-border bg-card p-5">
                  <span className="text-xs font-bold text-indigo-500">0{i + 1}</span>
                  <h3 className="mt-2 text-sm font-semibold text-foreground">{title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              {/* Gradient header */}
              <div className={`bg-gradient-to-br ${heroGradient} p-5 text-white`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-base font-semibold leading-snug">{product.title}</h2>
                {product.price && (
                  <p className="mt-1 text-sm font-bold text-white/90">{product.price}</p>
                )}
                <p className="mt-1.5 text-xs leading-5 text-white/75">{product.description}</p>
              </div>

              {/* Features */}
              {product.features.length > 0 && (
                <div className="p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    What&apos;s included
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="border-t border-border p-5">
                <p className="text-sm font-semibold text-foreground">Ready to launch?</p>
                <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                  We customize this product to your brand and ship it ready for real users.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link href={product.ctaHref}>
                    <Button className="w-full bg-brand-gradient text-white hover:opacity-90">
                      {product.ctaLabel}
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Talk to Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Related products ───────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-lg font-bold tracking-tight text-foreground">
              Other Products
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => {
                const RelIcon = item.icon ? (ICON_MAP[item.icon] ?? Package) : Package;
                return (
                  <Link
                    key={item.id}
                    href={`/products/${item.slug}`}
                    className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-indigo-300/50 hover:shadow-sm dark:hover:border-indigo-400/25"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10">
                      <RelIcon className="h-4 w-4 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    {item.price && (
                      <span className="text-xs font-medium text-muted-foreground">{item.price}</span>
                    )}
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-500">
                      View product <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </Container>

      <CTASection />
    </>
  );
}
