"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Database,
  Eye,
  Users,
  Clock,
  Lock,
  Globe,
  Baby,
  ExternalLink,
  RefreshCw,
  Mail,
  CheckCircle2,
  Info,
  AlertCircle,
  Cookie,
  Server,
  FileText,
} from "lucide-react";

const LAST_UPDATED = "June 26, 2025";
const EFFECTIVE_DATE = "June 26, 2025";

// ─── Table of contents ────────────────────────────────────────────────────────

const TOC = [
  { id: "collect",       label: "Information We Collect",          icon: Database },
  { id: "use",           label: "How We Use Your Data",            icon: Eye },
  { id: "legal-basis",   label: "Legal Basis for Processing",      icon: FileText },
  { id: "sharing",       label: "Sharing Your Information",        icon: Users },
  { id: "retention",     label: "Data Retention",                  icon: Clock },
  { id: "cookies",       label: "Cookies & Tracking",              icon: Cookie },
  { id: "security",      label: "Data Security",                   icon: Lock },
  { id: "rights",        label: "Your Rights",                     icon: ShieldCheck },
  { id: "transfers",     label: "International Transfers",         icon: Globe },
  { id: "children",      label: "Children's Privacy",              icon: Baby },
  { id: "third-party",   label: "Third-Party Links",               icon: ExternalLink },
  { id: "changes",       label: "Policy Changes",                  icon: RefreshCw },
  { id: "contact",       label: "Contact Us",                      icon: Mail },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionNumber({ n }: { n: number }) {
  return (
    <div className="shrink-0 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-sm font-bold shadow-sm">
      {String(n).padStart(2, "0")}
    </div>
  );
}

function Callout({
  variant = "info",
  children,
}: {
  variant?: "info" | "warning" | "success";
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
    success: {
      wrap: "border-emerald-200 bg-emerald-50/60 dark:border-emerald-800/40 dark:bg-emerald-950/30",
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
      text: "text-emerald-900 dark:text-emerald-200",
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
          <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
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

export default function PrivacyPage() {
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
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-violet-50/30 to-transparent dark:from-indigo-950/30 dark:via-violet-950/10 dark:to-transparent" />
          <div className="absolute left-1/3 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-[120px] dark:bg-indigo-600/10" />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.5)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40 px-3 py-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
                  Legal
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Your privacy is not an afterthought. It is built into how we operate. This policy
              explains exactly what personal data SobalTech collects, why we collect it, how we
              protect it, and the controls you have over it.
            </p>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-3 pt-1">
              {[
                { label: "Last updated", value: LAST_UPDATED },
                { label: "Effective date", value: EFFECTIVE_DATE },
                { label: "Jurisdiction", value: "Republic of Ghana" },
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
                { value: "13", label: "Sections covered" },
                { value: "30 days", label: "Rights response time" },
                { value: "0", label: "Data sold to third parties" },
                { value: "TLS 256-bit", label: "Encryption standard" },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-border bg-card/70 p-4 text-center">
                  <p className="text-xl font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
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
                            ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold transition-colors ${
                          isActive
                            ? "bg-indigo-500 text-white"
                            : "bg-muted/70 text-muted-foreground group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:group-hover:bg-indigo-950/50 dark:group-hover:text-indigo-400"
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
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 dark:border-indigo-800/40 dark:bg-indigo-950/20 p-5">
                <p className="text-sm font-semibold text-foreground mb-1.5">Privacy questions?</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Contact our privacy team directly and we&rsquo;ll respond within 30 days.
                </p>
                <a
                  href="mailto:privacy@sobaltech.com"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" />
                  privacy@sobaltech.com
                </a>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">

            {/* Section 1 — Information We Collect */}
            <section id="collect" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={1} />
                <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                We collect only the information necessary to provide our services and improve your
                experience. We never collect data speculatively. Every data point has a defined
                purpose.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: FileText,
                    title: "Contact & Inquiry Data",
                    desc: "Name, email address, phone number, company name, and message content when you reach out via our contact form, quote request, or chatbot.",
                  },
                  {
                    icon: Server,
                    title: "Project Information",
                    desc: "Budget range, timeline preferences, required services, and project descriptions you provide during the quote and onboarding process.",
                  },
                  {
                    icon: Mail,
                    title: "Newsletter Subscriptions",
                    desc: "Your email address if you subscribe to our newsletter. We never subscribe you without explicit opt-in consent.",
                  },
                  {
                    icon: Users,
                    title: "Job Applications",
                    desc: "CV, cover letter, portfolio links, and contact details submitted via our careers portal when applying for an open position.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/50">
                        <Icon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-border bg-muted/30 p-5">
                <p className="text-sm font-semibold text-foreground mb-3">Automatically collected data</p>
                <BulletList items={[
                  "Usage data: pages visited, time on page, referring URLs, click paths, and scroll depth.",
                  "Device and browser info: browser type, operating system, screen resolution, and language.",
                  "IP address, used for security, fraud detection, and approximate geographic location (country/city level only, never precise coordinates).",
                  "Session and preference cookies, used to remember your settings such as dark mode and maintain your session.",
                  "Analytics identifiers: anonymised identifiers to measure aggregate site performance.",
                ]} />
              </div>

              <div className="mt-4">
                <Callout variant="success">
                  We do not purchase data from data brokers or acquire personal information from
                  third-party marketing lists.
                </Callout>
              </div>
            </section>

            <SectionDivider />

            {/* Section 2 — How We Use Your Data */}
            <section id="use" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={2} />
                <h2 className="text-2xl font-bold text-foreground">How We Use Your Data</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Every use of your data is tied to a specific, legitimate purpose. We do not process
                your data in ways that are incompatible with the reasons it was collected.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { label: "Service delivery", desc: "To respond to inquiries, scope your project, prepare proposals, deliver agreed work, and process invoices." },
                  { label: "Communications", desc: "Transactional emails such as form confirmations, project updates, invoice reminders, and support responses." },
                  { label: "Marketing (opt-in only)", desc: "Newsletter updates, blog articles, case studies, and service announcements, sent only if you have explicitly opted in or have an existing client relationship." },
                  { label: "Site improvement", desc: "Aggregate analytics to understand which pages perform well, where users drop off, and how to improve navigation and content." },
                  { label: "Security & fraud prevention", desc: "IP analysis, rate limiting, and anomaly detection to protect both you and our systems from misuse or attacks." },
                  { label: "Legal compliance", desc: "Meeting our obligations under Ghanaian law, international regulations, court orders, or government directives." },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-foreground">{label}: </span>
                      <span className="text-sm text-muted-foreground">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Callout variant="warning">
                  We will never sell, rent, trade, or otherwise transfer your personal information
                  to third parties for their own marketing or commercial purposes.
                </Callout>
              </div>
            </section>

            <SectionDivider />

            {/* Section 3 — Legal Basis */}
            <section id="legal-basis" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={3} />
                <h2 className="text-2xl font-bold text-foreground">Legal Basis for Processing</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                For individuals in the European Economic Area (EEA), United Kingdom, or other
                jurisdictions with formal data protection frameworks, we identify a legal basis for
                each category of processing.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  { basis: "Contract Performance", color: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300", desc: "Processing necessary to deliver a service you have requested or to take steps before entering a contract (e.g., preparing a quote)." },
                  { basis: "Legitimate Interests", color: "bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300", desc: "Operating and improving our website, responding to general enquiries, preventing fraud, and maintaining IT security, all balanced against your interests." },
                  { basis: "Consent", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300", desc: "Marketing emails and analytics cookies, where we ask for your explicit permission. You may withdraw consent at any time without penalty." },
                  { basis: "Legal Obligation", color: "bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300", desc: "Compliance with tax laws, accounting regulations, court orders, or mandatory government disclosures." },
                ].map(({ basis, color, desc }) => (
                  <div key={basis} className="rounded-xl border border-border bg-card p-5">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${color} mb-3`}>
                      {basis}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <SectionDivider />

            {/* Section 4 — Sharing */}
            <section id="sharing" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={4} />
                <h2 className="text-2xl font-bold text-foreground">Sharing Your Information</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                We share your personal data with as few parties as possible, and only when there is
                a clear and documented reason to do so. All processors are bound by data processing
                agreements.
              </p>

              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Service Providers (Data Processors)",
                    items: [
                      "Email delivery: Resend (transactional emails) and Mailchimp (newsletter).",
                      "Cloud hosting: Vercel (website) and cloud infrastructure providers for project workloads.",
                      "Analytics: privacy-friendly, cookieless analytics platforms (aggregate only).",
                      "Payment processing: Stripe or local Ghanaian payment gateways for invoices.",
                      "Database hosting: hosted on encrypted, access-controlled cloud servers.",
                    ],
                  },
                  {
                    title: "Professional Advisers",
                    items: [
                      "Lawyers, accountants, auditors, and insurers, strictly limited to what is necessary for the advisory service.",
                    ],
                  },
                  {
                    title: "Legal Authorities",
                    items: [
                      "Regulatory bodies, law enforcement, or courts, only when required by law or court order, and only to the extent required.",
                      "We will notify you of any such disclosure where legally permissible.",
                    ],
                  },
                  {
                    title: "Business Transfers",
                    items: [
                      "In the event of a merger, acquisition, or sale of SobalTech's assets, your data may be transferred to the acquiring entity.",
                      "You will be notified via email and a prominent site notice at least 30 days before any such transfer.",
                    ],
                  },
                ].map(({ title, items }) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
                    <BulletList items={items} />
                  </div>
                ))}
              </div>
            </section>

            <SectionDivider />

            {/* Section 5 — Retention */}
            <section id="retention" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={5} />
                <h2 className="text-2xl font-bold text-foreground">Data Retention</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                We do not keep your data longer than necessary. Retention periods are determined by
                the purpose of collection, contractual requirements, and applicable law.
              </p>

              <div className="mt-6 grid gap-3">
                {[
                  { type: "Inquiry & Quote Data", period: "3 years", detail: "From the date of last contact, then securely deleted or anonymised." },
                  { type: "Active Client Data", period: "Duration + 5 years", detail: "Project data retained for the engagement duration plus 5 years for legal and accounting purposes." },
                  { type: "Invoices & Financial Records", period: "7 years", detail: "Required by Ghanaian tax and accounting regulations." },
                  { type: "Newsletter Subscribers", period: "Until unsubscribed", detail: "Deleted within 30 days of unsubscription request." },
                  { type: "Job Applicant Data", period: "6 months (unsuccessful)", detail: "Deleted 6 months after the role closes unless you consent to being contacted for future roles." },
                  { type: "Analytics Data", period: "26 months (aggregated)", detail: "Aggregated and anonymised. No individual-level data is retained beyond 26 months." },
                ].map(({ type, period, detail }) => (
                  <div key={type} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
                    <div className="shrink-0 rounded-lg bg-muted px-2.5 py-1.5 text-center min-w-[80px]">
                      <p className="text-xs font-bold text-foreground leading-tight">{period}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{type}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <SectionDivider />

            {/* Section 6 — Cookies */}
            <section id="cookies" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={6} />
                <h2 className="text-2xl font-bold text-foreground">Cookies & Tracking</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies selectively. We categorise them as follows
                and only enable non-essential cookies with your consent.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  {
                    category: "Strictly Necessary",
                    badge: "Always active",
                    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
                    desc: "Essential for the website to function. Includes session tokens, CSRF protection, and authentication state. Cannot be disabled.",
                    examples: ["Session ID", "CSRF token", "Auth token"],
                  },
                  {
                    category: "Preference",
                    badge: "Default: on",
                    badgeColor: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
                    desc: "Remember your preferences across visits such as dark/light mode and region settings.",
                    examples: ["Theme preference", "Language setting"],
                  },
                  {
                    category: "Analytics",
                    badge: "Opt-in",
                    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
                    desc: "Help us understand aggregate visitor behaviour (page views, bounce rate, traffic sources). Disabled by default and enabled only with explicit consent. We use privacy-first analytics that do not fingerprint individuals.",
                    examples: ["Page view counts", "Referral sources", "Session duration"],
                  },
                ].map(({ category, badge, badgeColor, desc, examples }) => (
                  <div key={category} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <h3 className="text-sm font-semibold text-foreground">{category}</h3>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badgeColor}`}>{badge}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {examples.map((ex) => (
                        <span key={ex} className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] text-muted-foreground">{ex}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Callout variant="info">
                  You can delete or block cookies at any time through your browser settings. Note
                  that disabling strictly necessary cookies will prevent the site from functioning
                  correctly.
                </Callout>
              </div>
            </section>

            <SectionDivider />

            {/* Section 7 — Security */}
            <section id="security" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={7} />
                <h2 className="text-2xl font-bold text-foreground">Data Security</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Security is core to what SobalTech does. We hold ourselves to the same standards
                we apply to client products. Our infrastructure and operational practices reflect
                this commitment.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Lock, title: "Encryption in transit", desc: "All data transmitted between your browser and our servers is encrypted via TLS 1.3 with 256-bit AES ciphers." },
                  { icon: Server, title: "Encryption at rest", desc: "Databases and file stores containing personal data are encrypted at rest using AES-256." },
                  { icon: Users, title: "Access controls", desc: "Role-based permissions ensure employees access only the data necessary for their role. Access logs are maintained." },
                  { icon: ShieldCheck, title: "Security testing", desc: "Regular vulnerability assessments and penetration tests are conducted on our own infrastructure, the same services we offer clients." },
                  { icon: RefreshCw, title: "Incident response", desc: "We maintain a documented incident response plan. In the event of a breach, affected individuals will be notified within 72 hours." },
                  { icon: Eye, title: "Vendor vetting", desc: "All third-party service providers are assessed for security posture before being granted access to systems containing personal data." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-xl border border-border bg-card p-4 flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/50">
                      <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Callout variant="info">
                  No method of internet transmission is 100% secure. If you believe your data has
                  been compromised, contact us immediately at{" "}
                  <a href="mailto:security@sobaltech.com" className="font-semibold underline underline-offset-2">security@sobaltech.com</a>.
                </Callout>
              </div>
            </section>

            <SectionDivider />

            {/* Section 8 — Your Rights */}
            <section id="rights" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={8} />
                <h2 className="text-2xl font-bold text-foreground">Your Rights</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Depending on your jurisdiction, you have meaningful rights over your personal data.
                We take these seriously and will respond to any request within <strong className="text-foreground">30 days</strong>.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { right: "Right of Access", desc: "Request a copy of all personal data we hold about you, including the purposes for which it is processed and who it has been shared with." },
                  { right: "Right to Rectification", desc: "Request correction of any inaccurate or incomplete personal data. You can update certain information directly by contacting us." },
                  { right: "Right to Erasure ('right to be forgotten')", desc: "Request deletion of your personal data where there is no compelling reason for continued processing. Some data may be retained to fulfil legal obligations." },
                  { right: "Right to Restriction", desc: "Request that we pause processing of your data, for example while we verify the accuracy of information you have disputed." },
                  { right: "Right to Data Portability", desc: "Receive your personal data in a structured, machine-readable format (JSON or CSV) so you can transfer it to another service." },
                  { right: "Right to Object", desc: "Object to processing based on legitimate interests or for direct marketing. We will stop unless we can demonstrate compelling legitimate grounds." },
                  { right: "Right to Withdraw Consent", desc: "Withdraw any consent you have previously given at any time, without affecting the lawfulness of processing based on that consent prior to withdrawal." },
                ].map(({ right, desc }) => (
                  <div key={right} className="rounded-xl border border-border bg-card p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-1">{right}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50/60 dark:border-indigo-800/40 dark:bg-indigo-950/30 p-5">
                <p className="text-sm font-semibold text-foreground mb-2">How to exercise your rights</p>
                <p className="text-sm text-muted-foreground">
                  Email <a href="mailto:privacy@sobaltech.com" className="text-indigo-600 dark:text-indigo-400 font-semibold">privacy@sobaltech.com</a> with
                  the subject line <em>&ldquo;Data Rights Request&rdquo;</em>. Include your full name and the specific right
                  you wish to exercise. We may ask for identity verification before processing your request.
                </p>
              </div>
            </section>

            <SectionDivider />

            {/* Section 9 — International Transfers */}
            <section id="transfers" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={9} />
                <h2 className="text-2xl font-bold text-foreground">International Transfers</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                SobalTech is headquartered in Accra, Ghana. Our hosting providers and processors
                operate globally, meaning your data may be transferred to and processed in countries
                outside Ghana, including the United States and European Union.
              </p>

              <div className="mt-5 space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When transferring data internationally we apply at least one of the following
                  safeguards:
                </p>
                <BulletList items={[
                  "Standard Contractual Clauses (SCCs) approved by the European Commission for transfers to and from the EEA.",
                  "Processing only with providers who participate in recognised adequacy frameworks.",
                  "Binding corporate rules where applicable.",
                  "Your explicit consent, where none of the above apply.",
                ]} />
              </div>
            </section>

            <SectionDivider />

            {/* Section 10 — Children */}
            <section id="children" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={10} />
                <h2 className="text-2xl font-bold text-foreground">Children&apos;s Privacy</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                SobalTech&rsquo;s website and services are intended for business and professional use.
                We do not knowingly collect or solicit personal data from individuals under the age
                of <strong className="text-foreground">16</strong>.
              </p>
              <div className="mt-4">
                <Callout variant="warning">
                  If you are a parent or guardian and believe your child has provided us with personal
                  information, please contact <a href="mailto:privacy@sobaltech.com" className="font-semibold underline underline-offset-2">privacy@sobaltech.com</a> immediately.
                  We will delete the data promptly.
                </Callout>
              </div>
            </section>

            <SectionDivider />

            {/* Section 11 — Third-party links */}
            <section id="third-party" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={11} />
                <h2 className="text-2xl font-bold text-foreground">Third-Party Links</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to external websites, social media profiles, partner
                pages, and integrated third-party tools. Clicking those links takes you away from
                our site and this Privacy Policy no longer applies.
              </p>
              <div className="mt-4">
                <Callout variant="info">
                  We are not responsible for the content or privacy practices of any third-party
                  site. We encourage you to review the privacy policy of any external site before
                  providing personal information.
                </Callout>
              </div>
            </section>

            <SectionDivider />

            {/* Section 12 — Changes */}
            <section id="changes" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={12} />
                <h2 className="text-2xl font-bold text-foreground">Policy Changes</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our
                business practices, technology, or applicable law. All changes will be documented
                and communicated clearly.
              </p>
              <BulletList items={[
                "The 'Last updated' date at the top of this page will always reflect the most recent revision.",
                "For material changes that significantly affect how we handle your data, we will notify active subscribers and clients by email at least 14 days in advance.",
                "Continued use of our website after the effective date of a revised policy constitutes acceptance of the new terms.",
                "Prior versions of this policy are available on request.",
              ]} />
            </section>

            <SectionDivider />

            {/* Section 13 — Contact */}
            <section id="contact" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <SectionNumber n={13} />
                <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                For any privacy questions, concerns, or requests to exercise your data rights,
                please reach out to our privacy team.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Mail, label: "Privacy Team", value: "privacy@sobaltech.com", href: "mailto:privacy@sobaltech.com" },
                  { icon: ShieldCheck, label: "Security Issues", value: "security@sobaltech.com", href: "mailto:security@sobaltech.com" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/50">
                      <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
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
                    <p className="text-sm font-semibold text-foreground">Postal Address</p>
                    <p className="text-sm text-muted-foreground mt-0.5">SobalTech, Spintex Road, Accra, Ghana</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-5">
                Also see our{" "}
                <Link href="/terms" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                  Terms of Service
                </Link>{" "}
                for the full framework governing your use of SobalTech.
              </p>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
