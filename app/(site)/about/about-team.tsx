"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BriefcaseBusiness,
  Github,
  Linkedin,
  Network,
  ShieldCheck,
  Twitter,
  Users,
} from "lucide-react";

import type { TeamMember } from "@/types";

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: "t1",
    name: "Samuel Osei Adu",
    role: "Founder and CEO",
    bio: "Leads product strategy and client delivery. Full-stack engineer with a background in fintech and enterprise software.",
    avatar: null,
    email: null,
    linkedIn: null,
    twitter: null,
    github: null,
    order: 0,
    isPublished: true,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "t2",
    name: "Abena Mensah",
    role: "Head of Engineering",
    bio: "Oversees engineering standards, code reviews, and infrastructure. 8 years building scalable systems across Ghana and the UK.",
    avatar: null,
    email: null,
    linkedIn: null,
    twitter: null,
    github: null,
    order: 1,
    isPublished: true,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "t3",
    name: "Kwame Boateng",
    role: "Lead Designer",
    bio: "Creates UI/UX experiences for web and mobile products. Specialises in design systems and user research with Ghanaian and African audiences.",
    avatar: null,
    email: null,
    linkedIn: null,
    twitter: null,
    github: null,
    order: 2,
    isPublished: true,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
  {
    id: "t4",
    name: "Ama Darko",
    role: "Cloud and DevOps Engineer",
    bio: "Manages cloud infrastructure, CI/CD pipelines, and deployment automation. AWS and GCP certified with 5+ years of operations experience.",
    avatar: null,
    email: null,
    linkedIn: null,
    twitter: null,
    github: null,
    order: 3,
    isPublished: true,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  },
];

const DELIVERY_MODEL = [
  {
    Icon: BriefcaseBusiness,
    title: "Technical leadership",
    detail:
      "Hands-on planning, architecture decisions, delivery management and quality control.",
  },
  {
    Icon: Users,
    title: "Specialist collaborators",
    detail:
      "Design, engineering, cloud, cybersecurity and data support are assembled around the project scope.",
  },
  {
    Icon: ShieldCheck,
    title: "Secure delivery process",
    detail:
      "Reviews, access control, release planning and operational checks are part of the delivery workflow.",
  },
  {
    Icon: Network,
    title: "Ongoing support",
    detail:
      "After launch, we can support improvements, monitoring, maintenance and system expansion.",
  },
] as const;

// ─── Avatar fallback ──────────────────────────────────────────────────────────

function AvatarInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 via-violet-500 to-slate-950 text-2xl font-bold text-white">
      {initials}
    </div>
  );
}

// ─── Team card ────────────────────────────────────────────────────────────────

function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
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
      className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200/70 bg-white/72 p-3 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-indigo-400/25"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-indigo-500/14 via-violet-500/10 to-transparent"
      />

      {/* Avatar */}
      <div className="relative mx-auto mt-4 h-24 w-24 overflow-hidden rounded-3xl border border-white/70 bg-muted shadow-[0_18px_40px_rgba(15,23,42,0.16)] ring-4 ring-white/70 dark:border-white/10 dark:ring-white/10">
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
      <div className="relative space-y-4 px-2 pb-3 pt-5 text-center">
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {member.name}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600 dark:text-indigo-400">
            {member.role}
          </p>
        </div>
        {member.bio && (
          <p className="mx-auto line-clamp-3 max-w-[15rem] text-xs leading-relaxed text-muted-foreground">
            {member.bio}
          </p>
        )}

        {/* Social links */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {member.linkedIn && (
            <a
              href={member.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.05] dark:hover:text-indigo-300"
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
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.05] dark:hover:text-indigo-300"
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
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.05] dark:hover:text-indigo-300"
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
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id={id} className="bg-background py-20 scroll-mt-20 md:py-28">
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
            The Ghana team behind your product
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-base">
            A focused team of engineers, designers, and strategists based in
            Accra, delivering world-class digital products for Ghanaian and
            African businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(members.length > 0 ? members : FALLBACK_TEAM).map((member, i) => (
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
            Want to work with the team?{" "}
            <a
              href="/request-quote"
              className="text-primary font-medium hover:underline"
            >
              Start a project conversation →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
