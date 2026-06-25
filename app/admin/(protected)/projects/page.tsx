"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  getAllProjectsAdmin,
  deleteProject,
  toggleProjectPublish,
} from "@/lib/actions/admin-projects";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

const COLUMNS: DataTableColumn<Project>[] = [
  {
    key: "title",
    label: "Project",
    render: (row) => (
      <div>
        <p className="font-medium">{row.title}</p>
        <p className="text-xs text-muted-foreground">{row.client ?? "—"}</p>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <Badge
        variant="secondary"
        className={
          row.status === "COMPLETED"
            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
            : row.status === "IN_PROGRESS"
              ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
              : ""
        }
      >
        {row.status.replace("_", " ")}
      </Badge>
    ),
  },
  {
    key: "isPublished",
    label: "Published",
    render: (row) =>
      row.isPublished ? (
        <Badge className="rounded-full bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10">
          Yes
        </Badge>
      ) : (
        <Badge variant="secondary" className="rounded-full">
          No
        </Badge>
      ),
  },
  {
    key: "isFeatured",
    label: "Featured",
    render: (row) =>
      row.isFeatured ? (
        <span className="text-xs text-brand-500">★ Featured</span>
      ) : (
        <span className="text-xs text-muted-foreground">—</span>
      ),
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row) => (
      <span className="text-sm text-muted-foreground">{formatDate(row.createdAt)}</span>
    ),
  },
];

export default function AdminProjectsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getAllProjectsAdmin()
      .then(setProjects)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (project: Project) => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    const result = await deleteProject(project.id);
    toast({ title: result.message, variant: result.success ? "default" : "destructive" });
    if (result.success) setProjects((prev) => prev.filter((p) => p.id !== project.id));
  };

  const handleTogglePublish = async (project: Project) => {
    const result = await toggleProjectPublish(project.id);
    toast({ title: result.message, variant: result.success ? "default" : "destructive" });
    if (result.success) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, isPublished: !p.isPublished } : p))
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage your portfolio projects.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      <DataTable
        columns={COLUMNS}
        data={projects}
        isLoading={loading}
        emptyMessage="No projects yet. Add your first project."
        actions={{
          onEdit: (row) => router.push(`/admin/projects/${row.id}/edit`),
          onDelete: handleDelete,
          onTogglePublish: handleTogglePublish,
          isPublished: (row) => row.isPublished,
        }}
      />
    </div>
  );
}
