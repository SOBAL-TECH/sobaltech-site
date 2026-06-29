import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/site/cta-section";
import { JobApplicationForm } from "@/components/site/job-application-form";
import {
  getPublishedJob,
  getAllPublishedJobSlugs,
} from "@/lib/actions/careers";
import { buildMeta, breadcrumbJsonLd, jobPostingJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const slugs = await getAllPublishedJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublishedJob(slug);
  if (!job) return { title: "Role Not Found" };

  const title = job.seoTitle || `${job.title} | Careers at SobalTech`;
  const description = job.seoDesc || job.summary;
  return buildMeta({ title, description, path: `/careers/${slug}` });
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getPublishedJob(slug);

  if (!job) notFound();

  const isClosed = job.closingDate && new Date(job.closingDate) < new Date();
  const isClosingSoon =
    job.closingDate &&
    !isClosed &&
    new Date(job.closingDate).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jobPostingJsonLd({
              title: job.title,
              description: job.summary,
              url: `/careers/${slug}`,
              department: job.department,
              employmentType: job.type,
              workLocation: job.location,
              datePosted: job.createdAt,
              validThrough: job.closingDate,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Careers", href: "/careers" },
              { name: job.title, href: `/careers/${slug}` },
            ])
          ),
        }}
      />
      {/* Hero */}
      <section className="border-b border-border bg-muted/30 pb-10 pt-28">
        <Container>
          <Link
            href="/careers"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to careers
          </Link>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {job.title}
                </h1>
                {isClosed && (
                  <Badge variant="secondary" className="rounded-full">
                    Closed
                  </Badge>
                )}
                {isClosingSoon && (
                  <Badge variant="destructive" className="rounded-full">
                    Closing soon
                  </Badge>
                )}
              </div>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {job.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  {job.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
                <Badge variant="secondary" className="rounded-full text-xs">
                  {job.department}
                </Badge>
                {job.closingDate && !isClosed && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    Closes {new Date(job.closingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                )}
              </div>
            </div>

            {!isClosed && (
              <a href="#apply">
                <Button size="lg" className="bg-brand-gradient text-white hover:opacity-90 shrink-0">
                  Apply Now
                </Button>
              </a>
            )}
          </div>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.85fr]">
          {/* Left: Job content */}
          <div className="space-y-10">
            {/* Description */}
            <section>
              <h2 className="mb-4 text-xl font-semibold tracking-tight">About the role</h2>
              <div
                className="prose prose-sm prose-slate max-w-none dark:prose-invert leading-relaxed"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </section>

            {/* Responsibilities */}
            {job.responsibilities.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold tracking-tight">
                  What you will do
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Requirements */}
            {job.requirements.length > 0 && (
              <section>
                <h2 className="mb-4 text-xl font-semibold tracking-tight">
                  What we are looking for
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right: Application form */}
          <div>
            <div
              id="apply"
              className="sticky top-28 rounded-lg border border-border bg-card p-6 sm:p-8 scroll-mt-28"
            >
              {isClosed ? (
                <div className="space-y-3 text-center">
                  <p className="text-base font-semibold">This role is now closed.</p>
                  <p className="text-sm text-muted-foreground">
                    Applications are no longer being accepted. Check our other open
                    positions or send a speculative application.
                  </p>
                  <Link href="/careers">
                    <Button variant="outline" className="mt-2">
                      View Open Roles
                    </Button>
                  </Link>
                </div>
              ) : (
                <JobApplicationForm jobId={job.id} />
              )}
            </div>
          </div>
        </div>
      </Container>

      <CTASection />
    </>
  );
}
