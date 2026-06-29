"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cloud,
  Code2,
  Globe,
  MonitorSmartphone,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-background pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-[660px] bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.16),transparent_36%),linear-gradient(to_bottom,rgba(248,250,252,1),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.18),transparent_38%),linear-gradient(to_bottom,rgba(15,23,42,0.75),rgba(2,6,23,0))]" />
        <div className="absolute left-[-12rem] top-36 h-[28rem] w-[28rem] rounded-full bg-indigo-300/18 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute right-[-10rem] top-20 h-[30rem] w-[30rem] rounded-full bg-violet-300/18 blur-3xl dark:bg-violet-500/10" />
        <div className="site-vertical-lines opacity-35" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/72 px-4 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm backdrop-blur-xl dark:border-indigo-400/20 dark:bg-white/[0.06] dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Strategy, design, engineering and secure delivery
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.06em] text-foreground text-balance sm:text-6xl lg:text-7xl"
          >
            We Build Clean Digital Products That Are Ready For Real Users.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            SobalTech helps ambitious teams design, build and launch web apps,
            mobile products, dashboards, APIs, cloud systems and AI-powered
            workflows.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/request-quote">
              <Button size="lg" className="h-12 rounded-xl bg-slate-950 px-8 text-base font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="h-12 rounded-xl border-slate-200 bg-white/62 px-8 text-base shadow-sm backdrop-blur-xl hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]">
                View Our Work
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
              What we build
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  Icon: Globe,
                  title: "Websites & Web Apps",
                  detail: "Landing pages · SaaS platforms · Dashboards",
                },
                {
                  Icon: MonitorSmartphone,
                  title: "Mobile Apps",
                  detail: "iOS & Android · React Native · Cross-platform",
                },
                {
                  Icon: Settings2,
                  title: "Custom Software",
                  detail: "Management systems · POS · Receipt systems · Booking platforms",
                },
              ].map(({ Icon, title, detail }) => (
                <div
                  key={title}
                  className="flex flex-col gap-2 rounded-2xl border border-slate-200/70 bg-white/64 px-4 py-3.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.045]"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative hidden lg:block"
        >
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/68 p-4 shadow-[0_32px_100px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/58 dark:shadow-[0_32px_100px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <div className="relative overflow-hidden rounded-[1.45rem] border border-slate-200/75 bg-slate-950 p-5 text-white shadow-2xl dark:border-white/10">
              <div aria-hidden className="hero-active-line-field" />
              <div aria-hidden className="hero-line-streams">
                <span style={{ left: "16%", animationDelay: "0s" }} />
                <span style={{ left: "38%", animationDelay: "1.15s" }} />
                <span style={{ left: "63%", animationDelay: "0.55s" }} />
                <span style={{ left: "84%", animationDelay: "1.8s" }} />
              </div>

              <div className="relative z-10">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
                      Delivery cockpit
                    </p>
                    <p className="mt-1 text-xl font-semibold tracking-tight">
                      Product launch status
                    </p>
                  </div>
                  <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200 shadow-[0_0_24px_rgba(110,231,183,0.12)]">
                    On track
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    ["8", "Sprints"],
                    ["99.9%", "Target uptime"],
                    ["24/7", "Monitoring"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                      <p className="text-2xl font-bold tracking-tight">{value}</p>
                      <p className="mt-1 text-xs text-slate-300">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-3">
                  {[
                    { Icon: Code2, title: "Engineering", detail: "Architecture, APIs, product UI" },
                    { Icon: Cloud, title: "Infrastructure", detail: "CI/CD, cloud, observability" },
                    { Icon: ShieldCheck, title: "Security", detail: "Reviews, hardening, safe release" },
                  ].map(({ Icon, title, detail }) => (
                    <div key={title} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.065] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-950">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{title}</p>
                        <p className="text-xs text-slate-300">{detail}</p>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-500/20 to-violet-500/18 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">Analytics pipeline</p>
                      <p className="mt-1 text-xs text-slate-300">
                        Dashboards, reporting and automation connected before launch.
                      </p>
                    </div>
                    <BarChart3 className="h-9 w-9 text-indigo-200" />
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-indigo-300 to-violet-300" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
