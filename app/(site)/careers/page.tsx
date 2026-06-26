import type { Metadata } from "next";
import Link from "next/link";
import { buildMeta } from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Globe2,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/site/cta-section";
import { getPublishedJobPostings } from "@/lib/actions/careers";

export const metadata: Metadata = buildMeta({
  title: "Careers | SobalTech",
  description:
    "Join SobalTech and help build high-performance digital products for ambitious companies.",
  path: "/careers",
});

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

const hiringProcess = [
  "Intro call to understand fit and goals",
  "Practical portfolio or technical review",
  "Collaborative working session with the team",
  "Offer, onboarding, and first project alignment",
];

type JobListing = {
  id: string;
  title: string;
  slug: string;
  department: string;
  type: string;
  location: string;
  summary: string;
  requirements: string[];
  closingDate: Date | null;
};

function JobCard({ job }: { job: JobListing }) {
  const isClosingSoon =
    job.closingDate &&
    new Date(job.closingDate).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000 &&
    new Date(job.closingDate) > new Date();

  return (
    <article className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
        <div>
          <div className="flex flex-wrap items-start gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold tracking-tight">{job.title}</h3>
                {isClosingSoon && (
                  <Badge variant="destructive" className="rounded-full text-[10px]">
                    Closing soon
                  </Badge>
                )}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {job.type}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                <Badge variant="secondary" className="rounded-full px-2 py-0 text-[11px]">
                  {job.department}
                </Badge>
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {job.summary}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {job.requirements.length > 0 && (
            <ul className="space-y-2">
              {job.requirements.slice(0, 3).map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span className="text-muted-foreground">{req}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href={`/careers/${job.slug}`}>
            <Button
              variant="outline"
              size="sm"
              className="group/btn gap-2 transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              View & Apply
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function CareersPage() {
  const jobs = await getPublishedJobPostings();

  return (
    <>
      <PageHeader
        title="Careers"
        description="Join a focused team building serious digital products for startups, operators, and growing companies."
        breadcrumbs={[{ label: "Careers" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#open-roles">
            <Button className="bg-brand-gradient text-white hover:opacity-90">
              See Open Roles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <Link href="/about">
            <Button variant="outline">Learn About Us</Button>
          </Link>
        </div>
      </PageHeader>

      <Container className="py-16 sm:py-20">
        {/* Benefits */}
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

        {/* Open Roles */}
        <section id="open-roles" className="mt-16 scroll-mt-24">
          <div className="mb-8 max-w-2xl">
            <Badge variant="secondary" className="mb-3 rounded-full">
              Open roles
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Current opportunities
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              We hire for craft, ownership, and communication. If you do great work
              and care about how it gets done, we want to hear from you.
            </p>
          </div>

          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
              <p className="text-base font-medium">No open roles right now.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                We are not actively hiring at the moment but we welcome speculative
                applications from exceptional candidates.
              </p>
              <a
                href="mailto:hello@sobaltech.com?subject=Speculative%20Application"
                className="mt-5 inline-block"
              >
                <Button variant="outline" className="gap-2">
                  Send a Speculative Application
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          )}
        </section>

        {/* Hiring Process */}
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
                The process is designed to understand how you think, communicate,
                and execute. We prefer practical work samples over abstract puzzles.
              </p>
            </div>

            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {hiringProcess.map((step, index) => (
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
