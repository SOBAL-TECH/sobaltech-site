"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BadgeCheck,
  Gauge,
  Handshake,
  LockKeyhole,
  Route,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
  {
    Icon: Wrench,
    title: "Practical engineering",
    description:
      "We design systems around the real business workflow, not around fashionable tools or unnecessary complexity.",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    Icon: LockKeyhole,
    title: "Security-minded delivery",
    description:
      "Security, permissions, data handling and deployment safety are treated as core product requirements from the start.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    Icon: Route,
    title: "Clear execution",
    description:
      "Every engagement needs clear scope, visible progress, direct communication and decisions that are easy to defend.",
    color: "text-sky-500",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    Icon: Handshake,
    title: "Long-term partnership",
    description:
      "We aim to leave clients with systems they can understand, operate, extend and trust after launch.",
    color: "text-violet-500",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    Icon: Gauge,
    title: "Performance and reliability",
    description:
      "Good software should feel fast, stay available, and give teams confidence when real users depend on it.",
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    Icon: BadgeCheck,
    title: "Professional standards",
    description:
      "From interface details to backend architecture, the work should look credible and hold up under scrutiny.",
    color: "text-rose-500",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
] as const;

export function AboutValues() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative border-y bg-muted/30 py-20 md:py-28"
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
            How we approach the work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-base">
            The principles below keep our work grounded, useful, and credible,
            from planning through launch and ongoing support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group flex flex-col items-center space-y-4 rounded-[1.25rem] border border-slate-200/70 bg-white/72 p-6 shadow-sm backdrop-blur-xl text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-indigo-400/25"
            >
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105",
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
