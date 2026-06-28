import type { Metadata, Viewport } from "next";
import { Sora, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

// ─── Fonts ─────────────────────────────────────────────────────────────────

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// ─── Metadata ──────────────────────────────────────────────────────────────

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://sobaltech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SobalTech — Building Digital Excellence",
    template: "SobalTech | %s",
  },
  description:
    "SobalTech is a full-service digital agency specializing in modern web development, mobile apps, and digital transformation. We build high-performance products that scale.",
  keywords: [
    "SobalTech",
    "web development",
    "digital agency",
    "Next.js",
    "TypeScript",
    "mobile apps",
    "software development",
    "UI/UX design",
    "digital transformation",
  ],
  authors: [{ name: "SobalTech", url: siteUrl }],
  creator: "SobalTech",
  publisher: "SobalTech",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "SobalTech",
    title: "SobalTech — Building Digital Excellence",
    description:
      "Full-service digital agency specializing in modern web development, mobile apps, and digital transformation.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SobalTech — Building Digital Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SobalTech — Building Digital Excellence",
    description:
      "Full-service digital agency specializing in modern web development, mobile apps, and digital transformation.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@sobaltech",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

// ─── Root Layout ───────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
