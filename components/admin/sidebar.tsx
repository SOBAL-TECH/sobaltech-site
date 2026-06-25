"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Briefcase,
  Package,
  FolderOpen,
  BookOpen,
  Star,
  Users,
  Mail,
  Settings,
  LogOut,
  ChevronLeft,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// ─── Nav config ───────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Projects", href: "/admin/projects", icon: FolderOpen },
  { label: "Blog", href: "/admin/blog", icon: BookOpen },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Inbox", href: "/admin/inbox", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface AdminSidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  unreadCount?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminSidebar({ user, unreadCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ST";

  const navItems = NAV_ITEMS.map((item) =>
    item.href === "/admin/inbox" && unreadCount > 0
      ? { ...item, badge: unreadCount }
      : item
  );

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const SidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-2.5 border-b border-border px-4 py-4",
          collapsed ? "justify-center px-2" : ""
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-gradient shadow-glow">
          <Zap className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="truncate text-sm font-bold tracking-tight">SobalTech</span>
            <Badge
              variant="secondary"
              className="shrink-0 rounded-md bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-brand-500"
            >
              Admin
            </Badge>
          </div>
        )}
      </div>

      {/* Navigation */}
      <TooltipProvider delayDuration={0}>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-all",
                          active
                            ? "bg-brand-500/10 text-brand-600 dark:text-brand-400"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          collapsed && "justify-center px-2"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            active ? "text-brand-500" : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.badge !== undefined && item.badge > 0 && (
                              <Badge className="h-5 min-w-5 rounded-full bg-brand-500 px-1.5 text-[10px] text-white">
                                {item.badge > 99 ? "99+" : item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="flex items-center gap-2">
                        {item.label}
                        {item.badge !== undefined && item.badge > 0 && (
                          <Badge className="h-4 rounded-full bg-brand-500 px-1 text-[10px] text-white">
                            {item.badge}
                          </Badge>
                        )}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </nav>
      </TooltipProvider>

      {/* Collapse toggle (desktop) */}
      <div className="hidden border-t border-border px-2 py-2 lg:block">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full justify-start gap-2 text-muted-foreground hover:text-foreground",
            collapsed && "justify-center"
          )}
        >
          <ChevronLeft
            className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
          />
          {!collapsed && <span className="text-xs">Collapse</span>}
        </Button>
      </div>

      {/* User info + sign out */}
      <div
        className={cn(
          "border-t border-border p-3",
          collapsed ? "flex flex-col items-center gap-2" : "flex items-center gap-2"
        )}
      >
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={user.image ?? undefined} alt={user.name ?? "User"} />
          <AvatarFallback className="bg-brand-500/10 text-brand-600 text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{user.name ?? "Admin"}</p>
            <p className="truncate text-[11px] text-muted-foreground">{user.email ?? ""}</p>
          </div>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="sr-only">Sign out</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side={collapsed ? "right" : "top"}>Sign out</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-7 w-7"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        {SidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden h-screen shrink-0 border-r border-border bg-background transition-all duration-200 lg:block",
          collapsed ? "w-14" : "w-56"
        )}
      >
        {SidebarContent}
      </aside>
    </>
  );
}
