"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Smartphone,
  Cloud,
  Palette,
  Code2,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Services data ────────────────────────────────────────────────────────────

const services = [
  {
    Icon: Globe,
    title: "Web Development",
    description:
      "From lightning-fast landing pages to complex SaaS platforms. Built with Next.js, React, and modern full-stack architectures that scale effortlessly.",
    href: "/services/web-development",
    accent: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    features: ["Next.js & React", "TypeScript", "REST & GraphQL APIs"],
  },
  {
    Icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-quality React Native apps for iOS and Android. Seamless UX, offline-first capabilities, and full app-store lifecycle support.",
    href: "/services/mobile-apps",
    accent: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-50 dark:bg-violet-950/50",
    iconColor: "text-violet-600 dark:text-violet-400",
    features: ["React Native & Expo", "iOS & Android", "Push notifications"],
  },
  {
    Icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "AWS, GCP, and Azure infrastructure as code. CI/CD pipelines, container orchestration with Kubernetes, and 99.9% uptime guarantees.",
    href: "/services/cloud-devops",
    accent: "from-sky-500 to-blue-500",
    iconBg: "bg-sky-50 dark:bg-sky-950/50",
    iconColor: "text-sky-600 dark:text-sky-400",
    features: ["AWS / GCP / Azure", "Kubernetes & Docker", "99.9% uptime SLA"],
  },
  {
    Icon: Palette,
    title: "UI/UX Design",
    description:
      "User-centered design that converts. Intuitive interfaces, scalable design systems, and high-fidelity prototypes backed by user research.",
    href: "/services/ui-ux-design",
    accent: "from-rose-500 to-pink-500",
    iconBg: "bg-rose-50 dark:bg-rose-950/50",
    iconColor: "text-rose-600 dark:text-rose-400",
    features: ["Figma design systems", "User research", "WCAG accessibility"],
  },
  {
    Icon: Code2,
    title: "API Development",
    description:
      "RESTful and GraphQL APIs built for performance and reliability. Third-party integrations, webhooks, and real-time event streaming.",
    href: "/services/api-development",
    accent: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    features: ["REST & GraphQL", "OpenAPI docs", "Webhook systems"],
  },
  {
    Icon: Cpu,
    title: "AI Integration",
    description:
      "Supercharge your product with AI. LLM-powered features, custom ML models, RAG pipelines, and intelligent automation workflows.",
    href: "/services/ai-integration",
    accent: "from-amber-500 to-orange-500",
    iconBg: "bg-amber-50 dark:bg-amber-950/50",
    iconColor: "text-amber-600 dark:text-amber-400",
    features: ["LLM integration", "RAG pipelines", "AI automation"],
  },
] as const;

// ─── Service card ─────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -28 : 28, y: 12 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      className={cn(
        "relative grid items-center gap-4 md:grid-cols-[1fr_72px_1fr]",
        index > 0 && "mt-5 md:mt-0",
      )}
    >
      <div className={cn("hidden md:block", isLeft ? "md:col-start-3" : "md:col-start-1")} />

      {/* Connector */}
      <div
        className={cn(
          "pointer-events-none absolute left-5 top-5 h-px w-8 bg-gradient-to-r md:top-1/2 md:w-[calc(50%-2rem)] md:-translate-y-1/2",
          service.accent,
          isLeft ? "md:left-auto md:right-1/2" : "md:left-1/2",
        )}
      >
      </div>

      {/* Branch node */}
      <div className="absolute left-0 top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        <div className={cn("h-3 w-3 rounded-full bg-gradient-to-br", service.accent)} />
      </div>

      <Link
        href={service.href}
        className={cn(
          "group block pl-14 md:pl-0",
          isLeft ? "md:col-start-1 md:row-start-1" : "md:col-start-3 md:row-start-1",
        )}
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/85 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300/60 hover:bg-card hover:shadow-[0_12px_36px_rgba(15,23,42,0.08)] dark:hover:border-indigo-400/25 dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.35)]">
          <div className="flex gap-4 pl-2">
            <div
              className={cn(
                "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
                service.iconBg,
              )}
            >
              <service.Icon className={cn("h-[18px] w-[18px]", service.iconColor)} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[15px] font-semibold text-foreground transition-colors duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {service.title}
                </h3>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500" />
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {service.features.slice(0, 2).map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ServicesPreview() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-4 py-1.5 mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Focused services for product teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Bring us in for one lane or the full build: product design, web,
            mobile, APIs, infrastructure, and AI workflows.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute bottom-8 left-5 top-4 w-px bg-border md:left-1/2 md:-translate-x-1/2">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-indigo-400/70 to-transparent" />
          </div>

          <div className="space-y-5 md:space-y-0">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-9 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-500 transition-colors hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Explore all services
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
