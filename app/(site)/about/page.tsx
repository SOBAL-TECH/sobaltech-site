import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/shared/page-header";
import { CTASection } from "@/components/site/cta-section";
import { StatsSection } from "@/components/site/stats-section";
import { AboutStory } from "./about-story";
import { AboutValues } from "./about-values";
import { AboutTeam } from "./about-team";
import type { TeamMember } from "@/types";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "About SobalTech — Our Story & Mission",
  description:
    "Learn about SobalTech's story, mission, and the team behind the products. We're a full-service digital agency passionate about building software that matters.",
};

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
        description="We're a team of engineers, designers, and strategists passionate about building digital products that make a real difference."
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />
      <AboutStory />
      <AboutValues />
      <StatsSection />
      <AboutTeam id="team" members={team} />
      <CTASection />
    </>
  );
}
