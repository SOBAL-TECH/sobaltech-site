import type { Project } from "@/types";

const now = new Date("2026-01-01T00:00:00.000Z");

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "fallback-nexus-ai-platform",
    title: "Nexus AI Platform",
    slug: "nexus-ai-platform",
    summary:
      "End-to-end AI analytics platform with real-time dashboards, natural language query interface, and automated anomaly detection for enterprise data teams.",
    description: `
      <h2>The Challenge</h2>
      <p>Nexus AI's enterprise clients were spending hours every week waiting on manually compiled reports. Analysts were buried in repetitive data tasks rather than delivering insights. The existing tooling was a patchwork of spreadsheets and disconnected dashboards that required constant maintenance and broke down under load.</p>

      <h2>What We Built</h2>
      <p>We built a secure, multi-role analytics workspace from scratch. The centrepiece was a natural-language query interface powered by OpenAI that let business teams ask questions about their data in plain English and receive structured, visualised answers in seconds.</p>
      <ul>
        <li>Natural-language query interface built on OpenAI and a custom semantic layer</li>
        <li>Real-time dashboards for revenue, usage, and operational metrics with WebSocket updates</li>
        <li>Role-based access control for analysts, operators, and executives</li>
        <li>Automated anomaly detection monitoring 12 operational metric streams</li>
        <li>Scheduled digest emails and Slack alert integrations</li>
      </ul>

      <h2>Technical Approach</h2>
      <p>The frontend was built with Next.js and TypeScript for type safety and server-side rendering. Data was stored in PostgreSQL with carefully designed indexes to support sub-200ms query responses at the P99. The AI layer used a retrieval-augmented architecture to ground LLM outputs in real schema definitions, preventing hallucination on business metrics.</p>

      <h2>The Outcome</h2>
      <p>The platform shipped to production in 10 weeks from kickoff. Report turnaround dropped from hours to seconds. Analyst time on repetitive data pulls fell by over 60 percent. Nexus AI brought the product to their first paying enterprise customer within 3 weeks of launch.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&auto=format&fit=crop&q=80",
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
    description: `
      <h2>The Challenge</h2>
      <p>GrowthStack was tracking subscription business metrics across disconnected tools. Customer-facing reporting was slow, billing logic was brittle, and the codebase was a single monolith that made adding new features risky. They needed a scalable SaaS product they could sell to paying customers with confidence.</p>

      <h2>What We Built</h2>
      <p>We designed and built a multi-tenant SaaS dashboard from the ground up, with complete data isolation between customer workspaces. The architecture was built to support hundreds of tenants without performance degradation.</p>
      <ul>
        <li>Multi-tenant workspace architecture with row-level security in PostgreSQL</li>
        <li>Custom charting engine with 8 chart types and saved report functionality</li>
        <li>Stripe billing supporting 3 subscription tiers and annual plans</li>
        <li>Team permissions, member invites, and audit log</li>
        <li>Redis caching layer for sub-100ms dashboard load time</li>
      </ul>

      <h2>Technical Approach</h2>
      <p>The React frontend was paired with a Node.js API layer and a Redis caching strategy that ensured dashboard loads felt instant even on large datasets. Stripe webhooks handled all billing state transitions, and we built a comprehensive test suite covering billing edge cases that had caused production incidents at prior agencies GrowthStack had worked with.</p>

      <h2>The Outcome</h2>
      <p>The product launched 2 weeks ahead of schedule. GrowthStack closed their first 3 paying customers in the month of launch. The team went from manual report exports to a product their customers said was genuinely better than the incumbents they had used before.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&auto=format&fit=crop&q=80",
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
      "Cross-platform React Native shopping app with AI-powered recommendations, offline cart, and push notifications. 4.8 stars on both stores, 60k downloads in month one.",
    description: `
      <h2>The Challenge</h2>
      <p>RetailEdge's mobile commerce experience was built on an outdated native iOS codebase with no Android counterpart. The app was slow, visually dated, and expensive to maintain across two separate engineering tracks. They were losing shoppers to faster, better-designed competitors.</p>

      <h2>What We Built</h2>
      <p>We rebuilt the entire app using React Native and Expo, delivering a single codebase for both platforms. Performance was the primary design constraint from day one: every screen had a target of under 300ms time-to-interactive, and we hit it.</p>
      <ul>
        <li>React Native app for iOS and Android from a single TypeScript codebase</li>
        <li>AI-powered product recommendations via GraphQL API and Firebase ML</li>
        <li>Offline cart persistence using AsyncStorage with sync-on-reconnect</li>
        <li>Push notification system for price drops, restocks, and order updates</li>
        <li>End-to-end order tracking from checkout to delivery</li>
      </ul>

      <h2>Technical Approach</h2>
      <p>Instant skeleton screens, optimistic UI updates, and aggressive asset preloading made the app feel native from first open. The GraphQL API layer served both the mobile app and the web storefront, reducing backend duplication. We worked with the App Store and Google Play submission processes end-to-end, handling all certification requirements.</p>

      <h2>The Outcome</h2>
      <p>60,000 downloads in the first month post-launch. 4.8-star rating on both the App Store and Google Play. Checkout conversion improved 28 percent versus the old app. The engineering team now maintains a single codebase instead of two, cutting mobile overhead by more than half.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&auto=format&fit=crop&q=80",
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
      "Full AWS migration for a live fintech platform: containerized microservices, managed PostgreSQL clusters, zero-downtime deployment pipeline, and SOC 2 compliant infrastructure.",
    description: `
      <h2>The Challenge</h2>
      <p>Finleap was running a live fintech platform on aging bare-metal infrastructure with manual deployments and no disaster recovery plan. Their team spent 30 percent of engineering time on infrastructure maintenance. Tightening compliance requirements meant the existing setup could not pass an audit.</p>

      <h2>What We Built</h2>
      <p>We designed a phased AWS migration strategy that moved services over without any customer-facing downtime. Every decision prioritised compliance, reliability, and the ability for Finleap's team to own and operate the infrastructure after handover.</p>
      <ul>
        <li>Phased migration plan with staged cutovers and rollback procedures at each step</li>
        <li>Docker-containerised services orchestrated with Kubernetes on EKS</li>
        <li>100 percent infrastructure-as-code via Terraform with state in S3</li>
        <li>CI/CD pipeline with automated test gates, rolling deployments, and one-click rollback</li>
        <li>Managed PostgreSQL clusters with automated daily backups and tested restore procedures</li>
        <li>CloudWatch monitoring, PagerDuty alerting, and access control audit trail</li>
      </ul>

      <h2>Technical Approach</h2>
      <p>We introduced the changes incrementally, running old and new infrastructure in parallel during each phase cutover. This let us validate each service in production before decommissioning the legacy stack. The Terraform modules we wrote were designed to be understood by a junior engineer, with clear naming conventions and inline documentation for every non-obvious configuration decision.</p>

      <h2>The Outcome</h2>
      <p>Zero minutes of customer-facing downtime across the full migration. Deployment time cut from 45 minutes to under 4 minutes. Finleap passed their subsequent SOC 2 Type II audit with no findings related to infrastructure. Engineering time on infrastructure maintenance dropped from 30 percent to under 5 percent.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&auto=format&fit=crop&q=80",
    images: [],
    tags: ["AWS", "Kubernetes", "Terraform", "PostgreSQL", "CI/CD"],
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
  {
    id: "fallback-healthos-patient-portal",
    title: "HealthOS Patient Portal",
    slug: "healthos-patient-portal",
    summary:
      "HIPAA-compliant patient portal with online appointment booking, secure messaging, EHR integration, and automated reminders. 40k active patients in 3 months.",
    description: `
      <h2>The Challenge</h2>
      <p>HealthOS's clinic network was managing patient appointments via phone and paper forms. No-show rates were high, staff were overwhelmed with manual scheduling calls, and there was no way for patients to securely message their care team between visits. Any solution needed to meet HIPAA requirements from day one.</p>

      <h2>What We Built</h2>
      <p>We built a patient-facing web portal and a clinic-facing admin dashboard, both integrated with the existing EHR system via HL7 FHIR APIs. Compliance was a first-class concern, not an afterthought.</p>
      <ul>
        <li>Patient registration, login, and identity verification flow</li>
        <li>Real-time appointment booking with provider availability calendar</li>
        <li>Automated appointment reminders via SMS and email with configurable lead times</li>
        <li>HIPAA-compliant secure messaging between patients and care team</li>
        <li>Bidirectional HL7 FHIR integration with the existing EHR</li>
        <li>Clinic admin dashboard for managing providers, availability, and patient records</li>
      </ul>

      <h2>Technical Approach</h2>
      <p>All data at rest was encrypted with AES-256. All data in transit used TLS 1.3. PHI was stored in a segregated PostgreSQL database with audit logging on every access. We contracted a third-party security firm to run a penetration test before launch, addressing all findings before go-live. The FHIR integration layer was built with a retry queue and idempotent operations to handle the inconsistencies common in healthcare system APIs.</p>

      <h2>The Outcome</h2>
      <p>40,000 active patients onboarded within 3 months of launch. Appointment no-show rate dropped 35 percent due to automated reminders. Scheduling call volume reduced by over 50 percent. The system passed a HIPAA technical safeguards audit with no corrective action required.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&auto=format&fit=crop&q=80",
    images: [],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "AWS"],
    client: "HealthOS",
    liveUrl: null,
    githubUrl: null,
    status: "COMPLETED",
    isFeatured: true,
    order: 4,
    isPublished: true,
    completedAt: now,
    seoTitle: "HealthOS Patient Portal | SobalTech Portfolio",
    seoDesc:
      "HIPAA-compliant patient portal case study covering appointment booking, EHR integration, secure messaging, and healthcare compliance.",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "fallback-tradeflow-logistics",
    title: "TradeFlow Logistics Platform",
    slug: "tradeflow-logistics",
    summary:
      "Real-time logistics management platform with live fleet tracking, dynamic route optimisation, automated invoicing, and carrier performance analytics across 200 active vehicles.",
    description: `
      <h2>The Challenge</h2>
      <p>TradeFlow was coordinating a fleet of 200 vehicles and dozens of carriers using WhatsApp threads, shared spreadsheets, and manual invoice generation. Dispatch decisions were based on outdated information, invoice disputes took weeks to resolve, and there was no visibility into carrier performance over time.</p>

      <h2>What We Built</h2>
      <p>We built a logistics command centre that gave TradeFlow's dispatch team real-time visibility into every vehicle and every shipment, while automating the most time-consuming back-office workflows.</p>
      <ul>
        <li>Real-time fleet tracking map with WebSocket updates from GPS hardware</li>
        <li>Dynamic route optimisation engine using Google Maps Platform APIs</li>
        <li>Automated proof-of-delivery capture via mobile web app for drivers</li>
        <li>Automated invoice generation and PDF dispatch on delivery confirmation</li>
        <li>Carrier performance dashboard with on-time, damage, and dispute rate metrics</li>
        <li>Customer-facing shipment tracking portal with ETA estimates</li>
      </ul>

      <h2>Technical Approach</h2>
      <p>The real-time map was built with Mapbox GL and a Socket.io event bus that pushed GPS updates to the browser in under 2 seconds from hardware ping. MongoDB was used for shipment event storage given the high write volume and flexible schema needs. The invoice automation module reduced what previously took 40 minutes per invoice to under 10 seconds.</p>

      <h2>The Outcome</h2>
      <p>200 active vehicles tracked in real time from day one. Invoice processing time reduced by 80 percent. Carrier dispute resolution dropped from weeks to days thanks to GPS-backed proof of delivery. Customer satisfaction scores improved significantly due to the self-serve tracking portal reducing inbound enquiries by 60 percent.</p>
    `,
    coverImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=600&auto=format&fit=crop&q=80",
    images: [],
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "Google Cloud"],
    client: "TradeFlow",
    liveUrl: null,
    githubUrl: null,
    status: "COMPLETED",
    isFeatured: false,
    order: 5,
    isPublished: true,
    completedAt: now,
    seoTitle: "TradeFlow Logistics Platform | SobalTech Portfolio",
    seoDesc:
      "Logistics platform case study covering real-time fleet tracking, route optimisation, automated invoicing, and carrier analytics.",
    createdAt: now,
    updatedAt: now,
  },
];

export function getFallbackProject(slug: string) {
  return FALLBACK_PROJECTS.find((project) => project.slug === slug) ?? null;
}
