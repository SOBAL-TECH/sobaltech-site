import type { Metadata } from "next";
import { buildMeta } from "@/lib/seo";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/shared/page-header";
import { CTASection } from "@/components/site/cta-section";
import { StatsSection } from "@/components/site/stats-section";
import { AboutStory } from "./about-story";
import { AboutValues } from "./about-values";
import { AboutTeam } from "./about-team";
import type { TeamMember } from "@/types";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMeta({
  title: "About SobalTech — Our Story & Mission",
  description:
    "Learn about SobalTech, a Ghana-based technology company building software, AI, cloud, cybersecurity, networking, and digital transformation solutions.",
  path: "/about",
});

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getTeam(): Promise<TeamMember[]> {
  try {
    return await prisma.teamMember.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <PageHeader
        title="About SobalTech"
        description="We're a Ghana-based technology company helping businesses design, build, secure, and scale practical digital systems."
        breadcrumbs={[{ label: "About", href: "/about" }]}
      >
        <div className="flex flex-wrap gap-2 pt-2">
          {["Accra, Ghana", "Software + Cloud + Security", "Built for practical business outcomes"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur dark:border-indigo-400/20 dark:bg-white/[0.06] dark:text-indigo-300"
              >
                {item}
              </span>
            ),
          )}
        </div>
      </PageHeader>
      <AboutStory />
      <AboutValues />
      <StatsSection />
      <AboutTeam id="team" members={team} />
      <CTASection />
    </>
  );
}
