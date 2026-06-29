import Link from "next/link";
import { Star, Quote, ArrowRight, Users, Award, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTASection } from "@/components/site/cta-section";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    id: "1",
    name: "Kwame Asante",
    role: "CTO",
    company: "Hubtel",
    content:
      "SobalTech built our payment management dashboard in 8 weeks. Clean code, rock-solid uptime, and the engineering quality far exceeded what we expected. Genuinely impressive work.",
    rating: 5,
    isFeatured: true,
    service: "Web Development",
  },
  {
    id: "2",
    name: "Abena Boateng",
    role: "Head of Digital",
    company: "Ecobank Ghana",
    content:
      "Our mobile banking upgrade was delivered exactly on spec and on budget. The security review they ran was thorough and our compliance team signed off without a single query.",
    rating: 5,
    isFeatured: true,
    service: "Mobile Apps",
  },
  {
    id: "3",
    name: "Kofi Mensah",
    role: "Founder and CEO",
    company: "ExpressPay",
    content:
      "Finding a Ghanaian tech team that delivers enterprise-grade software is rare. SobalTech did it. Their discovery process alone saved us months of rework and kept our launch on track.",
    rating: 5,
    isFeatured: false,
    service: "AI Integration",
  },
  {
    id: "4",
    name: "Ama Owusu",
    role: "Product Manager",
    company: "Telecel Ghana",
    content:
      "They rebuilt our customer self-service portal in 12 weeks. Customers noticed the difference immediately and our call centre volume dropped significantly. The team was a pleasure to work with.",
    rating: 5,
    isFeatured: false,
    service: "Web Development",
  },
  {
    id: "5",
    name: "Yaw Darko",
    role: "VP Engineering",
    company: "GCB Bank",
    content:
      "SobalTech handled our entire DevOps migration and cut our release time in half. Zero incidents during cutover. For a bank, that kind of reliability is everything.",
    rating: 5,
    isFeatured: true,
    service: "Cloud and DevOps",
  },
  {
    id: "6",
    name: "Akosua Amponsah",
    role: "Director of Technology",
    company: "Stanbic Bank Ghana",
    content:
      "The AI document processing system they built saves our back-office team days of manual work every week. It paid for itself within the first quarter of going live.",
    rating: 5,
    isFeatured: false,
    service: "AI Integration",
  },
  {
    id: "7",
    name: "Kojo Acheampong",
    role: "Co-Founder",
    company: "Rancard Solutions",
    content:
      "Communication was clear, timelines were met, and the handover was seamless. That kind of reliability is hard to find. We are already scoping the next project with them.",
    rating: 5,
    isFeatured: false,
    service: "Web Development",
  },
  {
    id: "8",
    name: "Efua Koomson",
    role: "Head of Operations",
    company: "Melcom",
    content:
      "We have been on retainer with SobalTech for over a year. They understand our systems as well as we do and they feel like a true extension of the Melcom team.",
    rating: 5,
    isFeatured: true,
    service: "Ongoing Retainer",
  },
];

const AVATAR_COLORS = [
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300",
  "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating ? "fill-amber-400 text-amber-400" : "fill-border text-border",
          )}
        />
      ))}
    </div>
  );
}

function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={cn(
      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold",
      AVATAR_COLORS[index % AVATAR_COLORS.length],
    )}>
      {initials}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function TestimonialCard({ t, index, large }: {
  t: (typeof TESTIMONIALS)[number];
  index: number;
  large?: boolean;
}) {
  return (
    <div className={cn(
      "group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md",
      large && "p-7",
    )}>
      {t.isFeatured && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          <Award className="h-2.5 w-2.5" /> Featured
        </span>
      )}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500">
          <Quote className="h-4 w-4" />
        </div>
        <StarRating rating={t.rating} />
      </div>
      <p className={cn(
        "flex-1 text-foreground leading-relaxed",
        large ? "text-[15px]" : "text-sm",
      )}>
        {t.content}
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <Avatar name={t.name} index={index} />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
          <p className="text-xs text-muted-foreground truncate">{t.role}, {t.company}</p>
        </div>
        <span className="ml-auto shrink-0 text-[10px] font-medium text-muted-foreground bg-muted rounded-full px-2 py-0.5">
          {t.service}
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TestimonialsPage() {
  const featured = TESTIMONIALS.filter((t) => t.isFeatured);
  const rest = TESTIMONIALS.filter((t) => !t.isFeatured);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-indigo-50/20 to-transparent dark:from-violet-950/30 dark:via-transparent dark:to-transparent" />
          <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-violet-400/10 blur-[100px] dark:bg-violet-600/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 dark:border-violet-800/40 dark:bg-violet-950/40 px-3 py-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400">Client Stories</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              What our clients say
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Real feedback from Ghanaian founders, CTOs, and product teams who trusted SobalTech to build and ship their products.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: "100%", label: "5-star reviews" },
                { value: `${TESTIMONIALS.length}+`, label: "Client reviews" },
                { value: "4", label: "Featured clients" },
                { value: "2yr+", label: "Longest retainer" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-border bg-card/70 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
            <ThumbsUp className="h-3.5 w-3.5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Featured reviews</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {featured.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} large />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-border" />
      </div>

      {/* All */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <h2 className="text-xl font-bold text-foreground mb-8">More reviews</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {rest.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i + featured.length} />
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col items-center text-center gap-5">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-2xl font-bold text-foreground">
              Every review is 5 stars.
            </p>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              We take quality personally. From the first discovery call to post-launch support, our standard does not change.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:opacity-90 transition-opacity"
              >
                Start your project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                See case studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
