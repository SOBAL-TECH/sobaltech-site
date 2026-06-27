"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiFlutter,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiGo,
  SiPhp,
  SiGraphql,
  SiSpringboot,
  SiDjango,
  SiFastapi,
  SiGooglecloud,
  SiDigitalocean,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiTerraform,
  SiOpenai,
  SiTensorflow,
  SiPytorch,
  SiHuggingface,
  SiStripe,
  SiPrisma,
  SiFirebase,
  SiSupabase,
  SiSwift,
  SiKotlin,
  SiGithubactions,
  SiCloudflare,
} from "react-icons/si";
import type { IconType } from "react-icons";

// ─── Tech tools data ──────────────────────────────────────────────────────────

interface TechTool {
  name: string;
  Icon: IconType;
  color: string;
}

const ROW_1: TechTool[] = [
  { name: "HTML5",       Icon: SiHtml5,        color: "#E34F26" },
  { name: "CSS",         Icon: SiCss,          color: "#1572B6" },
  { name: "JavaScript",  Icon: SiJavascript,   color: "#F7DF1E" },
  { name: "TypeScript",  Icon: SiTypescript,   color: "#3178C6" },
  { name: "React",       Icon: SiReact,        color: "#61DAFB" },
  { name: "Next.js",     Icon: SiNextdotjs,    color: "#000000" },
  { name: "Vue.js",      Icon: SiVuedotjs,     color: "#4FC08D" },
  { name: "Tailwind CSS",Icon: SiTailwindcss,  color: "#06B6D4" },
  { name: "Flutter",     Icon: SiFlutter,      color: "#02569B" },
  { name: "Swift",       Icon: SiSwift,        color: "#F05138" },
  { name: "Kotlin",      Icon: SiKotlin,       color: "#7F52FF" },
];

const ROW_2: TechTool[] = [
  { name: "Node.js",     Icon: SiNodedotjs,    color: "#339933" },
  { name: "Java",        Icon: SiOpenjdk,      color: "#ED8B00" },
  { name: "Python",      Icon: SiPython,       color: "#3776AB" },
  { name: "Go",          Icon: SiGo,           color: "#00ADD8" },
  { name: "PHP",         Icon: SiPhp,          color: "#777BB4" },
  { name: "GraphQL",     Icon: SiGraphql,      color: "#E10098" },
  { name: "Spring Boot", Icon: SiSpringboot,   color: "#6DB33F" },
  { name: "Django",      Icon: SiDjango,       color: "#092E20" },
  { name: "FastAPI",     Icon: SiFastapi,      color: "#009688" },
  { name: "Stripe",      Icon: SiStripe,       color: "#635BFF" },
  { name: "Prisma",      Icon: SiPrisma,       color: "#2D3748" },
];

const ROW_3: TechTool[] = [
  { name: "Google Cloud",Icon: SiGooglecloud,  color: "#4285F4" },
  { name: "Cloudflare",  Icon: SiCloudflare,   color: "#F38020" },
  { name: "DigitalOcean",Icon: SiDigitalocean, color: "#0080FF" },
  { name: "Docker",      Icon: SiDocker,       color: "#2496ED" },
  { name: "Kubernetes",  Icon: SiKubernetes,   color: "#326CE5" },
  { name: "PostgreSQL",  Icon: SiPostgresql,   color: "#4169E1" },
  { name: "MongoDB",     Icon: SiMongodb,      color: "#47A248" },
  { name: "Redis",       Icon: SiRedis,        color: "#DC382D" },
  { name: "Firebase",    Icon: SiFirebase,     color: "#FFCA28" },
  { name: "Supabase",    Icon: SiSupabase,     color: "#3ECF8E" },
  { name: "Terraform",   Icon: SiTerraform,    color: "#7B42BC" },
  { name: "CI/CD",       Icon: SiGithubactions,color: "#2088FF" },
  { name: "OpenAI",      Icon: SiOpenai,       color: "#412991" },
  { name: "TensorFlow",  Icon: SiTensorflow,   color: "#FF6F00" },
  { name: "PyTorch",     Icon: SiPytorch,      color: "#EE4C2C" },
  { name: "Hugging Face",Icon: SiHuggingface,  color: "#FFD21E" },
];

// ─── Tech chip ────────────────────────────────────────────────────────────────

function TechChip({ tool }: { tool: TechTool }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <tool.Icon
        style={{ color: tool.color }}
        className="h-5 w-5 shrink-0"
        aria-hidden
      />
      <span className="whitespace-nowrap text-sm font-medium text-foreground">
        {tool.name}
      </span>
    </div>
  );
}

// ─── Marquee row ──────────────────────────────────────────────────────────────

function MarqueeRow({
  tools,
  direction = "left",
  speed = 38,
}: {
  tools: TechTool[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...tools, ...tools];
  return (
    <div className="flex overflow-hidden py-1.5">
      <motion.div
        className="flex gap-3"
        style={{ width: "max-content" }}
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((tool, i) => (
          <TechChip key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function TechStackSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden border-y border-border bg-muted/20 dark:bg-muted/10 py-20 md:py-28">
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-4 py-1.5 mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
              Tech Stack
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Tools we master
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            From frontend to cloud infrastructure, we work across the full
            spectrum of modern technologies.
          </p>
        </motion.div>
      </div>

      {/* Full-width marquee rows */}
      <div className="space-y-3">
        <MarqueeRow tools={ROW_1} direction="left"  speed={40} />
        <MarqueeRow tools={ROW_2} direction="right" speed={35} />
        <MarqueeRow tools={ROW_3} direction="left"  speed={50} />
      </div>

      {/* Edge fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{
          background: "linear-gradient(to right, hsl(var(--background)), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{
          background: "linear-gradient(to left, hsl(var(--background)), transparent)",
        }}
      />
    </section>
  );
}
