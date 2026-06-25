import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Code2,
  Globe2,
  HeartHandshake,
  MapPin,
  Palette,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/site/cta-section";

export const metadata: Metadata = {
  title: "Careers | SobalTech",
  description:
    "Join SobalTech and help build high-performance digital products for ambitious companies.",
};

const benefits = [
  {
    icon: Globe2,
    title: "Remote-first work",
    description: "Work from where you do your best work, with async habits that keep teams focused.",
  },
  {
    icon: ShieldCheck,
    title: "Ownership culture",
    description: "You will have real influence over product decisions, technical direction, and delivery quality.",
  },
  {
    icon: Clock3,
    title: "Sustainable pace",
    description: "We plan carefully, communicate clearly, and avoid treating urgency as a management style.",
  },
  {
    icon: HeartHandshake,
    title: "Craft and care",
    description: "We value clean execution, direct feedback, thoughtful collaboration, and durable outcomes.",
  },
];

const roles = [
  {
    title: "Senior Full-Stack Engineer",
    type: "Full-time",
    location: "Remote",
    icon: Code2,
    summary:
      "Build production-grade web apps, SaaS platforms, APIs, and admin systems using Next.js, TypeScript, Prisma, and modern cloud tools.",
    requirements: [
      "Strong TypeScript and React experience",
      "Comfortable owning backend and frontend work",
      "Practical judgment around architecture, security, and delivery tradeoffs",
    ],
  },
  {
    title: "Product Designer",
    type: "Contract / Full-time",
    location: "Remote",
    icon: Palette,
    summary:
      "Design clean, useful interfaces for web apps, mobile products, dashboards, and design systems.",
    requirements: [
      "Strong UX thinking and visual design fundamentals",
      "Experience designing responsive product interfaces",
      "Ability to turn ambiguous requirements into clear flows and prototypes",
    ],
  },
  {
    title: "AI Integration Engineer",
    type: "Project-based",
    location: "Remote",
    icon: Sparkles,
    summary:
      "Help clients integrate AI into real workflows: knowledge search, document automation, assistants, and internal tools.",
    requirements: [
      "Experience with LLM APIs and data workflows",
      "Good understanding of evaluation, retrieval, and reliability risks",
      "Strong product sense around where AI is actually useful",
    ],
  },
];

const process = [
  "Intro call to understand fit and goals",
  "Practical portfolio or technical review",
  "Collaborative working session with the team",
  "Offer, onboarding, and first project alignment",
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers"
        description="Join a focused team building serious digital products for startups, operators, and growing companies."
        breadcrumbs={[{ label: "Careers" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="mailto:hello@sobaltech.com?subject=Careers%20at%20SobalTech">
            <Button className="bg-brand-gradient text-white hover:opacity-90">
              Send Your Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline">Learn About Us</Button>
          </Link>
        </div>
      </PageHeader>

      <Container className="py-16 sm:py-20">
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10">
                <benefit.icon className="h-5 w-5 text-brand-500" />
              </div>
              <h2 className="text-sm font-semibold">{benefit.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <div className="mb-8 max-w-2xl">
            <Badge variant="secondary" className="mb-3 rounded-full">
              Open roles
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Current opportunities
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              These are draft openings for the current site. They can be adjusted as the hiring plan becomes more specific.
            </p>
          </div>

          <div className="space-y-4">
            {roles.map((role) => (
              <article
                key={role.title}
                className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10">
                        <role.icon className="h-5 w-5 text-brand-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">
                          {role.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {role.type}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {role.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      {role.summary}
                    </p>
                  </div>

                  <ul className="space-y-2">
                    {role.requirements.map((requirement) => (
                      <li key={requirement} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                        <span className="text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-3xl border border-border bg-card p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Badge variant="secondary" className="mb-3 rounded-full">
                Hiring process
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight">
                Clear, practical, no theatre.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                The process is designed to understand how you think, communicate, and execute. We prefer practical work samples over abstract puzzles.
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {process.map((step, index) => (
                <li
                  key={step}
                  className="rounded-2xl border border-border bg-background p-4"
                >
                  <span className="text-xs font-bold uppercase tracking-wide text-brand-500">
                    Step {index + 1}
                  </span>
                  <p className="mt-2 text-sm font-medium">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </Container>

      <CTASection />
    </>
  );
}
