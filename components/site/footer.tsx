import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";
import { NewsletterSignup } from "@/components/site/newsletter-signup";

// ─── Data ─────────────────────────────────────────────────────────────────────

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
];

const serviceLinks = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "Cloud & DevOps", href: "/services/cloud-devops" },
  { label: "AI Integration", href: "/services/ai-integration" },
];

const resourceLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "Request Quote", href: "/request-quote" },
];

const socialLinks = [
  { label: "Twitter / X", href: "https://twitter.com/sobaltech", Icon: Twitter },
  { label: "LinkedIn", href: "https://linkedin.com/company/sobaltech", Icon: Linkedin },
  { label: "GitHub", href: "https://github.com/sobaltech", Icon: Github },
];

// ─── Footer link column ───────────────────────────────────────────────────────

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start space-y-4">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-300">
        {title}
      </h3>
      {children}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t border-white/[0.06]"
      style={{ backgroundColor: "#030B1A" }}
    >
      {/* Top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 20% at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Main grid ── */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-14 text-left lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 flex flex-col items-start gap-5 sm:col-span-1">
            <Link href="/" className="inline-flex w-fit items-center">
              <span className="text-xl font-bold text-white">Sobal</span>
              <span className="text-xl font-bold bg-brand-gradient bg-clip-text text-transparent">
                Tech
              </span>
            </Link>
            <p className="max-w-[240px] text-sm leading-relaxed text-slate-400">
              Building the Future, One Line at a Time.
            </p>
            {/* Contact info */}
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@sobaltech.com"
                  className="flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
                  hello@sobaltech.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-400">
                <Phone className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
                Available after inquiry
              </li>
              <li className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-indigo-300" />
                Spintex, Accra, Ghana
              </li>
            </ul>
          </div>

          {/* Company */}
          <FooterColumn title="Company">
            <ul className="space-y-2.5">
              {companyLinks.map(({ label, href }) => (
                <li key={href + label}>
                  <Link
                    href={href}
                    className="block text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Services */}
          <FooterColumn title="Services">
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={href + label}>
                  <Link
                    href={href}
                    className="block text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Resources */}
          <FooterColumn title="Resources">
            <ul className="space-y-2.5">
              {resourceLinks.map(({ label, href }) => (
                <li key={href + label}>
                  <Link
                    href={href}
                    className="block text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* Social */}
          <FooterColumn title="Follow Us">
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-slate-400 transition-all hover:text-white group"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition-all group-hover:border-indigo-400/40 group-hover:bg-indigo-500/10 group-hover:text-white">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </FooterColumn>
        </div>

        {/* ── Newsletter strip ── */}
        <div className="border-t border-white/[0.06] py-8">
          <div className="flex flex-col gap-4 text-left sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Stay in the loop
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Engineering insights, case studies, and new project updates.
              </p>
            </div>
            <div className="w-full max-w-sm">
              <NewsletterSignup />
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/[0.05] py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            &copy; {year} SobalTech. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
