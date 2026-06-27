import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, TrendingUp, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTASection } from "@/components/site/cta-section";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CASE_STUDIES = [
  {
    slug: "nexus-ai-platform",
    client: "Nexus AI",
    title: "Nexus AI Platform",
    tagline: "From prototype to production AI analytics in 10 weeks",
    service: "AI Integration",
    serviceColor: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800/30",
    accentFrom: "from-violet-500",
    accentTo: "to-indigo-600",
    tags: ["Next.js", "Python", "OpenAI", "PostgreSQL", "AWS"],
    problem:
      "Nexus AI's enterprise clients were spending hours every week waiting on manually compiled reports. Analysts were buried in repetitive data tasks rather than delivering insights. The existing tooling was a patchwork of spreadsheets and disconnected dashboards that required constant maintenance.",
    solution:
      "We built a secure, multi-role analytics workspace from scratch. The core of the platform was a natural-language query interface powered by OpenAI that let business teams ask questions about their data in plain English. Supporting this were real-time dashboards for revenue, usage, and operational metrics, role-based access controls for analysts and executives, and automated anomaly detection that surfaced unusual patterns before they became problems.",
    outcomes: [
      "10-week delivery from kickoff to production deployment",
      "Natural-language query interface replacing manual report requests",
      "Automated anomaly detection covering 12 operational metric streams",
      "Role-based access deployed for 3 distinct team tiers",
      "Report turnaround reduced from hours to seconds",
    ],
    quote: {
      text: "SobalTech transformed our MVP into a production-ready platform in 10 weeks. Their engineering quality is exceptional: clean architecture, great test coverage, and zero hand-holding required.",
      author: "Sarah Chen",
      role: "CTO, Nexus AI",
    },
  },
  {
    slug: "growthstack-dashboard",
    client: "GrowthStack",
    title: "GrowthStack SaaS Dashboard",
    tagline: "Multi-tenant SaaS analytics platform built for scale",
    service: "Web Development",
    serviceColor: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/30",
    accentFrom: "from-indigo-500",
    accentTo: "to-sky-600",
    tags: ["React", "Node.js", "Stripe", "Redis", "Docker"],
    problem:
      "GrowthStack was tracking subscription business metrics across disconnected tools. Customer-facing reporting was slow, billing logic was brittle, and the codebase was a single monolith that made adding new features risky. They needed a scalable SaaS product they could confidently sell to paying customers.",
    solution:
      "We designed and built a multi-tenant SaaS dashboard from the ground up. The architecture separated each customer workspace at the data layer, enabling clean isolation and future white-labelling. We built a custom charting engine with saved report functionality, integrated Stripe for subscription billing and plan management, and added team permission workflows with invite flows and role controls.",
    outcomes: [
      "Multi-tenant architecture with complete workspace isolation",
      "Custom charting engine with 8 chart types and saved reports",
      "Stripe billing supporting 3 subscription tiers and annual plans",
      "Team collaboration with role-based permissions and invite flows",
      "Sub-100ms dashboard load time with Redis caching layer",
    ],
    quote: {
      text: "SobalTech is the first agency that genuinely understood our business before writing a single line of code. The discovery phase alone saved us months.",
      author: "Marcus Rivera",
      role: "Founder and CEO, GrowthStack",
    },
  },
  {
    slug: "retailedge-mobile",
    client: "RetailEdge",
    title: "RetailEdge Mobile App",
    tagline: "60k downloads in the first month on iOS and Android",
    service: "Mobile Apps",
    serviceColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/30",
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-600",
    tags: ["React Native", "Expo", "TypeScript", "GraphQL", "Firebase"],
    problem:
      "RetailEdge's mobile commerce experience was built on an outdated native iOS codebase with no Android counterpart. The app was slow, visually dated, and expensive to maintain. They were losing shoppers to faster, better-designed competitors and needed a cross-platform rebuild that would not require two separate engineering teams.",
    solution:
      "We rebuilt the entire app using React Native and Expo, giving the team a single codebase for both platforms. We focused heavily on perceived performance: instant skeleton screens, optimistic UI updates, and offline cart persistence using AsyncStorage. We added AI-powered product recommendations via a GraphQL API, push notifications for price drops and order updates, and a complete order tracking flow from purchase to delivery.",
    outcomes: [
      "60,000 downloads in the first month post-launch",
      "4.8-star rating on both App Store and Google Play",
      "Single React Native codebase replacing two separate native codebases",
      "Offline cart persistence surviving low-connectivity environments",
      "14-week delivery from discovery to App Store approval",
    ],
    quote: {
      text: "SobalTech built our React Native app from scratch in 14 weeks. 4.8 stars on both stores, 60k downloads in the first month. The attention to performance detail was remarkable.",
      author: "Priya Sharma",
      role: "Director of Digital, RetailEdge",
    },
  },
  {
    slug: "finleap-cloud-migration",
    client: "Finleap",
    title: "Finleap Cloud Migration",
    tagline: "Zero-downtime AWS migration for a live fintech platform",
    service: "Cloud and DevOps",
    serviceColor: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/30",
    accentFrom: "from-sky-500",
    accentTo: "to-blue-600",
    tags: ["AWS", "Kubernetes", "Terraform", "PostgreSQL", "CI/CD"],
    problem:
      "Finleap was running their fintech platform on aging bare-metal infrastructure that required manual deployments and had no disaster recovery plan. Their team was spending 30 percent of engineering time on infrastructure maintenance. Compliance requirements were tightening and the existing setup could not pass an audit.",
    solution:
      "We designed a phased AWS migration strategy that moved services over without any customer-facing downtime. We containerised each service using Docker, orchestrated deployments with Kubernetes, and provisioned all infrastructure as code using Terraform. We set up a CI/CD pipeline with automated testing gates, deployed managed PostgreSQL clusters with automated backups, and configured centralised monitoring and alerting via CloudWatch.",
    outcomes: [
      "Zero minutes of customer-facing downtime during the full migration",
      "Deployment time cut from 45 minutes to under 4 minutes",
      "100 percent infrastructure-as-code via Terraform",
      "Automated daily backups with tested restore procedures",
      "Compliance-ready audit trail and access control logging",
    ],
    quote: {
      text: "Their DevOps team migrated our infrastructure to AWS with zero downtime. The CI/CD pipeline they set up cut our deployment time from 45 minutes to under 4. Outstanding work.",
      author: "David Park",
      role: "VP Engineering, Finleap",
    },
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

function CaseStudyCard({ cs, index }: { cs: (typeof CASE_STUDIES)[number]; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <article className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">

      {/* Header band */}
      <div className={cn(
        "relative h-2 w-full bg-gradient-to-r",
        cs.accentFrom,
        cs.accentTo,
      )} />

      <div className="p-6 sm:p-8">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider",
            cs.serviceColor,
          )}>
            {cs.service}
          </span>
          <span className="text-xs text-muted-foreground">{cs.client}</span>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-1">{cs.title}</h2>
        <p className="text-sm text-muted-foreground mb-6">{cs.tagline}</p>

        {/* 3-col grid: problem / solution / outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Problem */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={cn("h-5 w-1 rounded-full bg-gradient-to-b", cs.accentFrom, cs.accentTo)} />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">The Challenge</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{cs.problem}</p>
          </div>

          {/* Solution */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={cn("h-5 w-1 rounded-full bg-gradient-to-b", cs.accentFrom, cs.accentTo)} />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">What We Built</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{cs.solution}</p>
          </div>

          {/* Outcomes */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={cn("h-5 w-1 rounded-full bg-gradient-to-b", cs.accentFrom, cs.accentTo)} />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground">The Outcomes</p>
            </div>
            <ul className="space-y-2">
              {cs.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-emerald-500" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quote */}
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <p className="text-sm text-foreground italic leading-relaxed mb-3">
            "{cs.quote.text}"
          </p>
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-[10px] font-bold bg-gradient-to-br text-white",
              cs.accentFrom,
              cs.accentTo,
            )}>
              {cs.quote.author.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <p className="text-xs text-muted-foreground">{cs.quote.author}, {cs.quote.role}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {cs.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50/80 via-indigo-50/20 to-transparent dark:from-sky-950/30 dark:via-transparent dark:to-transparent" />
          <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-sky-400/10 blur-[100px] dark:bg-sky-600/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 shadow-md">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 dark:border-sky-800/40 dark:bg-sky-950/40 px-3 py-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-sky-600 dark:text-sky-400">Case Studies</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Real projects. Real results.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              A detailed look at how we approached complex problems and what we delivered for clients across industries.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: `${CASE_STUDIES.length}`, label: "Case studies" },
                { value: "4", label: "Industries" },
                { value: "0", label: "Missed deadlines" },
                { value: "5★", label: "Avg client rating" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-border bg-card/70 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Summary row */}
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CASE_STUDIES.map((cs, i) => (
              <div
                key={cs.slug}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white text-xs font-bold",
                  cs.accentFrom,
                  cs.accentTo,
                )}>
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{cs.client}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{cs.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="space-y-8">
          {CASE_STUDIES.map((cs, i) => (
            <CaseStudyCard key={cs.slug} cs={cs} index={i} />
          ))}
        </div>
      </div>

      {/* Bottom CTA strip */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-foreground">Want results like these?</p>
                <p className="text-sm text-muted-foreground mt-0.5">Tell us about your project and we will scope a proposal.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
              >
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/testimonials"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Read testimonials
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
