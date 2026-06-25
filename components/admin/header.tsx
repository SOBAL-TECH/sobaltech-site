"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Bell, ChevronRight, Home, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

// ─── Path → label map ─────────────────────────────────────────────────────────

const SEGMENT_LABELS: Record<string, string> = {
  admin: "Admin",
  dashboard: "Dashboard",
  services: "Services",
  projects: "Projects",
  blog: "Blog",
  testimonials: "Testimonials",
  team: "Team",
  inbox: "Inbox",
  settings: "Settings",
  new: "New",
  edit: "Edit",
};

function buildBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((seg, i) => ({
    label: SEGMENT_LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  notificationCount?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AdminHeader({ user, notificationCount = 0 }: AdminHeaderProps) {
  const pathname = usePathname();
  const breadcrumbs = buildBreadcrumbs(pathname);
  const _pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label ?? "Dashboard";

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ST";

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-background px-4 sm:px-6">
      {/* Spacer for mobile sidebar toggle */}
      <div className="w-10 shrink-0 lg:hidden" />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-1 items-center gap-1.5 overflow-hidden"
      >
        <Link
          href="/admin/dashboard"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="h-3.5 w-3.5 shrink-0" />
          <span className="sr-only">Dashboard</span>
        </Link>
        {breadcrumbs.slice(1).map((crumb) => (
          <span key={crumb.href} className="flex items-center gap-1.5 min-w-0">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
            {crumb.isLast ? (
              <span
                className="truncate text-sm font-medium text-foreground"
                aria-current="page"
              >
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="truncate text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8 text-muted-foreground hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <span
              className={cn(
                "absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[9px] font-bold text-white",
              )}
            >
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </Button>

        <Separator orientation="vertical" className="h-5" />

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 gap-2 px-2 text-muted-foreground hover:text-foreground"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={user.image ?? undefined}
                  alt={user.name ?? "User"}
                />
                <AvatarFallback className="bg-brand-500/10 text-brand-600 text-[10px] font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-xs font-medium sm:block">
                {user.name ?? "Admin"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium">{user.name ?? "Admin"}</p>
                <p className="text-xs text-muted-foreground">
                  {user.email ?? ""}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/settings" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile & Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:text-destructive"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
