"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";

import type { TeamMember } from "@/types";

// ─── Placeholder team ─────────────────────────────────────────────────────────

const PLACEHOLDER_TEAM: Omit<TeamMember, "createdAt" | "updatedAt">[] = [
  {
    id: "1",
    name: "Alex Sobal",
    role: "Founder & CEO",
    bio: "15 years building products at Google and Stripe. Obsessed with developer experience and shipping at scale.",
    avatar: null,
    email: "alex@sobaltech.com",
    linkedIn: "https://linkedin.com",
    twitter: "https://twitter.com",
    github: "https://github.com",
    order: 0,
    isPublished: true,
  },
  {
    id: "2",
    name: "Maria Chen",
    role: "CTO & Co-Founder",
    bio: "Ex-Netflix infrastructure engineer. Builds distributed systems that don't wake you up at 3am.",
    avatar: null,
    email: null,
    linkedIn: "https://linkedin.com",
    twitter: null,
    github: "https://github.com",
    order: 1,
    isPublished: true,
  },
  {
    id: "3",
    name: "James Okafor",
    role: "Head of Design",
    bio: "Design systems architect. Previously led design at two YC companies. Makes complex products feel simple.",
    avatar: null,
    email: null,
    linkedIn: "https://linkedin.com",
    twitter: "https://twitter.com",
    github: null,
    order: 2,
    isPublished: true,
  },
  {
    id: "4",
    name: "Priya Mehta",
    role: "Lead Engineer",
    bio: "Full-stack generalist with a passion for clean APIs and obsessive attention to TypeScript correctness.",
    avatar: null,
    email: null,
    linkedIn: "https://linkedin.com",
    twitter: null,
    github: "https://github.com",
    order: 3,
    isPublished: true,
  },
  {
    id: "5",
    name: "Tom Weber",
    role: "DevOps Lead",
    bio: "Kubernetes wizard. Turns multi-hour deployments into 4-minute pipelines. Zero-downtime migration specialist.",
    avatar: null,
    email: null,
    linkedIn: "https://linkedin.com",
    twitter: null,
    github: "https://github.com",
    order: 4,
    isPublished: true,
  },
  {
    id: "6",
    name: "Sofia Ruiz",
    role: "Product Strategist",
    bio: "Bridges business goals and technical reality. Runs discovery workshops that actually produce useful outputs.",
    avatar: null,
    email: null,
    linkedIn: "https://linkedin.com",
    twitter: "https://twitter.com",
    github: null,
    order: 5,
    isPublished: true,
  },
];

// ─── Avatar fallback ──────────────────────────────────────────────────────────

function AvatarInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-500/15 text-xl font-bold text-brand-400">
      {initials}
    </div>
  );
}

// ─── Team card ────────────────────────────────────────────────────────────────

function TeamCard({
  member,
  index,
}: {
  member: (typeof PLACEHOLDER_TEAM)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Avatar */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {member.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.avatar}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <AvatarInitials name={member.name} />
        )}
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground">{member.name}</h3>
          <p className="text-sm text-primary font-medium">{member.role}</p>
        </div>
        {member.bio && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {member.bio}
          </p>
        )}

        {/* Social links */}
        <div className="flex items-center gap-2 pt-1">
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on Twitter`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

interface AboutTeamProps {
  members: TeamMember[];
  id?: string;
}

export function AboutTeam({ members, id }: AboutTeamProps) {
  const display = members.length > 0 ? members : PLACEHOLDER_TEAM;

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id={id} className="py-20 md:py-28 bg-background scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-4 py-1.5 mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
              The People
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Meet the Team
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-base">
            A group of passionate builders who genuinely care about the work
            they ship and the people they ship it for.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {display.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* Hiring CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Interested in joining?{" "}
            <a
              href="/careers"
              className="text-primary font-medium hover:underline"
            >
              View open positions →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
