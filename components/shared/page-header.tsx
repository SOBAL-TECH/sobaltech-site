"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/container";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  className,
  children,
}: PageHeaderProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border bg-background",
        className,
      )}
    >
      {/* Gradient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/70 via-indigo-50/20 to-transparent dark:from-indigo-950/25 dark:via-indigo-950/5 dark:to-transparent" />

        {/* Faint vertical line field */}
        <div className="site-vertical-lines opacity-30" />

        {/* Radial glow */}
        <div className="absolute left-1/4 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-400/10 blur-[100px] dark:bg-indigo-600/8" />

        {/* Bottom border line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
      </div>

      <Container className="relative pb-14 pt-24 sm:pb-18 sm:pt-28 lg:pb-20 lg:pt-32">
        <div className="flex max-w-3xl flex-col gap-4">
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              aria-label="Breadcrumb"
            >
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
                  >
                    <Home className="h-3.5 w-3.5" />
                    <span className="sr-only">Home</span>
                  </Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40" />
                    {crumb.href && index < breadcrumbs.length - 1 ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          index === breadcrumbs.length - 1
                            ? "font-medium text-foreground"
                            : undefined,
                        )}
                        aria-current={
                          index === breadcrumbs.length - 1 ? "page" : undefined
                        }
                      >
                        {crumb.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="max-w-2xl text-base text-muted-foreground sm:text-lg text-pretty"
            >
              {description}
            </motion.p>
          )}

          {/* Slot for additional content */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
