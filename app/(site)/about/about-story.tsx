"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Cloud,
  Code2,
  Layers3,
  ShieldCheck,
} from "lucide-react";

const capabilities = [
  {
    Icon: Code2,
    title: "Product engineering",
    detail: "Web platforms, mobile apps, APIs, dashboards and custom internal tools.",
  },
  {
    Icon: Cloud,
    title: "Cloud and operations",
    detail: "Infrastructure, deployment workflows, observability and production support.",
  },
  {
    Icon: ShieldCheck,
    title: "Security by default",
    detail: "Secure development practices, reviews, hardening and risk-aware delivery.",
  },
  {
    Icon: Layers3,
    title: "Business systems",
    detail: "Integrations, automation, analytics and practical digital transformation.",
  },
] as const;

export function AboutStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-24 h-96 w-96 rounded-full bg-indigo-300/15 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute right-[-10rem] bottom-10 h-96 w-96 rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-500/10" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:items-center">
          {/* Tet */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-4 py-1.5 mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
                  Our Story
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Practical technology, built around real operational problems.
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                SobalTech is a Ghana-based technology company built around a
                practical belief: software, infrastructure, security, and design
                should work together to solve real business problems.
              </p>
              <p>
                Our work combines full-stack software engineering, mobile and
                web application development, UI/UX design, AI solutions, cloud
                computing, cybersecurity, networking, systems integration, and
                IT consulting for businesses and organizations.
              </p>
              <p>
                The company is led with a hands-on engineering mindset shaped by
                real product delivery, secure development practices, cloud and
                server operations, team mentoring, and digital transformation
                advisory.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                ["2018", "delivery experience"],
                ["2025", "SobalTech formalized"],
                ["Full-stack", "engineering depth"],
                ["Ghana", "local roots, global standards"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200/70 bg-white/64 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045]"
                >
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual / capability system */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/68 p-4 shadow-[0_26px_80px_rgba(15,23,42,0.13),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/56 dark:shadow-[0_26px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="rounded-[1.45rem] border border-slate-200/75 bg-slate-950 p-5 text-white dark:border-white/10">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                    Delivery model
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                    One technical partner across the product lifecycle.
                  </h3>
                </div>
                <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-950 sm:flex">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {capabilities.map(({ Icon, title, detail }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.06 }}
                    className="flex flex-col items-center text-center rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 text-sm font-semibold">{title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                      {detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
