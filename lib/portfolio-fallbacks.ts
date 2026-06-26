import type { Project } from "@/types";

const now = new Date("2026-01-01T00:00:00.000Z");

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "fallback-nexus-ai-platform",
    title: "Nexus AI Platform",
    slug: "nexus-ai-platform",
    summary:
      "End-to-end AI analytics platform with real-time dashboards, natural language query interface, and automated anomaly detection for enterprise data teams.",
    description:
      "<h2>Project Overview</h2><p>Nexus AI needed a secure analytics workspace that helped enterprise teams understand operational data without waiting on manual reports.</p><h3>What We Built</h3><ul><li>Natural-language query interface for business metrics</li><li>Real-time dashboards for revenue, usage, and anomaly tracking</li><li>Role-based access for analysts, operators, and executives</li><li>Automated alerts for unusual activity and reporting gaps</li></ul><h3>Outcome</h3><p>The platform gave teams faster access to reliable insights while reducing repetitive analyst work.</p>",
    coverImage: null,
    images: [],
    tags: ["Next.js", "Python", "OpenAI", "PostgreSQL", "AWS"],
    client: "Nexus AI",
    liveUrl: null,
    githubUrl: null,
    status: "COMPLETED",
    isFeatured: true,
    order: 0,
    isPublished: true,
    completedAt: now,
    seoTitle: "Nexus AI Platform | SobalTech Portfolio",
    seoDesc:
      "AI analytics platform case study by SobalTech, covering dashboards, natural-language queries, anomaly detection, and enterprise data workflows.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "fallback-growthstack-dashboard",
    title: "GrowthStack SaaS Dashboard",
    slug: "growthstack-dashboard",
    summary:
      "Full-featured growth analytics SaaS with multi-tenant architecture, custom charting engine, Stripe billing, and team collaboration features.",
    description:
      "<h2>Project Overview</h2><p>GrowthStack needed a scalable SaaS dashboard for subscription businesses tracking acquisition, retention, revenue, and team performance.</p><h3>What We Built</h3><ul><li>Multi-tenant workspace architecture</li><li>Custom analytics charts and saved reports</li><li>Stripe billing, subscriptions, and plan management</li><li>Team permissions, invites, and collaboration workflows</li></ul><h3>Outcome</h3><p>The product shipped with a clean onboarding flow, faster reporting, and infrastructure ready for paid customer growth.</p>",
    coverImage: null,
    images: [],
    tags: ["React", "Node.js", "Stripe", "Redis", "Docker"],
    client: "GrowthStack",
    liveUrl: null,
    githubUrl: null,
    status: "COMPLETED",
    isFeatured: false,
    order: 1,
    isPublished: true,
    completedAt: now,
    seoTitle: "GrowthStack SaaS Dashboard | SobalTech Portfolio",
    seoDesc:
      "SaaS analytics dashboard case study covering multi-tenant architecture, Stripe billing, reporting, and team collaboration.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "fallback-retailedge-mobile",
    title: "RetailEdge Mobile App",
    slug: "retailedge-mobile",
    summary:
      "Cross-platform React Native shopping app with AR product preview, AI-powered recommendations, offline cart, and push notifications.",
    description:
      "<h2>Project Overview</h2><p>RetailEdge wanted a mobile commerce experience that felt native, loaded quickly, and kept shoppers engaged across product discovery and checkout.</p><h3>What We Built</h3><ul><li>React Native app for iOS and Android</li><li>Personalized product recommendations</li><li>Offline cart persistence and push notifications</li><li>Product preview flows and order tracking screens</li></ul><h3>Outcome</h3><p>The app created a smoother path from discovery to purchase while giving the team a maintainable cross-platform codebase.</p>",
    coverImage: null,
    images: [],
    tags: ["React Native", "Expo", "TypeScript", "GraphQL", "Firebase"],
    client: "RetailEdge",
    liveUrl: null,
    githubUrl: null,
    status: "COMPLETED",
    isFeatured: false,
    order: 2,
    isPublished: true,
    completedAt: now,
    seoTitle: "RetailEdge Mobile App | SobalTech Portfolio",
    seoDesc:
      "Mobile commerce app case study covering React Native, recommendations, offline cart, notifications, and product discovery.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "fallback-finleap-cloud-migration",
    title: "Finleap Cloud Migration",
    slug: "finleap-cloud-migration",
    summary:
      "Full AWS migration for a fintech platform: containerized microservices, RDS clusters, zero-downtime deployment pipeline, and compliant infrastructure.",
    description:
      "<h2>Project Overview</h2><p>Finleap needed to modernize its infrastructure without interrupting active customers or weakening compliance controls.</p><h3>What We Built</h3><ul><li>AWS migration plan with staged cutovers</li><li>Containerized services and managed PostgreSQL clusters</li><li>CI/CD pipelines with zero-downtime deployment strategy</li><li>Monitoring, alerting, backups, and access controls</li></ul><h3>Outcome</h3><p>The migration improved deployment reliability, reduced operational risk, and created a stronger foundation for future product growth.</p>",
    coverImage: null,
    images: [],
    tags: ["AWS", "Kubernetes", "Terraform", "Postgres", "CI/CD"],
    client: "Finleap",
    liveUrl: null,
    githubUrl: null,
    status: "COMPLETED",
    isFeatured: false,
    order: 3,
    isPublished: true,
    completedAt: now,
    seoTitle: "Finleap Cloud Migration | SobalTech Portfolio",
    seoDesc:
      "Cloud migration case study covering AWS, Kubernetes, Terraform, PostgreSQL, CI/CD, monitoring, and operational reliability.",
    createdAt: now,
    updatedAt: now,
  },
];

export function getFallbackProject(slug: string) {
  return FALLBACK_PROJECTS.find((project) => project.slug === slug) ?? null;
}
