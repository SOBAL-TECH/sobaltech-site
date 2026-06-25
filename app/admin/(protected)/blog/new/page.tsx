import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/blog-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "New Blog Post" };

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">New Blog Post</h1>
          <p className="text-sm text-muted-foreground">Write and publish a new article.</p>
        </div>
      </div>

      <BlogForm />
    </div>
  );
}
