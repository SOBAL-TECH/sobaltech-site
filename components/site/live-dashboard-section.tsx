"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  Database,
  Globe2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const activity = [
  {
    icon: CreditCard,
    label: "Payment workflow deployed",
    meta: "Checkout, invoices, and receipts",
    value: "+18%",
  },
  {
    icon: Database,
    label: "Customer data synced",
    meta: "CRM, app database, analytics",
    value: "42ms",
  },
  {
    icon: ShieldCheck,
    label: "Security checks passed",
    meta: "Roles, audit logs, rate limits",
    value: "100%",
  },
  {
    icon: Globe2,
    label: "Production release live",
    meta: "Web, API, mobile build",
    value: "v2.4",
  },
  {
    icon: Zap,
    label: "Automation triggered",
    meta: "Lead routing and follow-ups",
    value: "8 tasks",
  },
];

const metrics = [
  ["Revenue tracked", "₵84.2k"],
  ["Active users", "12.8k"],
  ["System health", "99.9%"],
];

export function LiveDashboardSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  const dashboardY = useTransform(smoothProgress, [0, 1], [42, -34]);
  const feedY = useTransform(smoothProgress, [0, 1], [26, -118]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.45, 1], [0.25, 0.8, 0.35]);
  const progressScale = useTransform(smoothProgress, [0.1, 0.9], [0.08, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-20 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl dark:bg-indigo-500/10" />
        <div className="site-vertical-lines opacity-25" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Badge variant="secondary" className="mb-5 rounded-full">
            Live delivery system
          </Badge>
          <h2 className="max-w-xl text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-5xl">
            Watch product work move from idea to production.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-muted-foreground">
            We connect strategy, design, engineering, cloud, and automation into
            one visible delivery flow. As work moves, the dashboard tells the
            truth: what shipped, what changed, and what needs attention.
          </p>

          <div className="mt-8 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: Clock3, label: "Weekly rhythm" },
              { icon: Activity, label: "Live visibility" },
              { icon: CheckCircle2, label: "Clean handoff" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <item.icon className="h-4 w-4 text-brand-500" />
                <p className="mt-3 text-xs font-semibold text-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div style={{ y: dashboardY }} className="relative">
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute -inset-8 rounded-xl bg-gradient-to-br from-indigo-500/30 via-cyan-400/20 to-fuchsia-500/20 blur-3xl"
          />

          <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-[0_30px_100px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-slate-950 dark:shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
            <div className="rounded-xl border border-slate-200/70 bg-slate-50 dark:border-white/10 dark:bg-[#07111f]">
              <div className="flex items-center gap-1.5 border-b border-slate-200 px-4 py-3 dark:border-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <div className="ml-4 flex-1 rounded-full bg-slate-200/70 px-3 py-1 text-center text-[10px] text-slate-500 dark:bg-white/[0.06] dark:text-slate-400">
                  live.sobaltech.delivery
                </div>
              </div>

              <div className="grid grid-cols-1 gap-0 lg:grid-cols-[180px_1fr]">
                <aside className="hidden border-r border-slate-200 bg-white/60 p-4 dark:border-white/10 dark:bg-white/[0.025] lg:block">
                  <div className="mb-6 h-8 w-28 rounded-xl bg-slate-200 dark:bg-white/10" />
                  <div className="space-y-2">
                    {["Overview", "Builds", "Activity", "Reports"].map((item, index) => (
                      <div
                        key={item}
                        className={`rounded-xl px-3 py-2 text-xs ${
                          index === 2
                            ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-200"
                            : "bg-slate-100 text-slate-500 dark:bg-white/[0.045] dark:text-slate-500"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>

                <main className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Delivery activity
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Scroll-linked project operations preview
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Live
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {metrics.map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-lg border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/[0.045]"
                      >
                        <p className="text-xl font-bold text-foreground">{value}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.035]">
                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/10">
                      <p className="text-xs font-semibold text-foreground">Activity stream</p>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="relative h-[290px] overflow-hidden p-3">
                      <motion.div
                        style={{ scaleY: progressScale }}
                        className="absolute left-[31px] top-5 h-[250px] w-px origin-top bg-gradient-to-b from-indigo-500 via-cyan-400 to-emerald-400"
                      />
                      <motion.div style={{ y: feedY }} className="space-y-3 pt-4">
                        {[...activity, ...activity].map((item, index) => (
                          <div
                            key={`${item.label}-${index}`}
                            className="relative flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 shadow-sm dark:border-white/10 dark:bg-slate-950/70"
                          >
                            <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white">
                              <item.icon className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-foreground">
                                {item.label}
                              </p>
                              <p className="mt-1 truncate text-xs text-muted-foreground">
                                {item.meta}
                              </p>
                            </div>
                            <span className="rounded-full border border-border bg-background px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
