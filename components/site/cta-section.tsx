"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, Shield, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Trust signals ─────────────────────────────────────────────────────────────

const trustItems = [
  { Icon: Shield, label: "No lock-in contracts" },
  { Icon: Clock, label: "Custom proposal in 48h" },
  { Icon: Zap, label: "Free 30-min discovery call" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 md:py-36"
      style={{ backgroundColor: "#030B1A" }}
    >
      {/* Gradient mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 100% 80% at 50% 50%, rgba(79,70,229,0.22) 0%, rgba(99,102,241,0.08) 40%, transparent 70%)",
            "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(139,92,246,0.1) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 50% at 80% 20%, rgba(99,102,241,0.07) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* Animated orbs */}
      <motion.div
        aria-hidden
        className="absolute -left-56 -top-56 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-56 -right-56 h-[600px] w-[600px] rounded-full bg-violet-600/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Top border line */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Open for new projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Ready to build something{" "}
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            amazing?
          </span>
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg"
        >
          Let&apos;s turn your vision into reality. Book a free 30-minute
          discovery call, no strings attached and no sales pitch.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/request-quote">
            <Button
              size="lg"
              className="h-12 gap-2 rounded-xl bg-white px-8 text-base font-semibold text-slate-900 shadow-lg hover:bg-white/92 active:scale-[0.98] transition-all duration-200"
            >
              <Calendar className="h-4 w-4" />
              Start a Project
            </Button>
          </Link>
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="h-12 gap-2 rounded-xl border-white/20 bg-white/[0.04] px-8 text-base text-white backdrop-blur-sm hover:border-white/35 hover:bg-white/[0.08] transition-all duration-200"
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          {trustItems.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-xs text-white/30"
            >
              <Icon className="h-3.5 w-3.5 text-indigo-400/50" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
