"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    description: "Across startups, scale-ups, and Fortune 500s",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Measured by post-project NPS surveys",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    value: 5,
    suffix: "+",
    label: "Years of Experience",
    description: "Shipping production-grade products since 2019",
    accent: "from-violet-500 to-purple-500",
  },
  {
    value: 15,
    suffix: "+",
    label: "Team Members",
    description: "Senior engineers, designers, and strategists",
    accent: "from-sky-500 to-blue-500",
  },
] as const;

// ─── Animated counter ─────────────────────────────────────────────────────────

function Counter({
  to,
  suffix,
  accent,
}: {
  to: number;
  suffix: string;
  accent: string;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(spanRef, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, to, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest: number) => {
        if (spanRef.current) {
          spanRef.current.textContent = Math.round(latest) + suffix;
        }
      },
    });
    return controls.stop;
  }, [isInView, to, suffix, motionVal]);

  return (
    <span
      ref={spanRef}
      className={cn(
        "tabular-nums bg-gradient-to-r bg-clip-text text-transparent",
        accent,
      )}
    >
      0{suffix}
    </span>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border bg-background py-20 md:py-24"
    >
      {/* Subtle background tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-transparent to-violet-50/40 dark:from-indigo-950/20 dark:via-transparent dark:to-violet-950/10"
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className={cn(
                "relative flex flex-col items-center gap-1.5 px-4 text-center",
                i > 0 && "lg:border-l lg:border-border",
              )}
            >
              {/* Top accent line */}
              <div
                className={cn(
                  "mb-3 h-[3px] w-10 rounded-full bg-gradient-to-r",
                  stat.accent,
                )}
              />

              {/* Number */}
              <div className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                <Counter
                  to={stat.value}
                  suffix={stat.suffix}
                  accent={stat.accent}
                />
              </div>

              {/* Label */}
              <div className="text-sm font-semibold text-foreground sm:text-base">
                {stat.label}
              </div>

              {/* Description */}
              <p className="max-w-[160px] text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 border-t border-border pt-10 text-center"
        >
          <p className="text-base font-light italic text-muted-foreground sm:text-lg">
            &ldquo;We don&apos;t just write code &mdash; we build products that
            last.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
