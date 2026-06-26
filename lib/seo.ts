import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://sobaltech.com";
const defaultImage = `${siteUrl}/og-image.png`;
const siteName = "SobalTech";
const twitterHandle = "@sobaltech";

export { siteUrl };

export function buildMeta({
  title,
  description,
  path = "",
  image,
  type = "website",
  publishedTime,
  authors,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
}): Metadata {
  const url = `${siteUrl}${path}`;
  const ogImage = image ?? defaultImage;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type,
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === "article" && {
        publishedTime,
        authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: twitterHandle,
      site: twitterHandle,
    },
  };
}

// ─── JSON-LD helpers ──────────────────────────────────────────────────────────

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://twitter.com/sobaltech",
      "https://linkedin.com/company/sobaltech",
      "https://github.com/sobaltech",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@sobaltech.com",
      contactType: "customer support",
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  image,
  publishedAt,
  updatedAt,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  publishedAt?: Date | null;
  updatedAt?: Date;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${siteUrl}${url}`,
    image: image ?? defaultImage,
    datePublished: publishedAt?.toISOString(),
    dateModified: updatedAt?.toISOString(),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
  };
}

export function serviceJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}${url}`,
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function jobPostingJsonLd({
  title,
  description,
  url,
  department,
  employmentType,
  workLocation,
  datePosted,
  validThrough,
}: {
  title: string;
  description: string;
  url: string;
  department: string;
  employmentType: string;
  workLocation: string;
  datePosted: Date;
  validThrough?: Date | null;
}) {
  const typeMap: Record<string, string> = {
    "Full-time": "FULL_TIME",
    "Part-time": "PART_TIME",
    "Contract": "CONTRACTOR",
    "Project-based": "CONTRACTOR",
  };

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    url: `${siteUrl}${url}`,
    identifier: {
      "@type": "PropertyValue",
      name: siteName,
    },
    hiringOrganization: {
      "@type": "Organization",
      name: siteName,
      sameAs: siteUrl,
    },
    employmentType: typeMap[employmentType] ?? "OTHER",
    jobLocation:
      workLocation === "Remote"
        ? { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "REMOTE" } }
        : { "@type": "Place" },
    applicantLocationRequirements:
      workLocation === "Remote"
        ? { "@type": "Country", name: "Worldwide" }
        : undefined,
    jobLocationType: workLocation === "Remote" ? "TELECOMMUTE" : undefined,
    department,
    datePosted: datePosted.toISOString(),
    validThrough: validThrough?.toISOString(),
  };
}
