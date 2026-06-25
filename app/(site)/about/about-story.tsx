"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function AboutStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Text */}
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
                Built on a belief that software should solve real problems
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                SobalTech was founded in 2019 by a group of senior engineers who
                were tired of seeing great ideas fail due to poor technical
                execution. We set out to build an agency that cares as much
                about business outcomes as it does about code quality.
              </p>
              <p>
                Over five years, we&apos;ve grown from a three-person
                consultancy into a 15-strong team of engineers, designers, and
                strategists — shipping products for everyone from seed-stage
                startups to enterprise companies across four continents.
              </p>
              <p>
                Our north star has never changed: deliver software that
                genuinely makes a difference, on time, without the usual agency
                drama.
              </p>
            </div>
          </motion.div>

          {/* Visual / milestones */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { year: "2019", event: "Founded in San Francisco" },
              { year: "2020", event: "First enterprise client — $2M project" },
              { year: "2021", event: "Expanded to mobile & DevOps practices" },
              { year: "2022", event: "Opened European operations" },
              { year: "2023", event: "Launched AI integration service line" },
              { year: "2024", event: "50+ projects, 15-person team" },
            ].map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                className="rounded-2xl border border-border bg-card p-5 space-y-1 shadow-sm"
              >
                <p className="text-xs font-semibold text-primary">{m.year}</p>
                <p className="text-sm text-muted-foreground leading-snug">
                  {m.event}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
