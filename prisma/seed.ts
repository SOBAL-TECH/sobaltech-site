import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin User ───────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("Admin123!", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@sobaltech.com" },
    update: {},
    create: {
      name: "SobalTech Admin",
      email: "admin@sobaltech.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Admin user:", adminUser.email);

  // ─── Services ─────────────────────────────────────────────────────────────
  const services = [
    {
      title: "Web Development",
      slug: "web-development",
      description:
        "We build blazing-fast, scalable web applications using the latest technologies.",
      content: `<h2>Modern Web Development</h2><p>Our team specializes in building high-performance web applications using Next.js, React, and TypeScript. We follow best practices for SEO, accessibility, and performance.</p><h3>What We Deliver</h3><ul><li>Full-stack Next.js applications</li><li>Progressive Web Apps (PWAs)</li><li>E-commerce platforms</li><li>SaaS products</li></ul>`,
      icon: "Globe",
      features: [
        "Next.js & React",
        "TypeScript",
        "Tailwind CSS",
        "REST & GraphQL APIs",
        "SEO optimized",
        "Mobile responsive",
      ],
      order: 1,
    },
    {
      title: "Mobile Apps",
      slug: "mobile-apps",
      description:
        "Native and cross-platform mobile applications that users love.",
      content: `<h2>Mobile App Development</h2><p>We create beautiful, performant mobile applications for iOS and Android using React Native and Expo.</p>`,
      icon: "Smartphone",
      features: [
        "React Native",
        "Expo",
        "iOS & Android",
        "Offline support",
        "Push notifications",
        "App Store deployment",
      ],
      order: 2,
    },
    {
      title: "Cloud & DevOps",
      slug: "cloud-devops",
      description:
        "Scalable cloud infrastructure and automated deployment pipelines.",
      content: `<h2>Cloud & DevOps Solutions</h2><p>We help you build and manage robust cloud infrastructure on AWS, GCP, or Azure.</p>`,
      icon: "Cloud",
      features: [
        "AWS / GCP / Azure",
        "Docker & Kubernetes",
        "CI/CD pipelines",
        "Infrastructure as Code",
        "Monitoring & alerting",
        "Auto-scaling",
      ],
      order: 3,
    },
    {
      title: "UI/UX Design",
      slug: "ui-ux-design",
      description:
        "User-centered design that converts visitors into loyal customers.",
      content: `<h2>UI/UX Design Services</h2><p>We design beautiful, intuitive interfaces backed by user research and data.</p>`,
      icon: "Palette",
      features: [
        "User research",
        "Wireframing",
        "Figma prototypes",
        "Design systems",
        "Usability testing",
        "Brand identity",
      ],
      order: 4,
    },
    {
      title: "API Development",
      slug: "api-development",
      description:
        "Robust, secure, and well-documented APIs that power your applications.",
      content: `<h2>API Development</h2><p>We build RESTful and GraphQL APIs that are fast, secure, and thoroughly documented.</p>`,
      icon: "Code2",
      features: [
        "REST & GraphQL",
        "Node.js / Python",
        "Authentication & auth",
        "Rate limiting",
        "API documentation",
        "Third-party integrations",
      ],
      order: 5,
    },
    {
      title: "AI Integration",
      slug: "ai-integration",
      description:
        "Integrate cutting-edge AI capabilities into your existing products.",
      content: `<h2>AI Integration Services</h2><p>We help you leverage the power of AI by integrating LLMs, computer vision, and ML models into your applications.</p>`,
      icon: "Brain",
      features: [
        "OpenAI / Anthropic",
        "Custom ML models",
        "RAG pipelines",
        "Chatbots & agents",
        "Computer vision",
        "Data analytics",
      ],
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
  console.log(`✅ ${services.length} services seeded`);

  // ─── Products ─────────────────────────────────────────────────────────────
  const products = [
    {
      title: "SobalLaunch",
      slug: "sobal-launch",
      description:
        "A production-ready SaaS foundation with auth, billing, dashboards, onboarding, and admin workflows already wired in.",
      content: `<h2>Launch a SaaS product faster</h2><p>SobalLaunch is our battle-tested SaaS starter for founders and teams who need to validate, launch, and scale without rebuilding the same foundation from scratch.</p><h3>Best for</h3><ul><li>Subscription products</li><li>B2B portals</li><li>Internal tools that may become customer-facing products</li></ul><h3>What we customize</h3><p>We tailor the user journeys, pricing model, brand system, integrations, permissions, and operational dashboards to match your product strategy.</p>`,
      icon: "LayoutDashboard",
      features: [
        "Authentication and role-based access",
        "Billing-ready subscription architecture",
        "Admin dashboard and customer portal",
        "Product analytics foundation",
        "Email and notification workflows",
        "Deployment pipeline and production checklist",
      ],
      price: "From $8,500",
      ctaLabel: "Plan My SaaS",
      ctaHref: "/request-quote",
      order: 1,
      seoTitle: "SobalLaunch SaaS Starter | SobalTech",
      seoDesc: "Launch a custom SaaS product faster with SobalTech's production-ready SaaS foundation.",
    },
    {
      title: "SobalShop",
      slug: "sobal-shop",
      description:
        "A modern commerce platform for catalogues, checkout, inventory, content, and conversion-focused storefronts.",
      content: `<h2>Commerce without the platform drag</h2><p>SobalShop gives growing brands a fast, flexible commerce foundation that can connect to Stripe, Shopify, custom inventory systems, fulfilment providers, and marketing tools.</p><h3>Designed for conversion</h3><p>Every storefront includes performance-focused product pages, clean checkout flows, campaign landing pages, and analytics hooks.</p><h3>Operational control</h3><ul><li>Product catalogue management</li><li>Order and customer workflows</li><li>Promotions and campaign pages</li><li>Integrations with payment and fulfilment providers</li></ul>`,
      icon: "ShoppingCart",
      features: [
        "Headless storefront architecture",
        "Stripe-ready checkout flows",
        "Product catalogue and collections",
        "Inventory and fulfilment integrations",
        "Campaign landing page templates",
        "Conversion and revenue tracking",
      ],
      price: "From $7,500",
      ctaLabel: "Build My Store",
      ctaHref: "/request-quote",
      order: 2,
      seoTitle: "SobalShop Commerce Platform | SobalTech",
      seoDesc: "A customizable commerce platform for modern brands, built for performance and conversion.",
    },
    {
      title: "SobalAnalytics",
      slug: "sobal-analytics",
      description:
        "A real-time analytics and reporting dashboard that turns product, sales, and operations data into decisions.",
      content: `<h2>Make your data usable</h2><p>SobalAnalytics consolidates scattered business data into clear dashboards, executive summaries, and operational alerts.</p><h3>What it connects to</h3><ul><li>Product databases</li><li>CRM and sales tools</li><li>Payment processors</li><li>Marketing platforms</li><li>Custom APIs and spreadsheets</li></ul><h3>Outcome</h3><p>Your team gets one reliable source of truth for the metrics that actually drive decisions.</p>`,
      icon: "BarChart3",
      features: [
        "Real-time KPI dashboards",
        "Custom metric definitions",
        "Scheduled reports",
        "Role-based dashboard access",
        "Data warehouse and API integrations",
        "Anomaly alerts and trend monitoring",
      ],
      price: "From $6,500",
      ctaLabel: "Design My Dashboard",
      ctaHref: "/request-quote",
      order: 3,
      seoTitle: "SobalAnalytics Dashboard | SobalTech",
      seoDesc: "Real-time business dashboards and reporting systems customized for your operations.",
    },
    {
      title: "SobalAdmin",
      slug: "sobal-admin",
      description:
        "A secure internal admin panel for managing users, content, workflows, approvals, and operations.",
      content: `<h2>Give operations a reliable command center</h2><p>SobalAdmin is a customizable internal platform for teams that need to manage business data without living in spreadsheets or raw database tools.</p><h3>Common modules</h3><ul><li>User and permission management</li><li>Content and catalogue management</li><li>Workflow approvals</li><li>Audit trails</li><li>Reports and exports</li></ul><p>We build it around your actual process, not generic dashboard assumptions.</p>`,
      icon: "Package",
      features: [
        "Role-based admin access",
        "CRUD modules for business objects",
        "Approval and review workflows",
        "Audit logs and activity history",
        "CSV imports and exports",
        "Secure production deployment",
      ],
      price: "From $5,500",
      ctaLabel: "Scope My Admin",
      ctaHref: "/request-quote",
      order: 4,
      seoTitle: "SobalAdmin Internal Tools | SobalTech",
      seoDesc: "Custom admin panels and internal tools for teams that need operational control.",
    },
    {
      title: "SobalMobile",
      slug: "sobal-mobile",
      description:
        "A cross-platform mobile starter with authentication, onboarding, API integration, and release workflows.",
      content: `<h2>Mobile apps without restarting from zero</h2><p>SobalMobile is our React Native foundation for teams that need a polished app experience across iOS and Android.</p><h3>Included foundation</h3><ul><li>Onboarding flows</li><li>Authentication</li><li>API client setup</li><li>Push notification readiness</li><li>Release pipeline guidance</li></ul><p>We customize the product experience, brand, screens, and integrations around your user journey.</p>`,
      icon: "Layers",
      features: [
        "React Native and Expo foundation",
        "iOS and Android support",
        "Auth and onboarding flows",
        "API integration patterns",
        "Push notification readiness",
        "App store release support",
      ],
      price: "From $9,500",
      ctaLabel: "Start My App",
      ctaHref: "/request-quote",
      order: 5,
      seoTitle: "SobalMobile App Starter | SobalTech",
      seoDesc: "A customizable React Native mobile app foundation for iOS and Android launches.",
    },
    {
      title: "SobalAI",
      slug: "sobal-ai",
      description:
        "An AI integration framework for chat assistants, knowledge search, document workflows, and internal automation.",
      content: `<h2>Add AI where it creates leverage</h2><p>SobalAI helps teams ship useful AI features without vague demos or fragile prototypes. We focus on grounded workflows: search, summarization, classification, document processing, and assistant interfaces connected to real business data.</p><h3>Typical use cases</h3><ul><li>Customer support assistants</li><li>Internal knowledge search</li><li>Document extraction and review</li><li>Sales and operations automation</li><li>RAG systems over private data</li></ul>`,
      icon: "Bot",
      features: [
        "LLM workflow design",
        "RAG and vector search setup",
        "Private knowledge base integration",
        "Human review and approval flows",
        "Evaluation and monitoring",
        "Security-conscious data handling",
      ],
      price: "From $7,000",
      ctaLabel: "Explore AI Fit",
      ctaHref: "/request-quote",
      order: 6,
      seoTitle: "SobalAI Integration Framework | SobalTech",
      seoDesc: "Custom AI integrations for knowledge search, automation, assistants, and document workflows.",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`✅ ${products.length} products seeded`);

  // ─── Projects ─────────────────────────────────────────────────────────────
  const projects = [
    {
      title: "FinFlow — Banking Dashboard",
      slug: "finflow-banking-dashboard",
      summary: "A real-time banking dashboard with advanced analytics and AI-powered insights.",
      description: `<h2>Project Overview</h2><p>FinFlow needed a secure operational dashboard for finance teams monitoring customer activity, transaction health, compliance queues, and fraud signals in real time.</p><h3>What We Built</h3><ul><li>Role-based dashboards for operations, risk, and leadership teams</li><li>Real-time transaction monitoring with alert thresholds</li><li>Audit-friendly customer and account activity views</li><li>Performance-focused data loading for high-volume accounts</li></ul><h3>Key Achievements</h3><ul><li>99.99% uptime SLA</li><li>40% reduction in customer support tickets</li><li>Real-time fraud review workflow</li></ul>`,
      tags: ["Next.js", "TypeScript", "PostgreSQL", "AWS", "React Native"],
      client: "FinFlow Inc.",
      status: "COMPLETED" as const,
      isFeatured: true,
      order: 1,
    },
    {
      title: "ShopSphere — E-commerce Platform",
      slug: "shopsphere-ecommerce",
      summary: "A headless e-commerce platform handling $2M+ in monthly GMV.",
      description: `<h2>Project Overview</h2><p>ShopSphere outgrew its template storefront and needed a fast, flexible commerce system for product launches, campaigns, inventory, and checkout experiments.</p><h3>What We Built</h3><ul><li>Headless storefront with campaign-ready landing pages</li><li>Stripe checkout and order lifecycle workflows</li><li>Custom content and product management tools</li><li>Analytics events for conversion, retention, and revenue reporting</li></ul><h3>Outcome</h3><p>The new platform supports faster campaign launches, cleaner merchandising workflows, and better visibility into revenue performance.</p>`,
      tags: ["Next.js", "Stripe", "Prisma", "Tailwind", "Vercel"],
      client: "ShopSphere Ltd.",
      status: "COMPLETED" as const,
      isFeatured: true,
      order: 2,
    },
    {
      title: "MediTrack — Healthcare App",
      slug: "meditrack-healthcare",
      summary: "A HIPAA-compliant patient management system used by 200+ clinics.",
      description: `<h2>Project Overview</h2><p>MediTrack needed a secure patient operations platform that could support clinics, appointment workflows, telehealth coordination, and billing visibility.</p><h3>What We Built</h3><ul><li>Patient profile and appointment management</li><li>Clinic staff roles and permission boundaries</li><li>Secure document handling and care notes</li><li>Operational reporting for clinic administrators</li></ul><h3>Outcome</h3><p>The platform helped clinics reduce manual coordination work while giving staff a clearer view of patient activity and care operations.</p>`,
      tags: ["React Native", "Node.js", "PostgreSQL", "HIPAA"],
      client: "MediTrack Health",
      status: "COMPLETED" as const,
      isFeatured: true,
      order: 3,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`✅ ${projects.length} projects seeded`);

  // ─── Testimonials ─────────────────────────────────────────────────────────
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO",
      company: "FinFlow Inc.",
      content: "SobalTech transformed our banking platform. Their attention to performance and security is unmatched. We went from 2-second load times to under 300ms. Incredible team.",
      rating: 5,
      isFeatured: true,
      order: 1,
    },
    {
      name: "Marcus Johnson",
      role: "Founder & CEO",
      company: "ShopSphere",
      content: "Working with SobalTech was the best decision we made. They didn't just build what we asked for — they challenged us to think bigger. Our conversion rate increased by 34%.",
      rating: 5,
      isFeatured: true,
      order: 2,
    },
    {
      name: "Dr. Aisha Patel",
      role: "Product Director",
      company: "MediTrack Health",
      content: "Building a HIPAA-compliant system is complex. SobalTech navigated the compliance requirements expertly while delivering a beautiful, intuitive product. 10/10 would recommend.",
      rating: 5,
      isFeatured: true,
      order: 3,
    },
    {
      name: "Tom Williams",
      role: "VP Engineering",
      company: "TechCorp",
      content: "The API integration work SobalTech did for us was exceptional. Clean code, great documentation, and delivered on time. Our third-party integrations have never been more reliable.",
      rating: 5,
      isFeatured: false,
      order: 4,
    },
    {
      name: "Lisa Park",
      role: "Head of Design",
      company: "CreativeStudio",
      content: "SobalTech's UI/UX team is world-class. They took our vague vision and turned it into a design system that our whole team loves using. The attention to detail is remarkable.",
      rating: 5,
      isFeatured: false,
      order: 5,
    },
    {
      name: "David Okonkwo",
      role: "Co-founder",
      company: "StartupLab",
      content: "As a startup, we needed a partner who understood speed-to-market without sacrificing quality. SobalTech delivered our MVP in 6 weeks. We raised our seed round 2 months later.",
      rating: 5,
      isFeatured: false,
      order: 6,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial }).catch(() => {});
  }
  console.log(`✅ ${testimonials.length} testimonials seeded`);

  // ─── Team Members ──────────────────────────────────────────────────────────
  const team = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      bio: "15+ years of engineering experience at FAANG companies. Passionate about building products that make a difference.",
      linkedIn: "https://linkedin.com",
      twitter: "https://twitter.com",
      order: 1,
    },
    {
      name: "Priya Sharma",
      role: "Lead Designer",
      bio: "Award-winning UX designer with a background in cognitive psychology. Formerly at Figma and Notion.",
      linkedIn: "https://linkedin.com",
      order: 2,
    },
    {
      name: "James Lee",
      role: "Head of Engineering",
      bio: "Full-stack engineer specializing in distributed systems and developer experience. Open source contributor.",
      github: "https://github.com",
      linkedIn: "https://linkedin.com",
      order: 3,
    },
    {
      name: "Sofia Reyes",
      role: "DevOps Lead",
      bio: "Cloud architecture expert with deep expertise in AWS and Kubernetes. Built infrastructure serving 100M+ users.",
      linkedIn: "https://linkedin.com",
      order: 4,
    },
  ];

  for (const member of team) {
    await prisma.teamMember.create({ data: member }).catch(() => {});
  }
  console.log(`✅ ${team.length} team members seeded`);

  // ─── Blog Posts ────────────────────────────────────────────────────────────
  const posts = [
    {
      title: "Why We Always Choose Next.js for Client Projects in 2025",
      slug: "why-we-choose-nextjs-2025",
      excerpt: "After building 50+ production applications, here's why Next.js remains our go-to framework for client projects — and when we choose something else.",
      content: `<h2>The Case for Next.js</h2><p>We've built applications in Vue, Nuxt, Remix, SvelteKit, and React — but Next.js remains our default choice for most client projects. Here's why.</p><h3>Performance by Default</h3><p>Next.js gives you RSC, streaming, automatic code splitting, and edge caching out of the box...</p>`,
      tags: ["Next.js", "React", "Performance", "Architecture"],
      author: "James Lee",
      status: "PUBLISHED" as const,
      isFeatured: true,
      readTime: 8,
      publishedAt: new Date("2025-11-01"),
    },
    {
      title: "Building a Design System from Scratch: Our Process",
      slug: "building-design-system-from-scratch",
      excerpt: "A deep dive into how we built SobalTech's internal design system — the decisions we made, the mistakes we avoided, and what we'd do differently.",
      content: `<h2>Why a Design System?</h2><p>After working on dozens of client projects, we noticed a pattern: the biggest slowdowns weren't technical — they were design-related. Teams spent hours debating button colors and spacing values...</p>`,
      tags: ["Design Systems", "UI/UX", "Figma", "Tailwind"],
      author: "Priya Sharma",
      status: "PUBLISHED" as const,
      isFeatured: false,
      readTime: 12,
      publishedAt: new Date("2025-10-15"),
    },
    {
      title: "The Real Cost of Technical Debt: Lessons from 5 Years of Agency Work",
      slug: "real-cost-technical-debt",
      excerpt: "Technical debt is often discussed in abstract terms. Here's a concrete breakdown of how it cost one of our clients $400k and 8 months of lost time.",
      content: `<h2>A Story About Shortcuts</h2><p>In 2021, a client came to us with an urgent request: they needed to move fast. "We'll clean it up later," they said...</p>`,
      tags: ["Engineering", "Best Practices", "Architecture", "Lessons"],
      author: "Alex Morgan",
      status: "PUBLISHED" as const,
      isFeatured: false,
      readTime: 10,
      publishedAt: new Date("2025-09-28"),
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log(`✅ ${posts.length} blog posts seeded`);

  // ─── Site Settings ─────────────────────────────────────────────────────────
  const settings = [
    // General
    { key: "site_name", value: "SobalTech", type: "text", group: "general", label: "Site Name" },
    { key: "site_tagline", value: "Building the Future, One Line at a Time", type: "text", group: "general", label: "Tagline" },
    { key: "site_description", value: "SobalTech is a full-service digital agency specializing in modern web development, mobile apps, and digital transformation.", type: "textarea", group: "general", label: "Site Description" },
    // Hero
    { key: "hero_headline", value: "We Build Digital Products That Scale", type: "text", group: "hero", label: "Hero Headline" },
    { key: "hero_subheadline", value: "From strategy to launch, SobalTech crafts high-performance web apps, mobile solutions, and cloud infrastructure for ambitious companies.", type: "textarea", group: "hero", label: "Hero Subheadline" },
    { key: "hero_cta_primary", value: "Start Your Project", type: "text", group: "hero", label: "Primary CTA Text" },
    { key: "hero_cta_secondary", value: "View Our Work", type: "text", group: "hero", label: "Secondary CTA Text" },
    // Contact
    { key: "contact_email", value: "hello@sobaltech.com", type: "text", group: "contact", label: "Contact Email" },
    { key: "contact_phone", value: "+1 (555) 000-0000", type: "text", group: "contact", label: "Phone Number" },
    { key: "contact_address", value: "123 Tech Street, San Francisco, CA 94105", type: "text", group: "contact", label: "Address" },
    { key: "social_twitter", value: "https://twitter.com/sobaltech", type: "text", group: "contact", label: "Twitter/X URL" },
    { key: "social_linkedin", value: "https://linkedin.com/company/sobaltech", type: "text", group: "contact", label: "LinkedIn URL" },
    { key: "social_github", value: "https://github.com/sobaltech", type: "text", group: "contact", label: "GitHub URL" },
    // SEO
    { key: "seo_title", value: "SobalTech — Building Digital Excellence", type: "text", group: "seo", label: "Default SEO Title" },
    { key: "seo_description", value: "Full-service digital agency specializing in modern web development, mobile apps, and digital transformation.", type: "textarea", group: "seo", label: "Default SEO Description" },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log(`✅ ${settings.length} site settings seeded`);

  console.log("\n🎉 Seeding complete!");
  console.log("\n📋 Admin credentials:");
  console.log("   Email: admin@sobaltech.com");
  console.log("   Password: Admin123!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
