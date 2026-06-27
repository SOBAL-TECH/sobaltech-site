"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

// ─── Placeholder data ─────────────────────────────────────────────────────────

const PLACEHOLDER_TESTIMONIALS: Omit<
  Testimonial,
  "isPublished" | "order" | "createdAt" | "updatedAt"
>[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CTO",
    company: "Nexus AI",
    avatar: null,
    content:
      "SobalTech transformed our MVP into a production-ready platform in 10 weeks. Their engineering quality is exceptional: clean architecture, great test coverage, and zero hand-holding required.",
    rating: 5,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Marcus Rivera",
    role: "Founder & CEO",
    company: "GrowthStack",
    avatar: null,
    content:
      "I've worked with 4 agencies over 8 years. SobalTech is the first one that genuinely understood our business before writing a single line of code. The discovery phase alone saved us months.",
    rating: 5,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Emily Watson",
    role: "Head of Product",
    company: "Cloudify",
    avatar: null,
    content:
      "We needed to rebuild our entire dashboard under a tight deadline. SobalTech delivered on time, on budget, and with better UX than we originally spec'd. Clients love it.",
    rating: 5,
    isFeatured: false,
  },
  {
    id: "4",
    name: "David Park",
    role: "VP Engineering",
    company: "Finleap",
    avatar: null,
    content:
      "Their DevOps team migrated our infrastructure to AWS with zero downtime. The CI/CD pipeline they set up cut our deployment time from 45 minutes to under 4. Outstanding work.",
    rating: 5,
    isFeatured: false,
  },
  {
    id: "5",
    name: "Priya Sharma",
    role: "Director of Digital",
    company: "RetailEdge",
    avatar: null,
    content:
      "SobalTech built our React Native app from scratch in 14 weeks. 4.8 stars on both stores, 60k downloads in the first month. The attention to performance detail was remarkable.",
    rating: 5,
    isFeatured: true,
  },
  {
    id: "6",
    name: "Thomas Müller",
    role: "Co-Founder",
    company: "DataBridge",
    avatar: null,
    content:
      "The AI integration work they did on our analytics dashboard is genuinely impressive. Natural language queries, smart anomaly detection, features I thought were months away, shipped in weeks.",
    rating: 5,
    isFeatured: false,
  },
  {
    id: "7",
    name: "Aisha Johnson",
    role: "Product Manager",
    company: "HealthOS",
    avatar: null,
    content:
      "Communication was excellent throughout the entire engagement. Weekly demos, transparent progress tracking, and they flagged risks before they became problems. Would hire again instantly.",
    rating: 5,
    isFeatured: false,
  },
  {
    id: "8",
    name: "Carlos Mendez",
    role: "CTO",
    company: "TradeFlow",
    avatar: null,
    content:
      "We've been working with SobalTech on a long-term retainer for 2 years. Their team feels like an extension of ours: deep product context, high ownership, consistently great work.",
    rating: 5,
    isFeatured: true,
  },
];

// ─── Avatar colors ────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-950/70 dark:text-violet-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300",
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3 w-3",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-border text-border",
          )}
        />
      ))}
    </div>
  );
}

function AvatarInitials({
  name,
  colorIndex,
}: {
  name: string;
  colorIndex: number;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
        AVATAR_COLORS[colorIndex % AVATAR_COLORS.length],
      )}
    >
      {initials}
    </div>
  );
}

// ─── Testimonial card ─────────────────────────────────────────────────────────

function TestimonialCard({
  item,
  colorIndex,
}: {
  item: (typeof PLACEHOLDER_TESTIMONIALS)[number];
  colorIndex: number;
}) {
  return (
    <div className="relative flex w-[340px] shrink-0 flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Star rating */}
      <StarRating rating={item.rating} />

      {/* Testimonial text */}
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{item.content}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-px bg-border/60" />

      {/* Author */}
      <div className="flex items-center gap-3">
        {item.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.avatar}
            alt={item.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <AvatarInitials name={item.name} colorIndex={colorIndex} />
        )}
        <div>
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">
            {item.role} &middot; {item.company}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Marquee row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  items,
  colorOffset = 0,
  direction = "left",
  speed = 40,
}: {
  items: (typeof PLACEHOLDER_TESTIMONIALS)[number][];
  colorOffset?: number;
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden py-2">
      <motion.div
        className="flex gap-4"
        style={{ width: "max-content" }}
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard
            key={`${item.id}-${i}`}
            item={item}
            colorIndex={(i + colorOffset) % AVATAR_COLORS.length}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({
  testimonials = [],
}: TestimonialsSectionProps) {
  const items =
    testimonials.length > 0 ? testimonials : PLACEHOLDER_TESTIMONIALS;

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const mid = Math.ceil(items.length / 2);
  const row1 = items.slice(0, mid);
  const row2 = items.slice(mid);

  const filledRow1 = row1.length < 4 ? [...row1, ...row1] : row1;
  const filledRow2 = row2.length < 4 ? [...row2, ...row2] : row2;

  return (
    <section className="relative overflow-hidden bg-muted/30 dark:bg-muted/10 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-4 py-1.5 mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
              What clients say
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Trusted by teams worldwide
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Don&apos;t take our word for it. Here&apos;s what the teams
            we&apos;ve shipped with have to say.
          </p>
        </motion.div>
      </div>

      {/* Full-width marquee */}
      <div className="space-y-4">
        <MarqueeRow
          items={filledRow1}
          colorOffset={0}
          direction="left"
          speed={50}
        />
        <MarqueeRow
          items={filledRow2}
          colorOffset={3}
          direction="right"
          speed={45}
        />
      </div>

      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--muted) / 0.3), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{
          background:
            "linear-gradient(to left, hsl(var(--muted) / 0.3), transparent)",
        }}
      />
    </section>
  );
}
