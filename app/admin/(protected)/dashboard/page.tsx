import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Package,
  FolderOpen,
  BookOpen,
  Mail,
  Plus,
  ArrowRight,
  MessageSquare,
  FileText,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { StatCard } from "@/components/admin/stat-card";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };

// ─── Data ─────────────────────────────────────────────────────────────────────

async function getDashboardData() {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalServices,
    totalProducts,
    totalProjects,
    totalBlogPosts,
    newContacts,
    newQuotes,
    recentContacts,
    recentQuotes,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.product.count(),
    prisma.project.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.contactSubmission.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    }),
    prisma.quoteRequest.count({
      where: { createdAt: { gte: sevenDaysAgo } },
    }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.quoteRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return {
    totalServices,
    totalProducts,
    totalProjects,
    totalBlogPosts,
    newContacts,
    newQuotes,
    recentContacts,
    recentQuotes,
  };
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    NEW: {
      label: "New",
      className: "bg-brand-500/10 text-brand-600 border-brand-500/20",
    },
    IN_REVIEW: {
      label: "In Review",
      className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    RESPONDED: {
      label: "Responded",
      className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    CLOSED: {
      label: "Closed",
      className: "bg-muted text-muted-foreground border-border",
    },
  };
  const { label, className } = map[status] ?? map.NEW;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${className}`}
    >
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back — here&apos;s what&apos;s happening.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/blog/new">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New Post
            </Button>
          </Link>
          <Link href="/admin/projects/new">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard
          icon={Briefcase}
          label="Services"
          value={data.totalServices}
          iconClassName="bg-brand-500/10 text-brand-500"
        />
        <StatCard
          icon={Package}
          label="Products"
          value={data.totalProducts}
          iconClassName="bg-cyan-500/10 text-cyan-500"
        />
        <StatCard
          icon={FolderOpen}
          label="Projects"
          value={data.totalProjects}
          iconClassName="bg-violet-500/10 text-violet-500"
        />
        <StatCard
          icon={BookOpen}
          label="Published Posts"
          value={data.totalBlogPosts}
          iconClassName="bg-emerald-500/10 text-emerald-500"
        />
        <StatCard
          icon={Mail}
          label="New Inquiries"
          value={data.newContacts + data.newQuotes}
          trendLabel="last 7 days"
          iconClassName="bg-amber-500/10 text-amber-500"
        />
      </div>

      {/* Recent activity grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent contacts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              Recent Contact Submissions
            </CardTitle>
            <Link href="/admin/inbox">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {data.recentContacts.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No submissions yet.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {data.recentContacts.map((c) => (
                  <li key={c.id} className="flex items-start gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">
                          {c.name}
                        </span>
                        <StatusBadge status={c.status} />
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        {c.subject}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground/70">
                        {formatRelativeDate(c.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Recent quotes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Recent Quote Requests
            </CardTitle>
            <Link href="/admin/inbox">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {data.recentQuotes.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No quote requests yet.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {data.recentQuotes.map((q) => (
                  <li key={q.id} className="flex items-start gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">
                          {q.name}
                        </span>
                        <StatusBadge status={q.status} />
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        {q.projectType}
                        {q.budget ? ` · ${q.budget}` : ""}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground/70">
                        {formatRelativeDate(q.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              {
                label: "Add Service",
                href: "/admin/services/new",
                icon: Briefcase,
              },
              {
                label: "Add Project",
                href: "/admin/projects/new",
                icon: FolderOpen,
              },
              { label: "Write Post", href: "/admin/blog/new", icon: BookOpen },
              { label: "View Inbox", href: "/admin/inbox", icon: Mail },
            ].map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
