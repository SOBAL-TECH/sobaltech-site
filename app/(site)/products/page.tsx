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
import { Container } from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const CARD_GRADIENTS = [
  { bar: "from-indigo-500 via-violet-500 to-fuchsia-500", iconBg: "bg-indigo-500/10 border-indigo-500/20", iconColor: "text-indigo-500" },
  { bar: "from-emerald-500 via-teal-500 to-cyan-400",     iconBg: "bg-emerald-500/10 border-emerald-500/20", iconColor: "text-emerald-500" },
  { bar: "from-sky-500 via-blue-500 to-indigo-500",       iconBg: "bg-sky-500/10 border-sky-500/20",         iconColor: "text-sky-500" },
  { bar: "from-violet-500 via-purple-500 to-indigo-500",  iconBg: "bg-violet-500/10 border-violet-500/20",   iconColor: "text-violet-500" },
  { bar: "from-rose-500 via-pink-500 to-fuchsia-500",     iconBg: "bg-rose-500/10 border-rose-500/20",       iconColor: "text-rose-500" },
  { bar: "from-amber-400 via-orange-500 to-rose-500",     iconBg: "bg-amber-500/10 border-amber-500/20",     iconColor: "text-amber-500" },
];

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
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-border bg-slate-950 pt-28 text-white dark:bg-black">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-64 w-[720px] -translate-x-1/2 bg-gradient-to-r from-cyan-500/10 via-indigo-500/20 to-fuchsia-500/10 blur-3xl" />
          <div className="site-vertical-lines site-vertical-lines-dark opacity-35" />
        </div>

        <Container className="pb-16 pt-10 sm:pb-20">
          <Badge className="mb-5 rounded-full border-white/15 bg-white/10 text-white hover:bg-white/10">
            Products
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.04em] text-balance sm:text-6xl">
            Proven platforms,{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              customized for you.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Start from a solid, tested foundation instead of a blank page. We configure and tailor each platform to your business, brand, and workflows.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/request-quote">
              <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
                Request a Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                Talk to Us
              </Button>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-12 flex flex-wrap gap-6">
            {[
              { value: `${products.length}`, label: "ready-to-deploy products" },
              { value: "100%", label: "customizable to your brand" },
              { value: "2x", label: "faster than building from scratch" },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{value}</span>
                <span className="text-sm text-slate-400">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Product grid ─────────────────────────────────────────────────── */}
      <Container className="py-14 sm:py-20">
        {products.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <p className="text-sm text-muted-foreground">No products published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, i) => {
              const Icon = product.icon ? (ICON_MAP[product.icon] ?? Package) : Package;
              const g = CARD_GRADIENTS[i % CARD_GRADIENTS.length];
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/50 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:hover:border-indigo-400/25 dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                >
                  {/* Gradient top bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${g.bar}`} />

                  <div className="flex flex-1 flex-col p-6">
                    {/* Icon + price */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${g.iconBg} ${g.iconColor}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      {product.price && (
                        <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold text-foreground">
                          {product.price}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="mt-5 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {product.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                      {product.description}
                    </p>

                    {/* Features */}
                    {product.features.length > 0 && (
                      <ul className="mt-5 space-y-2 border-t border-border pt-5">
                        {product.features.slice(0, 4).map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* CTA row */}
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 transition-all group-hover:gap-2.5">
                      Explore product
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
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
