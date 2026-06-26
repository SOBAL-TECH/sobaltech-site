import type { Metadata } from "next";
import { buildMeta } from "@/lib/seo";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "./contact-form";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMeta({
  title: "Contact SobalTech — Get in Touch",
  description:
    "Have a project in mind? Get in touch with the SobalTech team. We respond within 24 hours and offer a free 30-minute discovery call.",
  path: "/contact",
});

// ─── Contact info data ────────────────────────────────────────────────────────

const contactDetails = [
  {
    Icon: Mail,
    label: "Email",
    value: "hello@sobaltech.com",
    href: "mailto:hello@sobaltech.com",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "Available after inquiry",
    href: null,
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Spintex, Accra, Ghana",
    href: null,
  },
  {
    Icon: Clock,
    label: "Response time",
    value: "Within 24 hours",
    href: null,
  },
];

const socialLinks = [
  { Icon: Twitter, label: "Twitter", href: "https://twitter.com/sobaltech" },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/sobaltech",
  },
  { Icon: Github, label: "GitHub", href: "https://github.com/sobaltech" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get in Touch"
        description="Ready to start a project, ask a question, or just say hello? We'd love to hear from you."
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            {/* ── Contact form (2/3 width) ── */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* ── Sidebar (1/3 width) ── */}
            <aside className="space-y-8">
              {/* Contact details */}
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-foreground">
                  Contact Information
                </h2>
                <ul className="space-y-4">
                  {contactDetails.map(({ Icon, label, value, href }) => (
                    <li key={label} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 dark:border-indigo-800/40 dark:bg-indigo-950/40">
                        <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm font-medium text-foreground">
                            {value}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <hr className="border-border" />

              {/* Social links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Follow us
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 transition-all duration-200"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <hr className="border-border" />

              {/* Map placeholder */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">
                  Our location
                </h3>
                <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-muted flex items-center justify-center">
                  <div className="text-center space-y-1 p-4">
                    <MapPin className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                    <p className="text-xs text-muted-foreground">
                      Spintex, Accra, Ghana
                    </p>
                    <a
                      href="https://maps.google.com/?q=Spintex,+Accra,+Ghana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick link */}
              <div className="rounded-2xl border border-indigo-200 bg-indigo-50/60 dark:border-indigo-800/40 dark:bg-indigo-950/30 p-5 space-y-2">
                <p className="text-sm font-semibold text-foreground">
                  Need a quote instead?
                </p>
                <p className="text-xs text-muted-foreground">
                  For project enquiries, our quote form lets you specify budget,
                  timeline, and services needed — and we&apos;ll respond with a
                  tailored proposal.
                </p>
                <a
                  href="/request-quote"
                  className="inline-block text-xs font-semibold text-primary hover:underline"
                >
                  Request a quote →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
