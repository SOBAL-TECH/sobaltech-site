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
    name: "Kwame Asante",
    role: "CTO",
    company: "Hubtel",
    avatar: null,
    content:
      "SobalTech built our payment management dashboard in 8 weeks. Clean code, rock-solid uptime, and the engineering quality far exceeded what we expected. Genuinely impressive work.",
    rating: 5,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Abena Boateng",
    role: "Head of Digital",
    company: "Ecobank Ghana",
    avatar: null,
    content:
      "Our mobile banking upgrade was delivered exactly on spec and on budget. The security review they ran was thorough and our compliance team signed off without a single query.",
    rating: 5,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Kofi Mensah",
    role: "Founder & CEO",
    company: "ExpressPay",
    avatar: null,
    content:
      "Finding a Ghanaian tech team that delivers enterprise-grade software is rare. SobalTech did it. Their discovery process alone saved us months of rework and kept our launch on track.",
    rating: 5,
    isFeatured: false,
  },
  {
    id: "4",
    name: "Ama Owusu",
    role: "Product Manager",
    company: "Telecel Ghana",
    avatar: null,
    content:
      "They rebuilt our customer self-service portal in 12 weeks. Customers noticed the difference immediately and our call centre volume dropped significantly. The team was a pleasure to work with.",
    rating: 5,
    isFeatured: false,
  },
  {
    id: "5",
    name: "Yaw Darko",
    role: "VP Engineering",
    company: "GCB Bank",
    avatar: null,
    content:
      "SobalTech handled our entire DevOps migration and cut our release time in half. Zero incidents during cutover. For a bank, that kind of reliability is everything.",
    rating: 5,
    isFeatured: true,
  },
  {
    id: "6",
    name: "Akosua Amponsah",
    role: "Director of Technology",
    company: "Stanbic Bank Ghana",
    avatar: null,
    content:
      "The AI document processing system they built saves our back-office team days of manual work every week. It paid for itself within the first quarter of going live.",
    rating: 5,
    isFeatured: false,
  },
  {
    id: "7",
    name: "Kojo Acheampong",
    role: "Co-Founder",
    company: "Rancard Solutions",
    avatar: null,
    content:
      "Communication was clear, timelines were met, and the handover was seamless. That kind of reliability is hard to find. We are already scoping the next project with them.",
    rating: 5,
    isFeatured: false,
  },
  {
    id: "8",
    name: "Efua Koomson",
    role: "Head of Operations",
    company: "Melcom",
    avatar: null,
    content:
      "We have been on retainer with SobalTech for over a year. They understand our systems as well as we do and they feel like a true extension of the Melcom team.",
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
    <div className="relative flex w-[340px] shrink-0 flex-col gap-4 rounded-lg border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
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
            Trusted by teams across Ghana and Africa
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Don&apos;t take our word for it. Here is what Ghanaian founders,
            CTOs, and product teams have to say about working with us.
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
