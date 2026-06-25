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
  getAllBlogPostsAdmin,
  deleteBlogPost,
  toggleBlogPostPublish,
} from "@/lib/actions/admin-blog";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

const COLUMNS: DataTableColumn<BlogPost>[] = [
  {
    key: "title",
    label: "Post",
    render: (row) => (
      <div>
        <p className="font-medium">{row.title}</p>
        <p className="text-xs text-muted-foreground">{row.author}</p>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (row) => {
      const map = {
        PUBLISHED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
        DRAFT: "",
        ARCHIVED: "bg-muted text-muted-foreground",
      };
      return (
        <Badge variant="secondary" className={map[row.status] ?? ""}>
          {row.status}
        </Badge>
      );
    },
  },
  {
    key: "isFeatured",
    label: "Featured",
    render: (row) =>
      row.isFeatured ? (
        <span className="text-xs text-brand-500">★</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    key: "readTime",
    label: "Read",
    render: (row) => <span className="text-muted-foreground">{row.readTime} min</span>,
  },
  {
    key: "publishedAt",
    label: "Published",
    render: (row) => (
      <span className="text-sm text-muted-foreground">
        {row.publishedAt ? formatDate(row.publishedAt) : "—"}
      </span>
    ),
  },
];

export default function AdminBlogPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getAllBlogPostsAdmin()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    const result = await deleteBlogPost(post.id);
    toast({ title: result.message, variant: result.success ? "default" : "destructive" });
    if (result.success) setPosts((prev) => prev.filter((p) => p.id !== post.id));
  };

  const handleTogglePublish = async (post: BlogPost) => {
    const result = await toggleBlogPostPublish(post.id);
    toast({ title: result.message, variant: result.success ? "default" : "destructive" });
    if (result.success) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? { ...p, status: p.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" }
            : p
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog</h1>
          <p className="text-sm text-muted-foreground">Manage your blog posts.</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <DataTable
        columns={COLUMNS}
        data={posts}
        isLoading={loading}
        emptyMessage="No posts yet. Write your first blog post."
        actions={{
          onEdit: (row) => router.push(`/admin/blog/${row.id}/edit`),
          onDelete: handleDelete,
          onTogglePublish: handleTogglePublish,
          isPublished: (row) => row.status === "PUBLISHED",
        }}
      />
    </div>
  );
}
