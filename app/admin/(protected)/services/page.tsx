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
  getAllServicesAdmin,
  deleteService,
  toggleServicePublish,
} from "@/lib/actions/admin-services";
import { formatDate } from "@/lib/utils";
import type { Service } from "@/types";

// ─── Columns ─────────────────────────────────────────────────────────────────

const COLUMNS: DataTableColumn<Service>[] = [
  {
    key: "title",
    label: "Title",
    render: (row) => (
      <div>
        <p className="font-medium">{row.title}</p>
        <p className="text-xs text-muted-foreground">/services/{row.slug}</p>
      </div>
    ),
  },
  {
    key: "isPublished",
    label: "Status",
    render: (row) =>
      row.isPublished ? (
        <Badge className="rounded-full bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10">
          Published
        </Badge>
      ) : (
        <Badge variant="secondary" className="rounded-full">
          Draft
        </Badge>
      ),
  },
  {
    key: "order",
    label: "Order",
    className: "w-20",
  },
  {
    key: "features",
    label: "Features",
    render: (row) => (
      <span className="text-muted-foreground">{row.features.length}</span>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminServicesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [services, setServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getAllServicesAdmin()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (service: Service) => {
    if (!confirm(`Delete "${service.title}"? This cannot be undone.`)) return;
    const result = await deleteService(service.id);
    toast({
      title: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
      setServices((prev) => prev.filter((s) => s.id !== service.id));
    }
  };

  const handleTogglePublish = async (service: Service) => {
    const result = await toggleServicePublish(service.id);
    toast({
      title: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id ? { ...s, isPublished: !s.isPublished } : s
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="text-sm text-muted-foreground">
            Manage your service offerings.
          </p>
        </div>
        <Link href="/admin/services/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </Link>
      </div>

      <DataTable
        columns={COLUMNS}
        data={services}
        isLoading={loading}
        emptyMessage="No services yet. Add your first service."
        actions={{
          onEdit: (row) => router.push(`/admin/services/${row.id}/edit`),
          onDelete: handleDelete,
          onTogglePublish: handleTogglePublish,
          isPublished: (row) => row.isPublished,
        }}
      />
    </div>
  );
}
