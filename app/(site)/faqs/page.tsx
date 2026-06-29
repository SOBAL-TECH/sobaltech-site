"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CTASection } from "@/components/site/cta-section";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "general", label: "General" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Pricing" },
  { id: "technical", label: "Technical" },
  { id: "support", label: "Support" },
];

const FAQS = [
  // General
  {
    category: "general",
    q: "What does SobalTech do?",
    a: "SobalTech is a full-service digital technology company based in Accra, Ghana. We design, build, and maintain web applications, mobile apps, cloud infrastructure, AI integrations, cybersecurity systems, and IT solutions for businesses across Africa and globally.",
  },
  {
    category: "general",
    q: "Where is SobalTech based and do you work with international clients?",
    a: "We are headquartered in Spintex, Accra, Ghana. We work with clients across Africa, Europe, North America, and beyond. All project communication, delivery, and support are handled remotely with structured async workflows and regular video check-ins.",
  },
  {
    category: "general",
    q: "What industries do you serve?",
    a: "We have delivered projects across fintech, healthcare, e-commerce, logistics, SaaS, education, real estate, and retail. Our process is industry-agnostic: we invest time upfront understanding your business before writing a single line of code.",
  },
  {
    category: "general",
    q: "How is SobalTech different from a freelancer or a large agency?",
    a: "Freelancers offer speed but limited bandwidth and accountability. Large agencies offer resources but often slow things down with overhead. SobalTech gives you a focused, senior team with agency-level reliability and startup-level responsiveness. You get a dedicated point of contact, transparent progress tracking, and a team that treats your product as their own.",
  },
  {
    category: "general",
    q: "Can I see examples of your past work?",
    a: "Yes. Visit our Portfolio and Case Studies pages to see selected projects with detailed breakdowns of the problem, what we built, and the outcomes we delivered.",
  },

  // Process
  {
    category: "process",
    q: "What does your project process look like?",
    a: "We follow a five-stage process: Discovery (understanding your goals and constraints), Planning (scope, architecture, and timeline), Design (wireframes, UI systems, and prototypes), Build (iterative development with weekly demos), and Launch (deployment, testing, and handover). Each stage has clear deliverables and sign-off checkpoints.",
  },
  {
    category: "process",
    q: "How do I start a project with SobalTech?",
    a: "Start by submitting a quote request or booking a free 30-minute discovery call. We will review your requirements, ask clarifying questions, and come back with a scoped proposal covering timeline, cost, and recommended approach. There is no obligation to proceed.",
  },
  {
    category: "process",
    q: "How long does a typical project take?",
    a: "It depends on scope. A simple marketing website or landing page typically takes 2 to 4 weeks. A custom web application or mobile app usually takes 8 to 16 weeks. Larger platforms, migrations, or multi-phase builds are planned across milestones. We will give you a realistic timeline in your proposal.",
  },
  {
    category: "process",
    q: "Do you take on small projects or only large builds?",
    a: "We take on both. Whether you need a focused landing page, a code audit, a specific feature addition, or a full product build from scratch, we will scope the engagement accordingly. Minimum engagement size is ₵5,000.",
  },
  {
    category: "process",
    q: "Will I have a dedicated point of contact?",
    a: "Yes. Every project is assigned a project lead who coordinates the team, manages your communication, and owns delivery accountability. You will always know who to contact and where your project stands.",
  },
  {
    category: "process",
    q: "How do you handle feedback and revisions?",
    a: "We build in structured feedback rounds at the end of each sprint or milestone. Minor revisions within the agreed scope are handled without friction. Larger scope changes are discussed, estimated, and added as a formal change request before work begins.",
  },

  // Pricing
  {
    category: "pricing",
    q: "How much does a project cost?",
    a: "Pricing depends entirely on scope, complexity, and timeline. A simple website might start from ₵5,000. A custom SaaS product or mobile app typically starts from ₵25,000. We provide fixed-price proposals after a discovery session so you know exactly what you are committing to before signing.",
  },
  {
    category: "pricing",
    q: "What is your payment structure?",
    a: "We typically work with a deposit of 30 to 50 percent to start, milestone payments tied to delivery stages, and a final balance on project completion and sign-off. For retainer engagements, monthly invoices are issued in advance.",
  },
  {
    category: "pricing",
    q: "Do you offer retainer or ongoing support packages?",
    a: "Yes. After project delivery, many clients move to a monthly retainer for continued development, maintenance, feature additions, and priority support. Retainer rates are agreed upfront and offer better value than ad-hoc work.",
  },
  {
    category: "pricing",
    q: "Are there any hidden fees?",
    a: "No. Our proposals clearly outline all included deliverables and any third-party costs (cloud hosting, API subscriptions, software licences). We will always notify you before incurring costs on your behalf. The only additional charges that can arise are approved change requests.",
  },
  {
    category: "pricing",
    q: "What currency do you invoice in?",
    a: "We invoice in Ghanaian Cedis (₵). All prices, proposals, and payments are in cedis.",
  },

  // Technical
  {
    category: "technical",
    q: "What technologies do you work with?",
    a: "We work across the full modern stack: React, Next.js, Vue.js, TypeScript, Node.js, Python, Java, Go, React Native, Flutter, AWS, Google Cloud, Docker, Kubernetes, PostgreSQL, MongoDB, Redis, and AI/ML tools including OpenAI and Hugging Face. We choose the right tool for the job rather than forcing a single stack on every project.",
  },
  {
    category: "technical",
    q: "Will I own the code and IP after the project?",
    a: "Yes. Upon receipt of final payment, all custom code and intellectual property developed for your project is assigned to you in full. We retain rights only to pre-existing internal tools and libraries (which are licensed to you for use in the project), and any open-source components remain under their respective licences.",
  },
  {
    category: "technical",
    q: "Can you work with our existing codebase?",
    a: "Yes. We regularly take over, extend, and improve existing codebases. We will conduct a code audit at the start of the engagement to understand the current state, identify risks, and plan the work accordingly. There are no extra charges for inheriting technical debt we can work around.",
  },
  {
    category: "technical",
    q: "Do you handle hosting and deployment?",
    a: "We set up and configure your infrastructure and CI/CD pipelines as part of every project. We can manage hosting on your behalf on a retainer, or hand over full control of the infrastructure to your team at the end of the engagement with proper documentation.",
  },
  {
    category: "technical",
    q: "How do you approach security in your builds?",
    a: "Security is a first-class concern on every project. We follow OWASP best practices, implement proper authentication and authorisation, use encrypted connections and storage, and run penetration tests on our own infrastructure. For clients with specific compliance requirements (PCI-DSS, HIPAA, SOC 2), we tailor our approach accordingly.",
  },

  // Support
  {
    category: "support",
    q: "What happens after my project launches?",
    a: "All projects include a 30-day post-launch warranty covering any bugs directly attributable to our work, at no additional cost. After that, clients can move to a support retainer for ongoing maintenance, updates, monitoring, and priority response.",
  },
  {
    category: "support",
    q: "How quickly do you respond to support requests?",
    a: "For retainer clients, critical issues are responded to within 4 business hours. Standard requests are addressed within 1 to 2 business days. For non-retainer clients on the warranty period, response times are within 1 business day.",
  },
  {
    category: "support",
    q: "Can you train our team on the product you build?",
    a: "Yes. We include a handover session with every project covering the admin system, content management, deployment process, and any custom workflows. Deeper training sessions for developers or non-technical staff can be arranged as part of your engagement.",
  },
  {
    category: "support",
    q: "What if I am not happy with the deliverable?",
    a: "We address dissatisfaction at the source. If a deliverable does not match the agreed specification, we fix it at no extra cost within the 30-day warranty. If there is a disagreement about scope, we review the signed SOW together and work out a fair resolution. Our goal is a long-term relationship, not a one-time transaction.",
  },
];

// ─── Item ─────────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn(
      "rounded-xl border border-border bg-card overflow-hidden transition-shadow duration-200",
      open && "shadow-sm"
    )}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-foreground leading-relaxed">{q}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground mt-0.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <div className="h-px bg-border mb-4" />
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-violet-50/20 to-transparent dark:from-indigo-950/30 dark:via-transparent dark:to-transparent" />
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-[100px] dark:bg-indigo-600/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 md:pb-28 md:pt-32 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-3 py-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">FAQs</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Frequently asked questions
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Everything you need to know about working with SobalTech. Can&apos;t find your answer? Reach out directly.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { value: `${FAQS.length}+`, label: "Questions answered" },
                { value: "5", label: "Categories" },
                { value: "24h", label: "Response time" },
                { value: "Free", label: "Discovery call" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-border bg-card/70 p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">

          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">Categories</p>
                <nav className="space-y-1">
                  {CATEGORIES.map(({ id, label }) => {
                    const count = id === "all" ? FAQS.length : FAQS.filter((f) => f.category === id).length;
                    const isActive = activeCategory === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setActiveCategory(id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <span>{label}</span>
                        <span className={cn(
                          "text-xs rounded-full px-1.5 py-0.5 font-medium",
                          isActive ? "bg-indigo-500 text-white" : "bg-muted text-muted-foreground"
                        )}>{count}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 dark:border-indigo-800/40 dark:bg-indigo-950/20 p-4">
                <p className="text-sm font-semibold text-foreground mb-1">Still have questions?</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Book a free 30-minute call and we will answer everything.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Get in touch <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* FAQ list */}
          <main className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-6">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> questions
              {activeCategory !== "all" && (
                <> in <span className="font-semibold text-foreground capitalize">{activeCategory}</span></>
              )}
            </p>
            <div className="space-y-3">
              {filtered.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} />
              ))}
            </div>
          </main>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
