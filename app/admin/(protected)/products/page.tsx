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
  getAllProductsAdmin,
  deleteProduct,
  toggleProductPublish,
} from "@/lib/actions/admin-products";
import { formatDate } from "@/lib/utils";
import type { Product } from "@/types";

const COLUMNS: DataTableColumn<Product>[] = [
  {
    key: "title",
    label: "Title",
    render: (row) => (
      <div>
        <p className="font-medium">{row.title}</p>
        <p className="text-xs text-muted-foreground">/products/{row.slug}</p>
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
    key: "price",
    label: "Price",
    render: (row) => (
      <span className="text-sm text-muted-foreground">{row.price ?? "—"}</span>
    ),
  },
  {
    key: "order",
    label: "Order",
    className: "w-20",
  },
  {
    key: "createdAt",
    label: "Created",
    render: (row) => (
      <span className="text-sm text-muted-foreground">{formatDate(row.createdAt)}</span>
    ),
  },
];

export default function AdminProductsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getAllProductsAdmin()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.title}"? This cannot be undone.`)) return;
    const result = await deleteProduct(product.id);
    toast({
      title: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    }
  };

  const handleTogglePublish = async (product: Product) => {
    const result = await toggleProductPublish(product.id);
    toast({
      title: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, isPublished: !p.isPublished } : p
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">
            Manage reusable productized offers.
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <DataTable
        columns={COLUMNS}
        data={products}
        isLoading={loading}
        emptyMessage="No products yet. Add your first product."
        actions={{
          onEdit: (row) => router.push(`/admin/products/${row.id}/edit`),
          onDelete: handleDelete,
          onTogglePublish: handleTogglePublish,
          isPublished: (row) => row.isPublished,
        }}
      />
    </div>
  );
}
