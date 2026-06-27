"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Monitor,
  Lightbulb,
  CreditCard,
  Briefcase,
  EyeOff,
  ShieldAlert,
  Scale,
  UserCheck,
  Globe,
  Link2,
  RefreshCw,
  Mail,
  CheckCircle2,
  Info,
  AlertCircle,
  Clock,
  Banknote,
  Lock,
  Sparkles,
} from "lucide-react";

const LAST_UPDATED = "June 26, 2025";
const EFFECTIVE_DATE = "June 26, 2025";

// ─── Table of contents ────────────────────────────────────────────────────────

const TOC = [
  { id: "services",     label: "Our Services",                 icon: Sparkles },
  { id: "use",          label: "Website Use & Conduct",        icon: Monitor },
  { id: "ip",           label: "Intellectual Property",        icon: Lightbulb },
  { id: "payments",     label: "Payments & Fees",              icon: CreditCard },
  { id: "engagement",   label: "Project Engagement",           icon: Briefcase },
  { id: "confidential", label: "Confidentiality",              icon: EyeOff },
  { id: "warranties",   label: "Warranties & Disclaimers",     icon: ShieldAlert },
  { id: "liability",    label: "Limitation of Liability",      icon: Scale },
  { id: "indemnity",    label: "Indemnification",              icon: UserCheck },
  { id: "third-party",  label: "Third-Party Services",         icon: Link2 },
  { id: "privacy",      label: "Privacy",                      icon: Lock },
  { id: "governing",    label: "Governing Law & Disputes",     icon: Globe },
  { id: "changes",      label: "Changes to These Terms",       icon: RefreshCw },
  { id: "general",      label: "General Provisions",           icon: FileText },
  { id: "contact",      label: "Contact",                      icon: Mail },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionNumber({ n }: { n: number }) {
  return (
    <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-sm font-bold shadow-sm">
      {String(n).padStart(2, "0")}
    </div>
  );
}

function Callout({
  variant = "info",
  children,
}: {
  variant?: "info" | "warning" | "important";
  children: React.ReactNode;
}) {
  const styles = {
    info: {
      wrap: "border-indigo-200 bg-indigo-50/60 dark:border-indigo-800/40 dark:bg-indigo-950/30",
      icon: <Info className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />,
      text: "text-indigo-900 dark:text-indigo-200",
    },
    warning: {
      wrap: "border-amber-200 bg-amber-50/60 dark:border-amber-800/40 dark:bg-amber-950/30",
      icon: <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
      text: "text-amber-900 dark:text-amber-200",
    },
    important: {
      wrap: "border-rose-200 bg-rose-50/60 dark:border-rose-800/40 dark:bg-rose-950/30",
      icon: <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />,
      text: "text-rose-900 dark:text-rose-200",
    },
  }[variant];
  return (
    <div className={`flex items-start gap-3 rounded-xl border p-4 ${styles.wrap}`}>
      {styles.icon}
      <p className={`text-sm leading-relaxed ${styles.text}`}>{children}</p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionDivider() {
  return <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-10" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 },
    );
    TOC.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-indigo-50/30 to-transparent dark:from-violet-950/30 dark:via-indigo-950/10 dark:to-transparent" />
          <div className="absolute left-1/3 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-400/10 blur-[120px] dark:bg-violet-600/10" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 dark:border-violet-800/40 dark:bg-violet-950/40 px-3 py-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400">
                  Legal
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              These terms govern your use of the SobalTech website and any services we provide.
              Please read them carefully before engaging us. They protect both you and us and ensure
              every engagement is transparent and clearly defined.
            </p>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { label: "Last updated", value: LAST_UPDATED },
                { label: "Effective date", value: EFFECTIVE_DATE },
                { label: "Governing law", value: "Republic of Ghana" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
                  <span className="text-xs text-muted-foreground">{label}:</span>
                  <span className="text-xs font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>

            {/* Quick facts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { value: "15", label: "Sections covered" },
                { value: "30 days", label: "Cancellation notice" },
                { value: "30 days", label: "Bug fix warranty" },
                { value: "14 days", label: "Payment terms" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-border bg-card/70 p-4 text-center">
                  <p className="text-xl font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>

            <Callout variant="info">
              By accessing sobaltech.com or engaging our services, you agree to these Terms in full.
              If you do not agree, please discontinue use immediately. For questions, email{" "}
              <a href="mailto:legal@sobaltech.com" className="font-semibold underline underline-offset-2">legal@sobaltech.com</a>.
            </Callout>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

          {/* ── Sidebar TOC ── */}
          <aside className="lg:w-64 xl:w-72 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
                  On this page
                </p>
                <nav className="space-y-1">
                  {TOC.map(({ id, label }, i) => {
                    const isActive = activeId === id;
                    return (
                      <a
                        key={id}
                        href={`#${id}`}
                        className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors group ${
                          isActive
                            ? "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold transition-colors ${
                          isActive
                            ? "bg-violet-500 text-white"
                            : "bg-muted/70 text-muted-foreground group-hover:bg-violet-100 group-hover:text-violet-600 dark:group-hover:bg-violet-950/50 dark:group-hover:text-violet-400"
                        }`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate">{label}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Contact card */}
              <div className="rounded-2xl border border-violet-200 bg-violet-50/60 dark:border-violet-800/40 dark:bg-violet-950/20 p-5">
                <p className="text-sm font-semibold text-foreground mb-1.5">Legal questions?</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Our legal team is happy to clarify any aspect of these terms before you engage us.
                </p>
                <a
                  href="mailto:legal@sobaltech.com"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" />
                  legal@sobaltech.com
                </a>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">

            {/* Section 1 — Our Services */}
            <section id="services" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={1} />
                <h2 className="text-2xl font-bold text-foreground">Our Services</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                SobalTech is a full-service digital technology company headquartered in Accra, Ghana.
                We provide end-to-end technology solutions to businesses across Africa and globally.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {[
                  "Web Application Development (front-end, back-end, full-stack)",
                  "Mobile App Development (iOS, Android, cross-platform)",
                  "Cloud Infrastructure & DevOps Engineering",
                  "UI/UX Design and Product Strategy",
                  "API Development and Systems Integration",
                  "AI & Machine Learning Integration",
                  "Cybersecurity & Penetration Testing",
                  "Network Engineering & IT Infrastructure",
                  "Data Analytics and Business Intelligence",
                  "IT Training and Technical Workshops",
                  "Technical Consulting and Advisory",
                  "Code Audits and Architecture Reviews",
                ].map((s) => (
                  <div key={s} className="flex items-start gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-violet-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground leading-relaxed">{s}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Callout variant="info">
                  Submitting a quote request or making an inquiry does not create a binding contract.
                  A contract is only formed upon execution of a written Statement of Work (SOW) or
                  equivalent project agreement signed by both parties.
                </Callout>
              </div>
            </section>

            <SectionDivider />

            {/* Section 2 — Website Use */}
            <section id="use" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={2} />
                <h2 className="text-2xl font-bold text-foreground">Website Use & Conduct</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                You may use sobaltech.com for lawful purposes in accordance with these Terms. We
                reserve the right to restrict or terminate access for conduct that violates these
                rules or applicable law.
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Prohibited conduct</h3>
                  <BulletList items={[
                    "Using the site in any way that violates applicable local, national, or international law or regulation.",
                    "Transmitting unsolicited commercial communications (spam), phishing attempts, or deceptive content.",
                    "Attempting to gain unauthorised access to any part of our website, servers, databases, or connected systems.",
                    "Introducing or distributing malware, ransomware, viruses, trojans, worms, or any other harmful code.",
                    "Scraping, crawling, or systematically copying content from this website for commercial use without written permission.",
                    "Impersonating SobalTech, our staff, partners, or other users in any communication.",
                    "Interfering with or disrupting the integrity or performance of the website or its underlying infrastructure.",
                  ]} />
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Authorised account access</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Certain areas (such as the client portal or admin system) are restricted to
                    authorised personnel. If you are provided with login credentials:
                  </p>
                  <BulletList items={[
                    "You are solely responsible for maintaining the confidentiality of your credentials.",
                    "You are responsible for all activity conducted under your account.",
                    "You must notify us immediately at hello@sobaltech.com if you suspect any unauthorised access.",
                    "You must not share credentials with any third party without prior written consent.",
                  ]} />
                </div>
              </div>
            </section>

            <SectionDivider />

            {/* Section 3 — IP */}
            <section id="ip" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={3} />
                <h2 className="text-2xl font-bold text-foreground">Intellectual Property</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">SobalTech Website Content</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    All content on this website, including text, graphics, logos, illustrations,
                    code, design systems, and software, is the property of SobalTech or its
                    licensors and is protected by Ghanaian and international intellectual property
                    laws. No content may be reproduced, distributed, modified, or used commercially
                    without our prior written permission.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Client Deliverables</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Upon receipt of full payment for a completed project, SobalTech assigns to the
                    client all intellectual property rights in the custom-developed deliverables
                    specified in the SOW. The following are explicitly <strong className="text-foreground">excluded</strong> from this assignment:
                  </p>
                  <BulletList items={[
                    "Pre-existing SobalTech tools, frameworks, internal libraries, and reusable components ('Background IP'): these are licensed, not transferred, for use within the delivered project only.",
                    "Open-source software components, which remain subject to their respective open-source licences.",
                    "Third-party assets, fonts, stock imagery, or licensed software incorporated into the deliverables.",
                  ]} />
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Portfolio Rights</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Unless the SOW explicitly restricts it, SobalTech reserves the right to reference,
                    describe, and display completed work in its portfolio, case studies, website,
                    social media, and marketing materials. We will not disclose confidential business
                    information or client data when doing so.
                  </p>
                </div>
              </div>
            </section>

            <SectionDivider />

            {/* Section 4 — Payments */}
            <section id="payments" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={4} />
                <h2 className="text-2xl font-bold text-foreground">Payments & Fees</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                All fees are agreed in advance in the applicable SOW. We believe in transparent,
                no-surprise pricing. Below are the payment terms that apply to all engagements
                unless otherwise negotiated.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Banknote, title: "Currency", desc: "All fees are stated in Ghanaian Cedis (₵) unless the SOW explicitly specifies a different currency for international clients." },
                  { icon: Clock, title: "Payment Due", desc: "Invoices are due within 14 calendar days of the invoice date unless an alternative schedule is agreed in the SOW." },
                  { icon: AlertCircle, title: "Late Payment", desc: "Overdue invoices accrue interest at 2% per month from the due date until paid in full, compounded monthly." },
                  { icon: Lock, title: "Withholding Rights", desc: "SobalTech may suspend work, withhold access to deliverables, or pause deployment until all outstanding amounts are settled." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-4 flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-950/50">
                      <Icon className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Typical payment schedule</h3>
                <div className="space-y-3">
                  {[
                    { phase: "Deposit", amount: "30 to 50%", timing: "Due before project commencement." },
                    { phase: "Milestone payments", amount: "As agreed", timing: "Tied to specific delivery milestones defined in the SOW." },
                    { phase: "Final payment", amount: "Remaining balance", timing: "Due upon final delivery and sign-off, before handover or live deployment." },
                  ].map(({ phase, amount, timing }) => (
                    <div key={phase} className="flex items-start gap-4">
                      <div className="shrink-0 min-w-[100px] rounded-lg bg-muted px-2.5 py-1.5 text-center">
                        <p className="text-xs font-bold text-foreground">{amount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{phase}</p>
                        <p className="text-xs text-muted-foreground">{timing}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <Callout variant="info">
                  All fees are exclusive of applicable taxes (VAT, GCT, withholding tax) unless
                  explicitly stated otherwise. Taxes will be itemised on invoices as required by
                  Ghanaian law.
                </Callout>
              </div>
            </section>

            <SectionDivider />

            {/* Section 5 — Engagement */}
            <section id="engagement" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={5} />
                <h2 className="text-2xl font-bold text-foreground">Project Engagement</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Client Responsibilities</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    A successful engagement requires collaboration. Clients agree to:
                  </p>
                  <BulletList items={[
                    "Provide timely feedback, approvals, content, and access to third-party systems as required.",
                    "Assign a designated point of contact who has authority to make project decisions.",
                    "Review and respond to deliverables within the timescales agreed in the SOW.",
                    "Inform SobalTech promptly of any changes to project requirements, budget, or deadlines.",
                  ]} />
                  <div className="mt-3">
                    <Callout variant="warning">
                      Delays caused by client inaction, including late approvals, unavailable assets,
                      or lack of access, may result in revised timelines and additional fees for time
                      spent waiting or rescheduling.
                    </Callout>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Change Requests</h3>
                  <BulletList items={[
                    "All scope changes after project commencement must be agreed in writing before work begins.",
                    "SobalTech will provide a written estimate of additional time and cost for any change request.",
                    "Minor clarifications within the spirit of the original brief do not require a formal change request.",
                  ]} />
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Bug Fix Warranty</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    SobalTech provides a <strong className="text-foreground">30-day post-delivery warranty</strong> on
                    all custom development work. Defects that are directly attributable to SobalTech&rsquo;s
                    workmanship and are reported within this window will be rectified at no additional charge.
                    This warranty does not cover:
                  </p>
                  <BulletList items={[
                    "Issues arising from client-made modifications after handover.",
                    "Third-party service outages or API changes.",
                    "Issues caused by the client's hosting environment or infrastructure.",
                    "Feature requests or functionality not included in the original SOW.",
                  ]} />
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Project Cancellation</h3>
                  <BulletList items={[
                    "Either party may terminate a project agreement with 30 days' written notice.",
                    "Upon client-initiated cancellation, the client is liable for all work completed up to the termination date, calculated at the agreed daily or sprint rate.",
                    "Any non-cancellable third-party costs incurred on the client's behalf (e.g., licences, subscriptions, dedicated infrastructure) are also payable.",
                    "SobalTech will deliver all completed and in-progress work to the client upon settlement of outstanding amounts.",
                    "SobalTech may terminate immediately for material breach or non-payment exceeding 30 days past due, without prejudice to any other remedy.",
                  ]} />
                </div>
              </div>
            </section>

            <SectionDivider />

            {/* Section 6 — Confidentiality */}
            <section id="confidential" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={6} />
                <h2 className="text-2xl font-bold text-foreground">Confidentiality</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Both SobalTech and the client agree to protect each other&rsquo;s confidential
                information with the same degree of care used to protect their own proprietary
                information, and in no event less than reasonable care.
              </p>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">What counts as confidential</h3>
                  <BulletList items={[
                    "Business plans, financial data, pricing, and strategic roadmaps.",
                    "Technical specifications, architecture diagrams, and source code.",
                    "Customer data, user information, and business operations data.",
                    "Any information marked 'Confidential' or that a reasonable person would understand to be confidential given its nature.",
                  ]} />
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">What is not confidential</h3>
                  <BulletList items={[
                    "Information that is or becomes publicly known through no fault of the receiving party.",
                    "Information independently developed by the receiving party without use of confidential information.",
                    "Information received from a third party without restriction on disclosure.",
                    "Information required to be disclosed by law, court order, or regulatory authority. In such cases the disclosing party will notify the other as soon as legally permissible.",
                  ]} />
                </div>
              </div>

              <div className="mt-4">
                <Callout variant="info">
                  This confidentiality obligation survives termination or expiry of any project
                  agreement for a period of <strong>3 years</strong>. Certain categories
                  (e.g., trade secrets) may be protected indefinitely under applicable law.
                </Callout>
              </div>
            </section>

            <SectionDivider />

            {/* Section 7 — Warranties */}
            <section id="warranties" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={7} />
                <h2 className="text-2xl font-bold text-foreground">Warranties & Disclaimers</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 dark:border-emerald-800/40 dark:bg-emerald-950/20 p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">What we warrant</h3>
                  <BulletList items={[
                    "Services will be performed with reasonable professional skill and care by experienced personnel.",
                    "Deliverables will substantially conform to the agreed specifications in the SOW.",
                    "We have the legal right to enter into the engagement and assign the agreed IP to you.",
                    "We will not knowingly include third-party materials in deliverables that would infringe any intellectual property rights.",
                  ]} />
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50/50 dark:border-amber-800/40 dark:bg-amber-950/20 p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Website disclaimer</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The sobaltech.com website and all its content is provided <strong className="text-foreground">&ldquo;as is&rdquo;</strong> and{" "}
                    <strong className="text-foreground">&ldquo;as available&rdquo;</strong> without any express or implied warranty, including
                    but not limited to warranties of merchantability, fitness for a particular purpose,
                    accuracy, or non-infringement. We do not warrant that:
                  </p>
                  <BulletList items={[
                    "The website will be continuously available or free from interruptions, errors, or security vulnerabilities.",
                    "Content on the website is complete, accurate, or current at all times.",
                    "The website is free from viruses, malware, or other harmful components.",
                  ]} />
                </div>
              </div>
            </section>

            <SectionDivider />

            {/* Section 8 — Liability */}
            <section id="liability" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={8} />
                <h2 className="text-2xl font-bold text-foreground">Limitation of Liability</h2>
              </div>

              <div className="rounded-xl border border-rose-200 bg-rose-50/50 dark:border-rose-800/40 dark:bg-rose-950/20 p-5 mb-5">
                <h3 className="text-sm font-semibold text-foreground mb-2">Liability cap</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by applicable law, SobalTech&rsquo;s total aggregate
                  liability for any claim arising out of or connected to these Terms or our Services
                  shall not exceed the <strong className="text-foreground">total fees paid by you to SobalTech in the 3 months immediately
                  preceding the event giving rise to the claim</strong>.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Excluded losses</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  In no event shall SobalTech be liable for any of the following, even if we have
                  been advised of the possibility of such damages:
                </p>
                <BulletList items={[
                  "Loss of profits, revenue, or anticipated savings.",
                  "Loss of business, contracts, or opportunities.",
                  "Loss of data or database corruption.",
                  "Loss of goodwill or reputation.",
                  "Business interruption or downtime costs.",
                  "Any indirect, incidental, special, consequential, or punitive damages.",
                ]} />
              </div>

              <div className="mt-4">
                <Callout variant="important">
                  Some jurisdictions do not allow exclusion of implied warranties or limitation of
                  incidental damages. Where such laws apply, the above limitations may not apply to
                  you in full.
                </Callout>
              </div>
            </section>

            <SectionDivider />

            {/* Section 9 — Indemnification */}
            <section id="indemnity" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={9} />
                <h2 className="text-2xl font-bold text-foreground">Indemnification</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless SobalTech and its officers,
                directors, employees, contractors, and agents from and against any and all claims,
                damages, losses, liabilities, costs, and expenses (including reasonable legal fees)
                arising out of or relating to:
              </p>
              <BulletList items={[
                "Your breach of any provision of these Terms.",
                "Your misuse of the website or any SobalTech service.",
                "Your violation of any applicable law, regulation, or third-party right.",
                "Content or materials you provide to SobalTech that infringe any intellectual property or privacy rights.",
                "Any claim by a third party arising from your use of deliverables in a manner inconsistent with the agreed scope.",
              ]} />
            </section>

            <SectionDivider />

            {/* Section 10 — Third-party */}
            <section id="third-party" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={10} />
                <h2 className="text-2xl font-bold text-foreground">Third-Party Services</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Our website and the solutions we build may integrate or link to third-party services
                such as payment processors, analytics platforms, cloud providers, and APIs. These
                are governed by their own terms.
              </p>
              <BulletList items={[
                "SobalTech is not responsible for the availability, content, privacy practices, or reliability of any third-party service.",
                "Your use of third-party services integrated into a SobalTech-built product is subject to that provider's own terms and privacy policy.",
                "We will endeavour to notify clients of material third-party dependencies during the scoping phase.",
                "Fees for third-party services (APIs, SaaS tools, cloud credits) are separate from SobalTech's fees unless explicitly included in the SOW.",
              ]} />
            </section>

            <SectionDivider />

            {/* Section 11 — Privacy */}
            <section id="privacy" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={11} />
                <h2 className="text-2xl font-bold text-foreground">Privacy</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Your use of our website and services is also governed by our Privacy Policy, which
                is incorporated into these Terms by reference. The Privacy Policy explains what
                personal data we collect, how we use it, and your rights over it.
              </p>
              <div className="mt-4">
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50/60 dark:border-violet-800/40 dark:bg-violet-950/20 px-4 py-3 text-sm font-semibold text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-950/40 transition-colors"
                >
                  <Lock className="h-4 w-4" />
                  Read the Privacy Policy →
                </Link>
              </div>
            </section>

            <SectionDivider />

            {/* Section 12 — Governing Law */}
            <section id="governing" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={12} />
                <h2 className="text-2xl font-bold text-foreground">Governing Law & Disputes</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Governing law</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    These Terms and any dispute arising out of or in connection with them, including
                    disputes about their existence, validity, or termination, are governed by and
                    construed in accordance with the laws of the <strong className="text-foreground">Republic of Ghana</strong>,
                    without regard to its conflict of law principles.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Dispute resolution process</h3>
                  {[
                    { step: "1", title: "Good-faith negotiation", desc: "Either party may raise a dispute in writing. Both parties agree to attempt resolution through direct negotiation within 30 days." },
                    { step: "2", title: "Mediation", desc: "If negotiation fails, the parties will attempt mediation with a mutually agreed mediator before proceeding to litigation." },
                    { step: "3", title: "Litigation", desc: "Unresolved disputes shall be submitted to the exclusive jurisdiction of the courts of the Republic of Ghana." },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="flex gap-3 mb-3 last:mb-0">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/50 text-xs font-bold text-violet-700 dark:text-violet-300">
                        {step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <SectionDivider />

            {/* Section 13 — Changes */}
            <section id="changes" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={13} />
                <h2 className="text-2xl font-bold text-foreground">Changes to These Terms</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to update these Terms at any time to reflect changes in our
                services, legal requirements, or business practices.
              </p>
              <BulletList items={[
                "The 'Last updated' date at the top of this page will reflect the date of the most recent revision.",
                "Material changes that substantially affect user or client rights will be communicated by email to active subscribers and clients at least 14 days before taking effect.",
                "Continued use of our website or services after the effective date of revised Terms constitutes your acceptance.",
                "For active project engagements, changes to these Terms will not retroactively alter the terms of a signed SOW without mutual written agreement.",
                "Prior versions of these Terms are available on request at legal@sobaltech.com.",
              ]} />
            </section>

            <SectionDivider />

            {/* Section 14 — General */}
            <section id="general" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={14} />
                <h2 className="text-2xl font-bold text-foreground">General Provisions</h2>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Entire Agreement", desc: "These Terms, together with any applicable SOW, project agreement, and our Privacy Policy, constitute the entire agreement between the parties regarding the subject matter and supersede all prior discussions, representations, and agreements." },
                  { title: "Severability", desc: "If any provision of these Terms is found to be unlawful, void, or unenforceable by a court of competent jurisdiction, that provision shall be severed. All remaining provisions shall continue in full force and effect." },
                  { title: "Waiver", desc: "Failure by SobalTech to enforce any provision of these Terms shall not constitute a waiver of our right to enforce it at a later date. Waivers must be in writing and signed by an authorised SobalTech representative." },
                  { title: "Assignment", desc: "You may not assign your rights or obligations under these Terms or any SOW without SobalTech's prior written consent. SobalTech may assign these Terms in connection with a merger, acquisition, or sale of assets with reasonable notice to you." },
                  { title: "Force Majeure", desc: "Neither party shall be liable for delays or failure to perform obligations caused by events beyond their reasonable control, including but not limited to natural disasters, power outages, internet service disruptions, government actions, strikes, or acts of war. The affected party must notify the other promptly and resume performance as soon as reasonably practicable." },
                  { title: "Notices", desc: "All legal notices under these Terms must be in writing and delivered by email with confirmation of receipt, or by registered post to the addresses recorded in the applicable SOW." },
                ].map(({ title, desc }) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <SectionDivider />

            {/* Section 15 — Contact */}
            <section id="contact" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={15} />
                <h2 className="text-2xl font-bold text-foreground">Contact</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                For any questions about these Terms, licensing, or to request documentation for
                your legal records, please reach out to our legal team.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Mail, label: "Legal queries", value: "legal@sobaltech.com", href: "mailto:legal@sobaltech.com" },
                  { icon: Briefcase, label: "General enquiries", value: "hello@sobaltech.com", href: "mailto:hello@sobaltech.com" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-sm transition-all">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-950/50">
                      <Icon className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-semibold text-foreground">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Registered Address</p>
                    <p className="text-sm text-muted-foreground mt-0.5">SobalTech, Spintex Road, Accra, Ghana</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-5">
                Also see our{" "}
                <Link href="/privacy" className="text-violet-600 dark:text-violet-400 font-semibold hover:underline">
                  Privacy Policy
                </Link>{" "}
                which forms part of this agreement.
              </p>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
