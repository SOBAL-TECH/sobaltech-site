"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  Sun,
  Moon,
  X,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  // About
  BookOpen,
  Users,
  Heart,
  // Services
  Globe,
  Smartphone,
  Cloud,
  Palette,
  Code2,
  Cpu,
  // Products
  LayoutDashboard,
  ShoppingCart,
  BarChart3,
  Package,
  Bot,
  Layers,
  // Portfolio
  Monitor,
  Building2,
  Briefcase,
  GraduationCap,
  Network,
  ShieldCheck,
  AppWindow,
  Store,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

type VisualCard = {
  Icon: React.ElementType;
  label: string;
  description: string;
  href: string;
  gradient: string;
  badge?: string;
};

type FeaturedStrip = {
  eyebrow: string;
  heading: string;
  description: string;
  cta: string;
  href: string;
};

type MenuConfig = {
  heading: string;
  cols: 2 | 3 | 4;
  cards: VisualCard[];
  featured?: FeaturedStrip;
  footer?: { label: string; href: string };
};

function getPanelWidthClass(config: MenuConfig) {
  if (config.cards.length > config.cols) return "max-w-[880px]";
  if (config.featured) return "max-w-[760px]";
  return "max-w-[680px]";
}

// ─── Menu data ─────────────────────────────────────────────────────────────────

const MENUS: Record<string, MenuConfig> = {
  about: {
    heading: "About Us",
    cols: 3,
    cards: [
      {
        Icon: BookOpen,
        label: "Our Story",
        description: "Founded in 2019 with a mission to make great software accessible",
        href: "/about",
        gradient: "from-slate-600 via-slate-700 to-slate-900",
      },
      {
        Icon: Users,
        label: "Meet the Team",
        description: "15+ engineers, designers & strategists behind every build",
        href: "/about#team",
        gradient: "from-indigo-600 via-indigo-700 to-violet-700",
      },
      {
        Icon: Heart,
        label: "Our Values",
        description: "Craft, honesty and ownership baked into how we work",
        href: "/about#values",
        gradient: "from-rose-500 via-pink-600 to-fuchsia-600",
      },
    ],
    featured: {
      eyebrow: "Now hiring",
      heading: "Join the SobalTech team",
      description:
        "Senior engineers & designers who care about the craft. Remote-first, equity included.",
      cta: "See open positions",
      href: "/careers",
    },
    footer: { label: "Learn more about us", href: "/about" },
  },

  services: {
    heading: "Services",
    cols: 4,
    cards: [
      {
        Icon: Globe,
        label: "Web Development",
        description: "Next.js, React & scalable full-stack platforms",
        href: "/services/web-development",
        gradient: "from-indigo-500 via-indigo-600 to-violet-600",
      },
      {
        Icon: Smartphone,
        label: "Mobile Apps",
        description: "Native-quality iOS & Android with React Native",
        href: "/services/mobile-apps",
        gradient: "from-violet-500 via-purple-600 to-fuchsia-600",
      },
      {
        Icon: Cloud,
        label: "Cloud & DevOps",
        description: "AWS, Kubernetes & production-grade CI/CD",
        href: "/services/cloud-devops",
        gradient: "from-sky-500 via-blue-500 to-cyan-500",
      },
      {
        Icon: Palette,
        label: "UI/UX Design",
        description: "Design systems, research & conversion-focused UX",
        href: "/services/ui-ux-design",
        gradient: "from-pink-500 via-rose-500 to-red-500",
      },
      {
        Icon: Code2,
        label: "API Development",
        description: "REST, GraphQL & complex third-party integrations",
        href: "/services/api-development",
        gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      },
      {
        Icon: Cpu,
        label: "AI Integration",
        description: "LLMs, RAG pipelines & intelligent ML automation",
        href: "/services/ai-integration",
        gradient: "from-amber-500 via-orange-500 to-rose-500",
        badge: "Hot",
      },
      {
        Icon: ShieldCheck,
        label: "Cybersecurity",
        description: "Security reviews, secure SDLC & data protection controls",
        href: "/services/cybersecurity",
        gradient: "from-emerald-600 via-teal-600 to-cyan-700",
      },
      {
        Icon: ShieldCheck,
        label: "Penetration Testing",
        description: "Web app, API & infrastructure vulnerability testing",
        href: "/services/penetration-testing",
        gradient: "from-red-500 via-rose-600 to-orange-600",
      },
      {
        Icon: Network,
        label: "Network Engineering",
        description: "Network design, server setup, monitoring & support",
        href: "/services/network-engineering",
        gradient: "from-sky-600 via-cyan-600 to-teal-700",
      },
      {
        Icon: BarChart3,
        label: "Data Analytics",
        description: "Dashboards, reporting pipelines & operational insights",
        href: "/services/data-analytics",
        gradient: "from-blue-600 via-indigo-600 to-violet-700",
      },
      {
        Icon: Briefcase,
        label: "IT Consulting",
        description: "Roadmaps, systems integration & digital transformation",
        href: "/services/it-consulting",
        gradient: "from-slate-600 via-slate-700 to-slate-900",
      },
      {
        Icon: GraduationCap,
        label: "IT Training",
        description: "Capacity building for software, security, AI & ops",
        href: "/services/it-training",
        gradient: "from-violet-600 via-purple-600 to-fuchsia-700",
      },
      {
        Icon: AppWindow,
        label: "Custom Applications",
        description: "Bespoke software built around your business processes",
        href: "/services/custom-applications",
        gradient: "from-slate-500 via-slate-600 to-slate-800",
      },
      {
        Icon: CreditCard,
        label: "POS Systems",
        description: "Custom point-of-sale for retail, hospitality & services",
        href: "/services/pos-systems",
        gradient: "from-emerald-600 via-green-600 to-teal-700",
      },
      {
        Icon: Store,
        label: "E-commerce",
        description: "Full-featured online stores with payments & order management",
        href: "/services/ecommerce",
        gradient: "from-orange-500 via-amber-500 to-orange-600",
      },
    ],
    footer: { label: "View all services", href: "/services" },
  },

  products: {
    heading: "Products",
    cols: 3,
    cards: [
      {
        Icon: LayoutDashboard,
        label: "SobalLaunch",
        description: "Ship production-ready SaaS in days, not months",
        href: "/products/sobal-launch",
        gradient: "from-indigo-600 via-indigo-700 to-blue-800",
      },
      {
        Icon: ShoppingCart,
        label: "SobalShop",
        description: "Modern e-commerce platform built for conversion",
        href: "/products/sobal-shop",
        gradient: "from-emerald-600 via-green-600 to-teal-700",
      },
      {
        Icon: BarChart3,
        label: "SobalAnalytics",
        description: "Real-time analytics & custom reporting dashboards",
        href: "/products/sobal-analytics",
        gradient: "from-amber-500 via-orange-600 to-yellow-600",
      },
      {
        Icon: Package,
        label: "SobalAdmin",
        description: "Enterprise admin panel, ready to customise & deploy",
        href: "/products/sobal-admin",
        gradient: "from-violet-600 via-purple-600 to-fuchsia-700",
      },
      {
        Icon: Layers,
        label: "SobalMobile",
        description: "Cross-platform mobile starter with auth & payments",
        href: "/products/sobal-mobile",
        gradient: "from-sky-600 via-blue-600 to-indigo-700",
      },
      {
        Icon: Bot,
        label: "SobalAI",
        description: "AI integration framework for any modern stack",
        href: "/products/sobal-ai",
        gradient: "from-rose-500 via-pink-600 to-red-600",
        badge: "New",
      },
    ],
    footer: { label: "View all products", href: "/products" },
  },

  portfolio: {
    heading: "Our Work",
    cols: 3,
    cards: [
      {
        Icon: Monitor,
        label: "Web Applications",
        description: "Full-stack platforms, SaaS products & web apps",
        href: "/portfolio?type=web",
        gradient: "from-indigo-700 via-indigo-800 to-slate-900",
      },
      {
        Icon: Smartphone,
        label: "Mobile Apps",
        description: "iOS & Android apps shipped to hundreds of thousands",
        href: "/portfolio?type=mobile",
        gradient: "from-violet-700 via-purple-800 to-fuchsia-900",
      },
      {
        Icon: Building2,
        label: "Enterprise",
        description: "Large-scale solutions for complex business operations",
        href: "/portfolio?type=enterprise",
        gradient: "from-slate-600 via-slate-700 to-slate-900",
      },
    ],
    featured: {
      eyebrow: "Case studies",
      heading: "50+ projects shipped across 4 continents",
      description:
        "From seed-stage startups to enterprise companies, browse the full body of work.",
      cta: "View all case studies",
      href: "/portfolio",
    },
    footer: { label: "Browse all projects", href: "/portfolio" },
  },
};

// ─── Nav structure ─────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "About Us",  menuId: "about" },
  { label: "Services",  menuId: "services" },
  { label: "Products",  menuId: "products" },
  { label: "Portfolio", menuId: "portfolio" },
  { label: "Careers",   href: "/careers" },
  { label: "Blog",      href: "/blog" },
] as const;

const MENU_ORDER = Object.keys(MENUS); // ['about','services','products','portfolio']

const MENU_ACTIVE_PATHS: Record<string, string[]> = {
  about: ["/about"],
  services: ["/services"],
  products: ["/products"],
  portfolio: ["/portfolio"],
};

function isSectionActive(pathname: string, menuId: string) {
  return (MENU_ACTIVE_PATHS[menuId] ?? []).some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function isHrefActive(pathname: string, href: string) {
  const [hrefPath, hrefSuffix] = href.split(/[?#]/);
  if (!hrefPath || hrefSuffix) return false;
  return pathname === hrefPath || pathname.startsWith(`${hrefPath}/`);
}

// ─── Animation config ─────────────────────────────────────────────────────────

const PANEL_SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 38,
  mass: 0.8,
} as const;

const menuContentVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 34,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -34,
  }),
};

// ─── VisualCard ───────────────────────────────────────────────────────────────

function VisualCard({
  card,
  isActive,
  onClose,
}: {
  card: VisualCard;
  isActive: boolean;
  onClose: () => void;
}) {
  return (
    <div>
      <Link
        href={card.href}
        onClick={onClose}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "group flex min-h-[92px] items-start gap-3 rounded-lg border p-3.5 outline-none backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-indigo-500/35",
          isActive
            ? "border-indigo-300 bg-indigo-50/95 shadow-[0_16px_34px_rgba(79,70,229,0.12),inset_0_1px_0_rgba(255,255,255,0.78)] ring-1 ring-indigo-500/15 dark:border-indigo-400/45 dark:bg-indigo-400/[0.14] dark:shadow-[0_18px_42px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)] dark:ring-indigo-300/20"
            : "border-slate-200/80 bg-white/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] hover:border-indigo-200 hover:bg-white hover:shadow-[0_18px_38px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-slate-900/78 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:hover:border-indigo-400/30 dark:hover:bg-slate-900 dark:hover:shadow-[0_18px_42px_rgba(0,0,0,0.34)]",
        )}
      >
        <div
          className={cn(
            "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br shadow-[0_10px_22px_rgba(79,70,229,0.18)] ring-1 ring-white/35",
            card.gradient,
          )}
        >
          <div className="absolute inset-0 bg-white/10" />
          <card.Icon className="relative z-10 h-[18px] w-[18px] text-white drop-shadow transition-transform duration-300 group-hover:scale-110" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                "truncate text-[13px] font-semibold leading-snug",
                isActive
                  ? "text-indigo-950 dark:text-indigo-100"
                  : "text-slate-950 dark:text-white",
              )}
            >
              {card.label}
            </h3>
            {card.badge && (
              <span className="rounded-full border border-indigo-200/70 bg-indigo-50/70 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-indigo-600 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
                {card.badge}
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-slate-700 dark:text-slate-300">
            {card.description}
          </p>
          <div
            className={cn(
              "mt-2 flex items-center gap-1 text-[11px] font-semibold text-indigo-700 transition-all duration-150 dark:text-indigo-300",
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          >
            Explore
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </div>
  );
}

// ─── FeaturedStrip ────────────────────────────────────────────────────────────

function FeaturedStrip({
  strip,
  isActive,
  onClose,
}: {
  strip: FeaturedStrip;
  isActive: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={strip.href}
        onClick={onClose}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "group flex items-center gap-4 rounded-lg border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-xl transition-all duration-200 hover:border-indigo-300/75 hover:shadow-[0_16px_34px_rgba(79,70,229,0.12)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]",
          isActive
            ? "border-indigo-300 bg-indigo-50/95 ring-1 ring-indigo-500/15 dark:border-indigo-400/40 dark:bg-indigo-400/[0.14] dark:ring-indigo-300/20"
            : "border-indigo-200/70 bg-gradient-to-r from-indigo-50/95 via-white/90 to-violet-50/90 dark:border-indigo-300/15 dark:from-indigo-400/[0.11] dark:via-slate-900/80 dark:to-violet-400/[0.09] dark:hover:bg-indigo-400/[0.11]",
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 shadow-md shadow-slate-950/20 dark:bg-white">
          <Sparkles className="h-4 w-4 text-white dark:text-slate-950" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-indigo-500 dark:text-indigo-400">
            {strip.eyebrow}
          </p>
          <p className="mt-0.5 text-[13.5px] font-bold text-slate-950 dark:text-white">
            {strip.heading}
          </p>
          <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
            {strip.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-indigo-200/70 bg-white/60 px-3 py-2 text-[12px] font-semibold text-indigo-600 shadow-sm backdrop-blur transition-all duration-150 group-hover:border-indigo-300 group-hover:bg-white/85 dark:border-indigo-400/20 dark:bg-white/[0.04] dark:text-indigo-300 dark:group-hover:border-indigo-400/30">
          {strip.cta}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </Link>
    </motion.div>
  );
}

// ─── PanelContent ──────────────────────────────────────────────────────────────

function PanelContent({
  menuId,
  config,
  direction,
  pathname,
  onClose,
}: {
  menuId: string;
  config: MenuConfig;
  direction: number;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      key={menuId}
      custom={direction}
      variants={menuContentVariants}
      className="col-start-1 row-start-1 min-w-0"
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-4 flex items-center justify-between border-b border-slate-200/80 pb-3 dark:border-white/10">
        <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-slate-950 dark:text-white">
          {config.heading}
        </p>
        {config.footer && (
          <Link
            href={config.footer.href}
            onClick={onClose}
            aria-current={isHrefActive(pathname, config.footer.href) ? "page" : undefined}
            className={cn(
              "group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold shadow-sm backdrop-blur transition-all hover:gap-2 hover:border-indigo-200 hover:bg-white dark:border-white/10 dark:text-indigo-300",
              isHrefActive(pathname, config.footer.href)
                ? "border-indigo-300 bg-indigo-50 text-indigo-800 dark:border-indigo-400/35 dark:bg-indigo-400/[0.12]"
                : "border-slate-200/80 bg-white/85 text-indigo-700 dark:bg-slate-900/75",
            )}
          >
            {config.footer.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {/* Cards */}
      <div
        className={cn(
          "grid gap-2.5",
          config.cols === 3 && "grid-cols-3",
          config.cols === 2 && "grid-cols-2",
          config.cols === 4 && "grid-cols-4",
        )}
      >
        {config.cards.map((card) => (
          <VisualCard
            key={card.href}
            card={card}
            isActive={isHrefActive(pathname, card.href)}
            onClose={onClose}
          />
        ))}
      </div>

      {config.featured && (
        <div className="mt-4">
          <FeaturedStrip
            strip={config.featured}
            isActive={isHrefActive(pathname, config.featured.href)}
            onClose={onClose}
          />
        </div>
      )}
    </motion.div>
  );
}

// ─── ThemeIcon ────────────────────────────────────────────────────────────────

function ThemeIcon({ isDark, mounted }: { isDark: boolean; mounted: boolean }) {
  if (!mounted) return <Sun className="h-[15px] w-[15px]" />;
  return isDark
    ? <Sun className="h-[15px] w-[15px]" />
    : <Moon className="h-[15px] w-[15px]" />;
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Mega menu ───────────────────────────────────────────────────────────────

  type ActiveMenu = { id: string; direction: number } | null;
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 130);
  }, []);

  const openMenu = useCallback(
    (menuId: string) => {
      cancelClose();
      setActiveMenu((prev) => {
        let direction = 0;
        if (prev?.id && prev.id !== menuId) {
          direction =
            MENU_ORDER.indexOf(menuId) > MENU_ORDER.indexOf(prev.id) ? 1 : -1;
        }
        return { id: menuId, direction };
      });
    },
    [cancelClose],
  );

  const closeMenu = useCallback(() => setActiveMenu(null), []);

  useEffect(() => { setActiveMenu(null); }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  // ── Mobile ──────────────────────────────────────────────────────────────────

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  // ── Style helpers ───────────────────────────────────────────────────────────

  const linkColor = "text-slate-700 hover:text-slate-950 dark:text-slate-200/80 dark:hover:text-white";

  const navBg = scrolled
    ? "border-b border-white/35 bg-white/78 shadow-[0_10px_40px_rgba(15,23,42,0.1)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/74 dark:shadow-[0_10px_40px_rgba(0,0,0,0.38)]"
    : "border-b border-transparent bg-white/42 shadow-none backdrop-blur-xl dark:bg-slate-950/38";

  const isOpen = !!activeMenu;

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,border,box-shadow] duration-300",
          navBg,
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-8">
            {/* ── Logo ────────────────────────────────────────────────────── */}
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2 font-bold text-slate-950 transition-opacity hover:opacity-80 dark:text-white"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-[11px] font-black text-white shadow-md">
                ST
              </span>
              <span className="hidden text-[15px] tracking-tight sm:block">
                SobalTech
              </span>
            </Link>

            {/* ── Desktop nav (grows to fill space) ───────────────────────── */}
            <nav
              className="hidden flex-1 items-center gap-px lg:flex"
              aria-label="Main navigation"
              role="menubar"
            >
              {NAV_ITEMS.map((item) => {
                if ("menuId" in item) {
                  const isMenuOpen = activeMenu?.id === item.menuId;
                  const isActive = isMenuOpen || isSectionActive(pathname, item.menuId);
                  return (
                    <button
                      key={item.label}
                      onMouseEnter={() => openMenu(item.menuId)}
                      onMouseLeave={scheduleClose}
                      onFocus={() => openMenu(item.menuId)}
                      onBlur={scheduleClose}
                      onClick={() => isMenuOpen ? closeMenu() : openMenu(item.menuId)}
                      aria-haspopup="true"
                      aria-expanded={isMenuOpen}
                      role="menuitem"
                      className={cn(
                        "flex items-center gap-0.5 rounded-lg px-2.5 py-2 text-[13px] font-medium outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500/40",
                        linkColor,
                        isActive && "bg-slate-950/[0.06] text-slate-950 dark:bg-white/10 dark:text-white",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "mt-px h-3.5 w-3.5 opacity-40 transition-transform duration-200",
                          isMenuOpen && "rotate-180 opacity-60",
                        )}
                      />
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    role="menuitem"
                    onMouseEnter={scheduleClose}
                    className={cn(
                      "rounded-lg px-2.5 py-2 text-[13px] font-medium outline-none transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500/40",
                      linkColor,
                      pathname === item.href && "bg-slate-950/[0.06] text-slate-950 dark:bg-white/10 dark:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right actions ────────────────────────────────────────────── */}
            <div className="ml-auto flex shrink-0 items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={
                  !mounted ? "Toggle theme"
                    : isDark ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                className={cn(
                  "hidden h-8 w-8 items-center justify-center rounded-lg border transition-all duration-150 lg:flex",
                  "border-slate-200/80 bg-white/45 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400",
                )}
              >
                <ThemeIcon isDark={isDark} mounted={mounted} />
              </button>

              {/* Contact Us — outline */}
              <Button
                asChild
                variant="outline"
                size="sm"
                className={cn(
                  "hidden h-8 rounded-lg text-[12.5px] font-semibold lg:inline-flex",
                  "border-slate-200/80 bg-white/45 text-slate-900 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300",
                )}
              >
                <Link href="/contact">Contact Us</Link>
              </Button>

              {/* Get a Quote — filled */}
              <Button
                asChild
                size="sm"
                className="hidden h-8 rounded-lg bg-indigo-600 px-4 text-[12.5px] font-semibold text-white shadow-sm hover:bg-indigo-700 lg:inline-flex"
              >
                <Link href="/request-quote">Get a Quote</Link>
              </Button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-150 lg:hidden",
                  "border-slate-200/80 bg-white/45 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/10",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="close"
                      initial={{ rotate: -45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 45, opacity: 0 }}
                      transition={{ duration: 0.14 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span key="menu"
                      initial={{ rotate: 45, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -45, opacity: 0 }}
                      transition={{ duration: 0.14 }}
                    >
                      <Menu className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Open indicator line */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Floating desktop mega panel ────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && activeMenu && (
          <motion.div
            className="pointer-events-none fixed inset-x-0 top-16 z-40 hidden px-4 pt-3 lg:block"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -10, transition: { duration: 0.16, ease: "easeIn" } }
            }
            transition={PANEL_SPRING}
            role="dialog"
            aria-label={`${activeMenu.id} menu`}
          >
            <motion.div
              layout
              className={cn(
                "pointer-events-auto mx-auto w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-slate-200 bg-white/96 p-4 shadow-[0_28px_90px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.78)] ring-1 ring-slate-950/[0.04] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/92 dark:shadow-[0_30px_96px_rgba(0,0,0,0.64),inset_0_1px_0_rgba(255,255,255,0.08)] dark:ring-white/[0.03]",
                getPanelWidthClass(MENUS[activeMenu.id]!),
              )}
              transition={PANEL_SPRING}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="grid overflow-hidden">
                <AnimatePresence initial={false} custom={activeMenu.direction}>
                  <PanelContent
                    key={activeMenu.id}
                    menuId={activeMenu.id}
                    config={MENUS[activeMenu.id]!}
                    direction={activeMenu.direction}
                    pathname={pathname}
                    onClose={closeMenu}
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click-outside backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-30 hidden bg-slate-950/10 backdrop-blur-[2px] lg:block dark:bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* ── Mobile menu ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="fixed inset-x-0 top-16 z-50 lg:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mx-3 mt-2 overflow-hidden rounded-xl border border-white/35 bg-background/78 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/76 dark:shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
                <div className="max-h-[calc(100dvh-5.5rem)] overflow-y-auto p-3">

                  {NAV_ITEMS.map((item) => {
                    if ("menuId" in item) {
                      const config = MENUS[item.menuId];
                      const isExpanded = mobileExpanded === item.menuId;
                      const isActive = isSectionActive(pathname, item.menuId);
                      return (
                        <div key={item.label}>
                          <button
                            onClick={() => setMobileExpanded(isExpanded ? null : item.menuId)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-colors hover:bg-muted",
                              isActive
                                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-400/[0.12] dark:text-indigo-300"
                                : "text-foreground",
                            )}
                          >
                            {item.label}
                            <ChevronDown className={cn(
                              "h-4 w-4 text-muted-foreground/50 transition-transform duration-200",
                              isExpanded && "rotate-180",
                            )} />
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="grid grid-cols-1 gap-1.5 px-1 pb-2 pt-1">
                                  {config?.cards.map((card, ii) => {
                                    const isCardActive = isHrefActive(pathname, card.href);
                                    return (
                                      <Link
                                        key={ii}
                                        href={card.href}
                                        onClick={() => setMobileOpen(false)}
                                        aria-current={isCardActive ? "page" : undefined}
                                        className={cn(
                                          "flex items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors hover:border-indigo-200 hover:bg-indigo-50/70 dark:hover:border-white/10 dark:hover:bg-white/[0.05]",
                                          isCardActive
                                            ? "border-indigo-300 bg-indigo-50 text-indigo-950 dark:border-indigo-400/35 dark:bg-indigo-400/[0.12] dark:text-indigo-100"
                                            : "border-transparent text-foreground",
                                        )}
                                      >
                                        <div className={cn(
                                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br",
                                          card.gradient,
                                        )}>
                                          <card.Icon className="h-4 w-4 text-white" />
                                        </div>
                                        <div>
                                          <p className="text-[13px] font-semibold">
                                            {card.label}
                                          </p>
                                          <p className="text-[11px] leading-snug text-muted-foreground">
                                            {card.description}
                                          </p>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                  {config?.footer && (
                                    <Link
                                      href={config.footer.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/40"
                                    >
                                      {config.footer.label}
                                      <ArrowRight className="h-3 w-3" />
                                    </Link>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-colors hover:bg-muted",
                          pathname === item.href || pathname.startsWith(`${item.href}/`)
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}

                  {/* Mobile bottom actions */}
                  <div className="mt-2 flex items-center gap-2 border-t border-border px-1 pb-1 pt-3">
                    <button
                      onClick={() => setTheme(isDark ? "light" : "dark")}
                      aria-label={
                        !mounted ? "Toggle theme"
                          : isDark ? "Switch to light mode"
                          : "Switch to dark mode"
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400"
                    >
                      <ThemeIcon isDark={isDark} mounted={mounted} />
                    </button>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border text-foreground"
                    >
                      <Link href="/contact" onClick={() => setMobileOpen(false)}>
                        Contact Us
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      <Link href="/request-quote" onClick={() => setMobileOpen(false)}>
                        Get a Quote
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
