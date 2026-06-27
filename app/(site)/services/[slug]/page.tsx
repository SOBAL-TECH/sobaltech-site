import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMeta, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import {
  AppWindow,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Cloud,
  Code2,
  Cpu,
  Globe,
  GraduationCap,
  Network,
  Palette,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { Container } from "@/components/shared/container";
import { RichTextRenderer } from "@/components/shared/rich-text-renderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/site/cta-section";
import { ServiceVisual } from "@/components/site/service-visual";
import { ServiceHeroArt } from "@/components/site/service-hero-art";

type ServicePageData = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  icon: string | null;
  image: string | null;
  features: string[];
  seoTitle?: string | null;
  seoDesc?: string | null;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  AppWindow,
  BarChart3,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Cpu,
  Globe,
  GraduationCap,
  Network,
  Palette,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Store,
};

const FALLBACK_SERVICES: ServicePageData[] = [
  {
    id: "fallback-web-development",
    title: "Web Development",
    slug: "web-development",
    description:
      "High-performance websites, SaaS platforms, dashboards, and full-stack applications built with modern engineering standards.",
    content: `<h2>Modern web products that are built to last</h2><p>We design and engineer web platforms that are fast, maintainable, secure, and ready for real users. From marketing sites to complex SaaS products, we focus on clean architecture and measurable business outcomes.</p><h3>What we build</h3><ul><li>Next.js and React applications</li><li>SaaS dashboards and customer portals</li><li>Content-driven marketing sites</li><li>Internal tools and admin systems</li><li>API-backed web platforms</li></ul><h3>How we work</h3><p>Every build includes responsive UI, accessibility checks, SEO fundamentals, performance optimization, and a deployment workflow your team can trust.</p>`,
    icon: "Globe",
    image: null,
    features: [
      "Next.js and React",
      "TypeScript",
      "Full-stack architecture",
      "CMS and admin workflows",
      "SEO and performance optimization",
      "Production deployment",
    ],
    seoTitle: "Web Development Services | SobalTech",
    seoDesc: "Custom web development for SaaS, dashboards, marketing sites, and full-stack platforms.",
  },
  {
    id: "fallback-mobile-apps",
    title: "Mobile Apps",
    slug: "mobile-apps",
    description:
      "Cross-platform mobile applications for iOS and Android with polished UX, reliable APIs, and release-ready workflows.",
    content: `<h2>Mobile apps users can rely on</h2><p>We build mobile applications that feel clean, fast, and practical. Whether you need a customer-facing product, internal field tool, or MVP for validation, we help shape the product experience and ship it properly.</p><h3>Capabilities</h3><ul><li>React Native and Expo development</li><li>Authentication and onboarding</li><li>Offline-first workflows</li><li>Push notifications</li><li>API and payment integrations</li><li>App Store and Play Store release support</li></ul><p>We also help teams plan versioning, analytics, crash reporting, and long-term maintenance.</p>`,
    icon: "Smartphone",
    image: null,
    features: [
      "React Native and Expo",
      "iOS and Android",
      "Auth and onboarding",
      "Offline support",
      "Push notifications",
      "Store release support",
    ],
    seoTitle: "Mobile App Development | SobalTech",
    seoDesc: "Cross-platform mobile app development for iOS and Android using React Native and Expo.",
  },
  {
    id: "fallback-cloud-devops",
    title: "Cloud & DevOps",
    slug: "cloud-devops",
    description:
      "Cloud infrastructure, deployment pipelines, monitoring, and operational foundations for scalable digital products.",
    content: `<h2>Infrastructure that supports growth</h2><p>We help teams move from fragile deployments and unclear environments to reliable cloud infrastructure. The goal is simple: predictable releases, observable systems, and fewer production surprises.</p><h3>What we set up</h3><ul><li>Cloud architecture on AWS, GCP, Azure, or Vercel</li><li>CI/CD pipelines</li><li>Dockerized applications</li><li>Infrastructure as code</li><li>Monitoring, logging, and alerting</li><li>Backup and environment strategy</li></ul><p>We keep the setup practical for your team size and product stage.</p>`,
    icon: "Cloud",
    image: null,
    features: [
      "AWS, GCP, Azure, and Vercel",
      "CI/CD pipelines",
      "Docker and container workflows",
      "Infrastructure as code",
      "Monitoring and alerts",
      "Production readiness reviews",
    ],
    seoTitle: "Cloud & DevOps Services | SobalTech",
    seoDesc: "Cloud infrastructure, CI/CD, monitoring, and DevOps setup for modern applications.",
  },
  {
    id: "fallback-ui-ux-design",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description:
      "Clear product design, responsive interfaces, prototypes, and design systems that make software easier to use.",
    content: `<h2>Design that makes products easier to use</h2><p>We turn unclear product ideas and complex workflows into clean, practical interfaces. Our design work balances visual polish with usability, accessibility, and implementation reality.</p><h3>Design services</h3><ul><li>User flows and information architecture</li><li>Wireframes and high-fidelity UI</li><li>Interactive prototypes</li><li>Design systems and component libraries</li><li>Responsive web and mobile layouts</li><li>UX audits for existing products</li></ul><p>The output is not just pretty screens. It is a clear product direction your team can build from.</p>`,
    icon: "Palette",
    image: null,
    features: [
      "UX strategy",
      "Wireframes and prototypes",
      "Responsive UI design",
      "Design systems",
      "Accessibility-aware layouts",
      "Product UX audits",
    ],
    seoTitle: "UI/UX Design Services | SobalTech",
    seoDesc: "Product design, UX strategy, prototypes, and design systems for web and mobile apps.",
  },
  {
    id: "fallback-api-development",
    title: "API Development",
    slug: "api-development",
    description:
      "Secure APIs, integrations, webhooks, and backend systems that connect your products and business operations.",
    content: `<h2>APIs that make your product dependable</h2><p>We build backend systems and integrations that are structured, documented, and ready for production. The focus is reliability, security, and maintainability.</p><h3>Common work</h3><ul><li>REST and GraphQL APIs</li><li>Third-party integrations</li><li>Webhook systems</li><li>Authentication and permissions</li><li>Background jobs and queues</li><li>API documentation and handoff</li></ul><p>We also help clean up existing backend systems when technical debt is slowing delivery.</p>`,
    icon: "Code2",
    image: null,
    features: [
      "REST and GraphQL",
      "Authentication and permissions",
      "Webhook architecture",
      "Third-party integrations",
      "Background jobs",
      "API documentation",
    ],
    seoTitle: "API Development Services | SobalTech",
    seoDesc: "Secure API development, backend systems, integrations, and webhook workflows.",
  },
  {
    id: "fallback-ai-integration",
    title: "AI Integration",
    slug: "ai-integration",
    description:
      "Practical AI features for search, automation, assistants, document workflows, and internal knowledge systems.",
    content: `<h2>AI features with practical business value</h2><p>We help teams integrate AI where it improves real workflows. That can mean internal search, customer support assistants, document processing, summarization, classification, or automation around existing data.</p><h3>What we build</h3><ul><li>LLM-powered assistants</li><li>Retrieval-augmented generation systems</li><li>Private knowledge search</li><li>Document extraction and review tools</li><li>AI workflow automation</li><li>Evaluation and monitoring foundations</li></ul><p>We focus on useful, grounded systems rather than fragile demos.</p>`,
    icon: "Cpu",
    image: null,
    features: [
      "LLM integrations",
      "RAG pipelines",
      "Knowledge base search",
      "Document automation",
      "Workflow assistants",
      "Evaluation and monitoring",
    ],
    seoTitle: "AI Integration Services | SobalTech",
    seoDesc: "AI integrations for assistants, knowledge search, document workflows, and automation.",
  },
  {
    id: "fallback-cybersecurity",
    title: "Cybersecurity",
    slug: "cybersecurity",
    description:
      "Security assessments, secure SDLC reviews, data protection guidance, and practical controls for growing digital products.",
    content: `<h2>Security built into the way your systems operate</h2><p>SobalTech helps teams reduce avoidable risk across software, cloud infrastructure, data handling, and day-to-day operations. We combine hands-on engineering experience with cybersecurity and digital forensics knowledge, so recommendations stay practical instead of theoretical.</p><h3>What we support</h3><ul><li>Secure software development lifecycle reviews</li><li>Application and cloud security assessments</li><li>Data protection and encryption guidance</li><li>Dependency, access control, and configuration reviews</li><li>Security awareness for product and operations teams</li><li>Remediation planning after audits or incidents</li></ul><h3>Outcome</h3><p>You get a clear view of the risks that matter, prioritized fixes, and better security habits inside the team.</p>`,
    icon: "ShieldCheck",
    image: null,
    features: [
      "Security assessments",
      "Secure SDLC reviews",
      "Data protection controls",
      "Cloud security checks",
      "Dependency and access reviews",
      "Remediation planning",
    ],
    seoTitle: "Cybersecurity Services | SobalTech",
    seoDesc: "Cybersecurity services for software teams, including security assessments, secure SDLC, data protection, and remediation planning.",
  },
  {
    id: "fallback-penetration-testing",
    title: "Penetration Testing",
    slug: "penetration-testing",
    description:
      "Application and infrastructure testing that identifies exploitable weaknesses before attackers or outages do.",
    content: `<h2>Find exploitable weaknesses before they become business problems</h2><p>Our penetration testing service focuses on practical, reproducible findings for web apps, APIs, authentication flows, cloud configurations, and business-critical workflows.</p><h3>Testing coverage</h3><ul><li>Web application penetration testing</li><li>API and authentication testing</li><li>Configuration and access control checks</li><li>Vulnerability verification and risk scoring</li><li>Executive summary and technical report</li><li>Retesting after remediation</li></ul><h3>How we report</h3><p>Reports are written for both leadership and engineers: business impact, evidence, severity, reproduction steps, and recommended fixes.</p>`,
    icon: "ShieldCheck",
    image: null,
    features: [
      "Web app testing",
      "API testing",
      "Auth and access checks",
      "Risk-ranked findings",
      "Technical reports",
      "Retesting support",
    ],
    seoTitle: "Penetration Testing Services | SobalTech",
    seoDesc: "Penetration testing for web applications, APIs, authentication flows, and infrastructure configurations.",
  },
  {
    id: "fallback-network-engineering",
    title: "Network Engineering",
    slug: "network-engineering",
    description:
      "Network design, implementation, monitoring, and support for offices, institutions, and production operations.",
    content: `<h2>Reliable networks for teams that cannot afford downtime</h2><p>We design, configure, and support network and server environments for businesses that need stable connectivity, clear administration, and practical disaster recovery.</p><h3>Capabilities</h3><ul><li>Network design and implementation</li><li>Server setup and administration</li><li>Backup and disaster recovery planning</li><li>Monitoring and uptime reviews</li><li>Basic network security hardening</li><li>Documentation and operational handoff</li></ul><p>This service is useful for offices, institutions, operations teams, and businesses modernizing legacy IT environments.</p>`,
    icon: "Network",
    image: null,
    features: [
      "Network design",
      "Server configuration",
      "Monitoring",
      "Backup planning",
      "Operational documentation",
      "Support handoff",
    ],
    seoTitle: "Network Engineering Services | SobalTech",
    seoDesc: "Network design, server administration, monitoring, backup planning, and IT infrastructure support.",
  },
  {
    id: "fallback-data-analytics",
    title: "Data Analytics",
    slug: "data-analytics",
    description:
      "Dashboards, reporting workflows, data pipelines, and decision systems that turn scattered business data into clarity.",
    content: `<h2>Turn operational data into decisions</h2><p>We help teams replace scattered spreadsheets and manual reporting with clean dashboards, reporting pipelines, and analytics systems connected to real business workflows.</p><h3>What we build</h3><ul><li>Executive KPI dashboards</li><li>Sales, finance, inventory, and operations reports</li><li>Database and API data pipelines</li><li>Scheduled reports and alerts</li><li>Role-based analytics dashboards</li><li>Data quality checks and metric definitions</li></ul><h3>Outcome</h3><p>Your team gets one reliable view of performance and fewer delays between activity and insight.</p>`,
    icon: "BarChart3",
    image: null,
    features: [
      "KPI dashboards",
      "Reporting pipelines",
      "Operational analytics",
      "Scheduled reports",
      "Data quality checks",
      "Metric definitions",
    ],
    seoTitle: "Data Analytics Services | SobalTech",
    seoDesc: "Data analytics, dashboards, reporting systems, and operational insights for growing businesses.",
  },
  {
    id: "fallback-it-consulting",
    title: "IT Consulting",
    slug: "it-consulting",
    description:
      "Technology roadmaps, build-versus-buy decisions, systems integration, and digital transformation advisory.",
    content: `<h2>Technical direction for business decisions</h2><p>SobalTech supports leaders who need clear technical judgment before committing budget, choosing platforms, or launching major digital initiatives.</p><h3>Advisory areas</h3><ul><li>Technology roadmap planning</li><li>Build-versus-buy analysis</li><li>Systems integration strategy</li><li>Digital transformation planning</li><li>Technical budget and delivery planning</li><li>Stakeholder communication and documentation</li></ul><p>The goal is to reduce uncertainty, avoid costly wrong turns, and align technical execution with business outcomes.</p>`,
    icon: "BriefcaseBusiness",
    image: null,
    features: [
      "Technology roadmaps",
      "Build-versus-buy analysis",
      "Systems integration",
      "Digital transformation",
      "Technical budgeting",
      "Stakeholder reporting",
    ],
    seoTitle: "IT Consulting Services | SobalTech",
    seoDesc: "IT consulting for technology roadmaps, systems integration, digital transformation, and build-versus-buy decisions.",
  },
  {
    id: "fallback-it-training",
    title: "IT Training",
    slug: "it-training",
    description:
      "Practical training and capacity building in software engineering, cybersecurity, AI, networking, and modern IT operations.",
    content: `<h2>Build stronger internal technical capacity</h2><p>We provide practical training for teams that need to improve how they build, secure, operate, and maintain digital systems.</p><h3>Training topics</h3><ul><li>Software engineering fundamentals and code quality</li><li>Secure development practices</li><li>Cybersecurity awareness</li><li>Cloud, networking, and operations basics</li><li>AI adoption and workflow automation</li><li>Documentation and team delivery practices</li></ul><p>Sessions can be structured as workshops, internal bootcamps, or focused enablement around a product your team already owns.</p>`,
    icon: "GraduationCap",
    image: null,
    features: [
      "Team workshops",
      "Secure coding training",
      "Cybersecurity awareness",
      "AI adoption sessions",
      "Operations playbooks",
      "Developer mentoring",
    ],
    seoTitle: "IT Training Services | SobalTech",
    seoDesc: "IT training and capacity building for software engineering, cybersecurity, AI, networking, and technical operations.",
  },
  {
    id: "fallback-custom-applications",
    title: "Custom Applications",
    slug: "custom-applications",
    description:
      "Bespoke software built around your specific business processes, replacing manual workflows and generic tools with systems designed for how you actually operate.",
    content: `<h2>Software built for your specific operations</h2><p>Off-the-shelf tools rarely fit the way a real business works. We build custom applications that match your exact workflows, data structures, and team requirements, from internal tools to full business management platforms.</p><h3>What we build</h3><ul><li>Internal operations and admin platforms</li><li>Business process automation systems</li><li>Customer portals and self-service tools</li><li>Inventory and resource management systems</li><li>Field service and scheduling applications</li><li>Multi-role workflow systems with permissions</li></ul><h3>How we approach it</h3><p>We start with requirements scoping to understand your current processes, bottlenecks, and constraints. The software we deliver is maintainable, documented, and built to evolve with your business.</p>`,
    icon: "AppWindow",
    image: null,
    features: [
      "Requirements scoping",
      "Full-stack development",
      "Workflow automation",
      "Custom admin panels",
      "Third-party integrations",
      "Documentation and handoff",
    ],
    seoTitle: "Custom Application Development | SobalTech",
    seoDesc: "Bespoke software development for internal tools, business process automation, customer portals, and operations platforms.",
  },
  {
    id: "fallback-pos-systems",
    title: "POS Systems",
    slug: "pos-systems",
    description:
      "Custom point-of-sale systems for retail, hospitality, and service businesses, built around your workflow and not a generic template.",
    content: `<h2>Point-of-sale software that fits your business</h2><p>We build POS systems designed around how you actually sell, whether that is a retail counter, a restaurant floor, a service desk, or a multi-location operation. The result is a system that handles your real transactions, reporting, and team workflows without workarounds.</p><h3>What we include</h3><ul><li>Sales and checkout flows</li><li>Product and inventory management</li><li>Payment processing integrations</li><li>Customer order and receipt workflows</li><li>Role-based staff access</li><li>Sales reporting and shift summaries</li><li>Hardware integration (printers, scanners, displays)</li><li>Offline-capable operations</li></ul><h3>Deployment</h3><p>We can build web-based POS systems, tablet applications, or hybrid setups depending on your environment. All systems are designed for day-to-day reliability with clear admin controls.</p>`,
    icon: "ShoppingCart",
    image: null,
    features: [
      "Sales and checkout",
      "Inventory management",
      "Payment processing",
      "Customer order workflows",
      "Sales reporting",
      "Hardware integration",
    ],
    seoTitle: "Custom POS System Development | SobalTech",
    seoDesc: "Custom point-of-sale software for retail, hospitality, and service businesses with inventory, payments, and reporting.",
  },
  {
    id: "fallback-ecommerce",
    title: "E-commerce",
    slug: "ecommerce",
    description:
      "Full-featured online stores with product management, payment processing, order workflows, and integrations that scale with your business.",
    content: `<h2>Online stores built to sell and scale</h2><p>We build e-commerce platforms that handle your real product catalog, order operations, and customer experience, whether you are launching a new store or replacing a system that has outgrown your needs.</p><h3>What we deliver</h3><ul><li>Product catalog and variant management</li><li>Checkout and payment processing</li><li>Order management and fulfillment workflows</li><li>Customer accounts and purchase history</li><li>Inventory tracking and low-stock alerts</li><li>Discount and promotion systems</li><li>Admin dashboard for store operations</li><li>SEO optimization and performance</li></ul><h3>Integrations</h3><p>We connect your store to shipping providers, payment gateways, accounting tools, and CRM systems so your entire operation stays in sync.</p>`,
    icon: "Store",
    image: null,
    features: [
      "Product catalog management",
      "Checkout and payments",
      "Order management",
      "Inventory tracking",
      "SEO and performance",
      "Third-party integrations",
    ],
    seoTitle: "E-commerce Development | SobalTech",
    seoDesc: "Custom e-commerce development with product management, payments, order workflows, and integrations that grow with your business.",
  },
];

const FALLBACK_BY_SLUG = new Map(
  FALLBACK_SERVICES.map((service) => [service.slug, service])
);

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const services = await prisma.service.findMany({
      where: { isPublished: true },
      select: { slug: true },
    });
    const slugs = new Set([
      ...FALLBACK_SERVICES.map((service) => service.slug),
      ...services.map((service) => service.slug),
    ]);
    return Array.from(slugs).map((slug) => ({ slug }));
  } catch {
    return FALLBACK_SERVICES.map((service) => ({ slug: service.slug }));
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
    const service = await prisma.service.findUnique({
      where: { slug, isPublished: true },
      select: { title: true, description: true, seoTitle: true, seoDesc: true },
    });
    const fallback = FALLBACK_BY_SLUG.get(slug);
    const pageService = service ?? fallback;
    if (!pageService) return { title: "Service Not Found" };

    const title = pageService.seoTitle || `${pageService.title} | SobalTech`;
    const description = pageService.seoDesc || pageService.description;
    return buildMeta({ title, description, path: `/services/${slug}` });
  } catch {
    const fallback = FALLBACK_BY_SLUG.get(slug);
    const title = fallback ? (fallback.seoTitle || `${fallback.title} | SobalTech`) : "Service";
    const description = fallback?.seoDesc || fallback?.description || "";
    return buildMeta({ title, description, path: `/services/${slug}` });
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

async function getServiceData(slug: string) {
  try {
    const [service, related] = await Promise.all([
      prisma.service.findUnique({ where: { slug, isPublished: true } }),
      prisma.service.findMany({
        where: { isPublished: true, NOT: { slug } },
        orderBy: { order: "asc" },
        take: 3,
      }),
    ]);

    if (service) {
      return {
        service,
        related:
          related.length > 0
            ? related
            : FALLBACK_SERVICES.filter((item) => item.slug !== slug).slice(0, 3),
      };
    }
  } catch {
    // Fall through to static fallback content.
  }

  const fallback = FALLBACK_BY_SLUG.get(slug);
  return {
    service: fallback ?? null,
    related: FALLBACK_SERVICES.filter((item) => item.slug !== slug).slice(0, 3),
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { service, related } = await getServiceData(slug);

  if (!service) notFound();

  const IconComponent = service.icon ? (ICON_MAP[service.icon] ?? Globe) : Globe;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: service.title,
              description: service.description,
              url: `/services/${slug}`,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: service.title, href: `/services/${slug}` },
            ])
          ),
        }}
      />
      <section className="relative isolate overflow-hidden border-b border-border bg-slate-950 pt-28 text-white dark:bg-black">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-10 h-80 w-80 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="absolute right-[-8%] top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-[760px] -translate-x-1/2 bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/20 to-cyan-500/10 blur-3xl" />
          <div className="site-vertical-lines site-vertical-lines-dark opacity-35" />
        </div>

        <Container className="pb-14 pt-10 sm:pb-18 lg:pb-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-center">
            <div className="max-w-4xl">
              <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
                <Link href="/services" className="text-slate-300 transition-colors hover:text-white">
                  Services
                </Link>
                <span className="text-slate-600">/</span>
                <span className="text-white">{service.title}</span>
              </div>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-2xl shadow-indigo-500/20">
                <IconComponent className="h-6 w-6" />
              </div>

              <Badge className="mb-5 rounded-full border-white/15 bg-white/10 text-white hover:bg-white/10">
                Service lane
              </Badge>
              <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.04em] text-balance sm:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {service.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/request-quote">
                  <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
                    Start a Project
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
            </div>

            <ServiceHeroArt slug={service.slug} />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Sparkles, label: "Outcome-led scope", text: "Built around business goals." },
              { icon: ShieldCheck, label: "Production standards", text: "Security and handoff included." },
              { icon: Clock3, label: "Clear delivery rhythm", text: "Weekly progress and tradeoffs." },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <div className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <main className="min-w-0">
            {service.image ? (
              <div className="mb-10 overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="aspect-video w-full object-cover"
                />
              </div>
            ) : (
              <ServiceVisual
                slug={service.slug}
                size="wide"
                className="mb-10 border-slate-200 bg-slate-950 dark:border-white/10"
              />
            )}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950 sm:p-8">
              <RichTextRenderer content={service.content} />
            </div>

            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ["Discover", "Clarify users, goals, constraints, and technical risks."],
                ["Build", "Ship usable increments with clean implementation and review."],
                ["Handoff", "Document decisions, train your team, and prepare operations."],
              ].map(([title, text], index) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-5">
                  <span className="text-xs font-bold text-brand-500">0{index + 1}</span>
                  <h2 className="mt-3 text-sm font-semibold">{title}</h2>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p>
                </div>
              ))}
            </section>
          </main>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950">
              <div className="bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 p-6 text-white">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-lg font-semibold">{service.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/80">{service.description}</p>
              </div>

              {service.features.length > 0 && (
                <div className="p-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    What&apos;s included
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-border p-6">
                <h3 className="text-base font-semibold">Ready to get started?</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Send the problem, context, and target timeline. We will help shape the next practical step.
                </p>
                <div className="mt-5 flex flex-col gap-2">
                  <Link href="/request-quote">
                    <Button className="w-full bg-brand-gradient text-white hover:opacity-90">
                      Get a Free Quote
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related services */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-8 text-xl font-bold tracking-tight sm:text-2xl">
              Other Services
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => {
                const RelIcon = s.icon ? (ICON_MAP[s.icon] ?? Globe) : Globe;
                return (
                  <Link
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/10 border border-brand-500/20">
                      <RelIcon className="h-4 w-4 text-brand-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-brand-500 transition-colors">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {s.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-500">
                      Learn more <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
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
