"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  Zap,
  Users,
  Eye,
  Heart,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
  {
    Icon: Shield,
    title: "Quality Without Compromise",
    description:
      "We don't ship code we wouldn't be proud to maintain ourselves. Every pull request is peer-reviewed, every feature is tested, every deployment is monitored.",
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    Icon: Zap,
    title: "Speed That Scales",
    description:
      "Fast shipping isn't about cutting corners — it's about smart decisions, clear scope, and eliminating unnecessary process. We move quickly and carefully.",
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    Icon: Eye,
    title: "Radical Transparency",
    description:
      "No hidden blockers, no surprises. You always know where your project stands, what decisions we're making, and why. Honesty is non-negotiable.",
    color: "text-purple-500",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    Icon: Users,
    title: "True Partnership",
    description:
      "We act as your engineering partner, not just a vendor. We challenge assumptions, suggest alternatives, and care about your success beyond the engagement.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    Icon: Heart,
    title: "Human-Centered Design",
    description:
      "Every pixel and every API endpoint exists to serve a real person. We design and build with empathy, accessibility, and user delight as baseline expectations.",
    color: "text-rose-500",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
  {
    Icon: TrendingUp,
    title: "Long-Term Thinking",
    description:
      "We optimize for your 3-year roadmap, not just the current sprint. Architecture decisions, tech stack choices, and team processes are all made with longevity in mind.",
    color: "text-sky-500",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
] as const;

export function AboutValues() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-muted/30 border-y"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-4 py-1.5 mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
              What We Stand For
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Core Values
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-base">
            The principles that guide every decision we make — from hiring to
            architecture to client communication.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className={cn(
                  "inline-flex h-10 w-10 items-center justify-center rounded-xl border",
                  value.bg
                )}
              >
                <value.Icon className={cn("h-5 w-5", value.color)} />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
