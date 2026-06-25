"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
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
    <section className="relative isolate overflow-hidden border-b border-border bg-background pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-indigo-50 via-violet-50/60 to-transparent dark:from-indigo-950/25 dark:via-violet-950/10" />
        <div className="absolute left-1/2 top-20 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur dark:border-indigo-400/20 dark:bg-white/[0.06] dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Product strategy, design and engineering
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-5xl font-bold leading-[1.02] tracking-[-0.055em] text-foreground text-balance sm:text-6xl lg:text-7xl"
          >
            We build clean digital products that are ready for real users.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            SobalTech helps ambitious teams design, build and launch web apps,
            mobile products, dashboards, APIs, cloud systems and AI-powered
            workflows.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link href="/request-quote">
              <Button size="lg" className="h-12 bg-brand-gradient px-8 text-base font-semibold text-white hover:opacity-90">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                View Our Work
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-3"
          >
            {[
              "Web and SaaS platforms",
              "Mobile app experiences",
              "Cloud, APIs and AI workflows",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-2xl border border-border bg-card/80 px-4 py-3 text-sm text-muted-foreground shadow-sm"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-500" />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
