import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Globe,
  Palette,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/site/cta-section";
import { ServiceVisual } from "@/components/site/service-visual";
import type { Service } from "@/types";

export const metadata: Metadata = {
  title: "Our Services | SobalTech",
  description:
    "End-to-end digital solutions: web development, mobile apps, cloud infrastructure, UI/UX design, API development, and AI integration.",
  openGraph: {
    title: "Our Services | SobalTech",
    description:
      "End-to-end digital solutions crafted with precision — from pixel-perfect UI to robust cloud infrastructure.",
  },
};

const PLACEHOLDER_SERVICES: Partial<Service>[] = [
  {
    id: "1",
    title: "Web Development",
    slug: "web-development",
    description:
      "High-performance websites, SaaS platforms, dashboards, and full-stack applications built with modern engineering standards.",
    icon: "Globe",
    features: ["Next.js & React", "TypeScript", "CMS workflows", "Performance optimization"],
  },
  {
    id: "2",
    title: "Mobile Apps",
    slug: "mobile-apps",
    description:
      "Cross-platform mobile applications for iOS and Android with polished UX, reliable APIs, and release-ready workflows.",
    icon: "Smartphone",
    features: ["React Native & Expo", "iOS & Android", "Offline support", "Store release support"],
  },
  {
    id: "3",
    title: "Cloud & DevOps",
    slug: "cloud-devops",
    description:
      "Cloud infrastructure, deployment pipelines, monitoring, and operational foundations for scalable digital products.",
    icon: "Cloud",
    features: ["CI/CD pipelines", "Infrastructure as code", "Monitoring", "Production readiness"],
  },
  {
    id: "4",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Clear product design, responsive interfaces, prototypes, and design systems that make software easier to use.",
    icon: "Palette",
    features: ["UX strategy", "Prototypes", "Design systems", "Accessibility-aware UI"],
  },
  {
    id: "5",
    title: "API Development",
    slug: "api-development",
    description:
      "Secure APIs, integrations, webhooks, and backend systems that connect your products and business operations.",
    icon: "Code2",
    features: ["REST & GraphQL", "Webhooks", "Auth & permissions", "Integrations"],
  },
  {
    id: "6",
    title: "AI Integration",
    slug: "ai-integration",
    description:
      "Practical AI features for search, automation, assistants, document workflows, and internal knowledge systems.",
    icon: "Cpu",
    features: ["LLM integrations", "RAG pipelines", "Document automation", "Workflow assistants"],
  },
];

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
  Cloud,
  Palette,
  Code2,
  Cpu,
};

const GRADIENTS = [
  "from-indigo-500 via-violet-500 to-fuchsia-500",
  "from-sky-500 via-cyan-500 to-emerald-400",
  "from-violet-500 via-indigo-500 to-blue-500",
  "from-rose-500 via-orange-400 to-amber-300",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-amber-400 via-pink-500 to-purple-500",
];

async function getServices(): Promise<Partial<Service>[]> {
  try {
    const services = await prisma.service.findMany({
      where: { isPublished: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return services.length > 0 ? services : PLACEHOLDER_SERVICES;
  } catch {
    return PLACEHOLDER_SERVICES;
  }
}

function ServiceCard({
  service,
  index,
}: {
  service: Partial<Service>;
  index: number;
}) {
  const IconComponent = service.icon
    ? (ICON_MAP[service.icon] ?? Globe)
    : Globe;
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-slate-950"
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${gradient}`} />
      <div className="relative flex min-h-[360px] flex-col rounded-[1.5rem] bg-gradient-to-b from-slate-50 to-white p-6 dark:from-white/[0.06] dark:to-transparent">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg shadow-indigo-500/15`}>
            <IconComponent className="h-5 w-5 text-white" />
          </div>
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            0{index + 1}
          </span>
        </div>

        <ServiceVisual
          slug={service.slug}
          size="card"
          className="mt-6 h-40 border-slate-200/80 bg-slate-950 p-3 dark:border-white/10"
        />

        <div className="mt-8 flex flex-1 flex-col">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
            {service.title}
          </h2>
          <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {service.description}
          </p>

          {service.features && service.features.length > 0 && (
            <ul className="mt-6 grid gap-2">
              {service.features.slice(0, 4).map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-white/10">
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-300">
            Explore service
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white transition-transform group-hover:translate-x-1 dark:bg-white dark:text-slate-950">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border bg-slate-950 pt-28 text-white dark:bg-black">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-[720px] -translate-x-1/2 bg-gradient-to-r from-cyan-500/10 via-indigo-500/20 to-purple-500/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <Container className="relative pb-20 pt-12 sm:pb-24 lg:pb-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="max-w-4xl">
              <Badge className="mb-5 rounded-full border-white/15 bg-white/10 text-white hover:bg-white/10">
                Services
              </Badge>
              <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">
                Digital product teams for every layer of your stack.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Strategy, design, engineering, infrastructure, and AI integration — delivered as focused service lanes that can operate independently or as one integrated build team.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/request-quote">
                  <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
                    Start a Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>

            <ServiceVisual slug="web-development" className="hidden lg:block" />
          </div>

          <div className="mt-14 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Zap, label: "Fast delivery", text: "Ship useful increments without sacrificing foundations." },
              { icon: ShieldCheck, label: "Production-minded", text: "Security, reliability, and maintainability built in." },
              { icon: Sparkles, label: "Modern execution", text: "Clean UX, AI-ready workflows, and scalable systems." },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
              >
                <item.icon className="h-5 w-5 text-cyan-300" />
                <p className="mt-3 text-sm font-semibold">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-24">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Badge variant="secondary" className="mb-3 rounded-full">
              Capabilities
            </Badge>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Choose the lane you need, or bring us in across the whole product.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Each service is structured around outcomes: what gets built, what gets handed over, and what your team can maintain after launch.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id ?? i} service={service} index={i} />
          ))}
        </div>

        <section className="mt-20 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-1 text-white shadow-[0_30px_90px_rgba(15,23,42,0.2)] dark:border-white/10">
          <div className="relative rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.22),transparent_35%)] p-8 sm:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <Badge className="mb-4 rounded-full border-white/15 bg-white/10 text-white hover:bg-white/10">
                  Not sure where to start?
                </Badge>
                <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                  We can map the best technical path before you commit to a full build.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                  Bring the product idea, existing codebase, or business problem. We will help clarify the scope, risks, timeline, and strongest delivery route.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/request-quote">
                  <Button size="lg" className="w-full bg-white text-slate-950 hover:bg-slate-100">
                    Get a Free Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  >
                    Talk to Our Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <CTASection />
    </>
  );
}
