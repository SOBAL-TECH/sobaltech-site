"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Search,
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    Icon: Search,
    title: "Discovery",
    description:
      "Deep-dive into your business, audience, and goals. We ask the right questions to surface real challenges and opportunities.",
    accent: "from-blue-500 to-indigo-500",
    iconBg: "bg-blue-50 dark:bg-blue-950/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    number: "02",
    Icon: Lightbulb,
    title: "Strategy",
    description:
      "Define a clear roadmap: tech stack, architecture decisions, sprint milestones, and measurable success criteria.",
    accent: "from-indigo-500 to-violet-500",
    iconBg: "bg-indigo-50 dark:bg-indigo-950/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    number: "03",
    Icon: PenTool,
    title: "Design",
    description:
      "Wireframes, prototypes, and high-fidelity UI that are beautiful, accessible, and conversion-optimized by default.",
    accent: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-50 dark:bg-violet-950/50",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  {
    number: "04",
    Icon: Code2,
    title: "Development",
    description:
      "Clean, tested, scalable code delivered in agile sprints with weekly demos so you stay in full control.",
    accent: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-50 dark:bg-purple-950/50",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    number: "05",
    Icon: Rocket,
    title: "Launch",
    description:
      "Smooth deployment with CI/CD pipelines, performance tuning, real-time monitoring, and hands-on go-live support.",
    accent: "from-rose-500 to-orange-500",
    iconBg: "bg-rose-50 dark:bg-rose-950/50",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  {
    number: "06",
    Icon: TrendingUp,
    title: "Growth",
    description:
      "Post-launch analytics, A/B testing, iterative improvements, and scaling strategies to sustain long-term momentum.",
    accent: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-50 dark:bg-emerald-950/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
] as const;

// ─── Step card ────────────────────────────────────────────────────────────────

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: "easeOut" }}
      className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Number + icon row */}
      <div className="flex items-start justify-between">
        {/* Big ghost number */}
        <span
          className={cn(
            "select-none text-5xl font-black leading-none bg-gradient-to-br bg-clip-text text-transparent opacity-15",
            step.accent,
          )}
        >
          {step.number}
        </span>
        {/* Icon */}
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            step.iconBg,
          )}
        >
          <step.Icon className={cn("h-4.5 w-4.5", step.iconColor)} />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-semibold text-foreground">
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>

      {/* Animated bottom accent line */}
      <div
        className={cn(
          "mt-auto h-0.5 w-8 rounded-full bg-gradient-to-r opacity-50 transition-all duration-300 group-hover:w-full group-hover:opacity-100",
          step.accent,
        )}
      />
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-muted/30 dark:bg-muted/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center md:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-4 py-1.5 mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
              Our Process
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            From idea to launch in weeks, not months
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            A proven, transparent process that delivers results, from initial
            call to launch and beyond.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
