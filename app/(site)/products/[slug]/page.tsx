import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  LayoutDashboard,
  Layers,
  Package,
  ShoppingCart,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { RichTextRenderer } from "@/components/shared/rich-text-renderer";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/site/cta-section";
import type { Product } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Package,
  Layers,
  Bot,
};

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await prisma.product.findUnique({
      where: { slug, isPublished: true },
      select: { title: true, description: true, seoTitle: true, seoDesc: true },
    });
    if (!product) return { title: "Product Not Found" };

    return {
      title: product.seoTitle || `${product.title} | SobalTech`,
      description: product.seoDesc || product.description,
      openGraph: {
        title: product.seoTitle || `${product.title} | SobalTech`,
        description: product.seoDesc || product.description,
      },
    };
  } catch {
    return { title: "Product" };
  }
}

async function getProductData(slug: string) {
  const [product, related] = await Promise.all([
    prisma.product.findUnique({ where: { slug, isPublished: true } }),
    prisma.product.findMany({
      where: { isPublished: true, NOT: { slug } },
      orderBy: { order: "asc" },
      take: 3,
    }),
  ]);
  return { product, related };
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
  } catch {
    notFound();
  }

  if (!product) notFound();

  const Icon = product.icon ? (ICON_MAP[product.icon] ?? Package) : Package;

  return (
    <>
      <PageHeader
        title={product.title}
        description={product.description}
        breadcrumbs={[
          { label: "Products", href: "/products" },
          { label: product.title },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={product.ctaHref}>
            <Button className="bg-brand-gradient text-white hover:opacity-90">
              {product.ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Talk to Sales</Button>
          </Link>
        </div>
      </PageHeader>

      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {product.image && (
              <div className="mb-10 overflow-hidden rounded-xl border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="aspect-video w-full object-cover"
                />
              </div>
            )}

            <RichTextRenderer content={product.content} />
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-brand-500/20 bg-brand-500/10">
                <Icon className="h-6 w-6 text-brand-500" />
              </div>
              <h2 className="text-base font-semibold">{product.title}</h2>
              {product.price && (
                <p className="mt-1 text-sm font-medium text-brand-500">{product.price}</p>
              )}
              <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
            </div>

            {product.features.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  What&apos;s Included
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-6">
              <h3 className="text-base font-semibold">Ready to use this foundation?</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                We can tailor this product to your workflow, brand, and integration needs.
              </p>
              <Link href={product.ctaHref}>
                <Button className="mt-4 w-full bg-brand-gradient text-white hover:opacity-90">
                  {product.ctaLabel}
                </Button>
              </Link>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-xl font-bold tracking-tight sm:text-2xl">
              Other Products
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <h3 className="font-semibold transition-colors group-hover:text-brand-500">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-500">
                    View product <ArrowRight className="h-3 w-3" />
                  </span>
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
