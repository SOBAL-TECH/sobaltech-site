"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Cloud,
  Code2,
  GraduationCap,
  Layers3,
  Network,
  Palette,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { ServiceVisual } from "@/components/site/service-visual";

const COPY: Record<
  string,
  { eyebrow: string; title: string; Icon: React.ElementType }
> = {
  "web-development": {
    eyebrow: "Web platform frame",
    title: "Dashboard, CMS and customer portal systems",
    Icon: Layers3,
  },
  "mobile-apps": {
    eyebrow: "Mobile product frame",
    title: "iOS and Android app journeys",
    Icon: Smartphone,
  },
  "cloud-devops": {
    eyebrow: "Infrastructure frame",
    title: "Deployments, uptime and release pipelines",
    Icon: Cloud,
  },
  "ui-ux-design": {
    eyebrow: "Product design frame",
    title: "Interfaces, prototypes and design systems",
    Icon: Palette,
  },
  "api-development": {
    eyebrow: "Backend frame",
    title: "APIs, webhooks and integrations",
    Icon: Code2,
  },
  "ai-integration": {
    eyebrow: "AI workflow frame",
    title: "Assistants, search and automation layers",
    Icon: Bot,
  },
  cybersecurity: {
    eyebrow: "Security operations frame",
    title: "Risk, controls and secure delivery reviews",
    Icon: ShieldCheck,
  },
  "penetration-testing": {
    eyebrow: "Security testing frame",
    title: "Findings, evidence and remediation paths",
    Icon: ShieldCheck,
  },
  "network-engineering": {
    eyebrow: "Infrastructure network frame",
    title: "Connectivity, servers and monitoring systems",
    Icon: Network,
  },
  "data-analytics": {
    eyebrow: "Analytics workspace frame",
    title: "Dashboards, reports and operational insights",
    Icon: BarChart3,
  },
  "it-consulting": {
    eyebrow: "Technology advisory frame",
    title: "Roadmaps, systems and delivery decisions",
    Icon: BriefcaseBusiness,
  },
  "it-training": {
    eyebrow: "Team enablement frame",
    title: "Workshops, playbooks and technical mentoring",
    Icon: GraduationCap,
  },
};

export function ServiceHeroArt({ slug }: { slug: string }) {
  const meta = COPY[slug] ?? COPY["web-development"];
  const Icon = meta.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative hidden lg:block"
    >
      <div className="absolute -inset-8 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-950">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">
                {meta.eyebrow}
              </p>
              <p className="mt-0.5 max-w-[260px] text-sm font-semibold text-white">
                {meta.title}
              </p>
            </div>
          </div>
          <Sparkles className="h-4 w-4 text-cyan-200" />
        </div>

        <ServiceVisual slug={slug} className="min-h-[310px]" />
      </div>
    </motion.div>
  );
}
