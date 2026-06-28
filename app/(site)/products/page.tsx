import type { Metadata } from "next";
import Link from "next/link";
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
import { buildMeta } from "@/lib/seo";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { CTASection } from "@/components/site/cta-section";
import { FALLBACK_PRODUCTS } from "@/lib/products-fallbacks";
import type { Product } from "@/types";

export const metadata: Metadata = buildMeta({
  title: "Products | SobalTech",
  description:
    "Productized platforms and accelerators from SobalTech: SaaS launch kits, commerce systems, analytics dashboards, admin portals, mobile starters, and AI frameworks.",
  path: "/products",
});

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Package,
  Layers,
  Bot,
};

async function getProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (dbProducts.length > 0) return dbProducts;
    return FALLBACK_PRODUCTS;
  } catch {
    return FALLBACK_PRODUCTS;
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <PageHeader
        title="Products"
        description="Reusable platforms and accelerators we customize for your business, so you start from proven foundations instead of a blank page."
        breadcrumbs={[{ label: "Products" }]}
      />

      <Container className="py-16 sm:py-20">
        {products.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <h2 className="text-lg font-semibold">No products published yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Add products from the admin dashboard to populate this page.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const Icon = product.icon ? (ICON_MAP[product.icon] ?? Package) : Package;
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group flex min-h-[340px] flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10">
                      <Icon className="h-5 w-5 text-brand-500" />
                    </div>
                    {product.price && (
                      <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                        {product.price}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex flex-1 flex-col">
                    <h2 className="text-lg font-semibold tracking-tight group-hover:text-brand-500">
                      {product.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>

                    {product.features.length > 0 && (
                      <ul className="mt-5 space-y-2">
                        {product.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 transition-all group-hover:gap-2.5">
                    View product
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </Container>

      <CTASection />
    </>
  );
}
