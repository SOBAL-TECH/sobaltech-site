import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { QuoteForm } from "./quote-form";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Request a Quote — SobalTech",
  description:
    "Tell us about your project and we'll send you a tailored proposal within 2–3 business days. No commitment required.",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RequestQuotePage() {
  return (
    <>
      <PageHeader
        title="Request a Quote"
        description="Give us the details of your project and we'll craft a tailored proposal within 2–3 business days. Completely free, no obligation."
        breadcrumbs={[{ label: "Request a Quote", href: "/request-quote" }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
