import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogForm } from "@/components/admin/blog-form";
import { Button } from "@/components/ui/button";
import { getBlogPostById } from "@/lib/actions/admin-blog";

export const metadata: Metadata = { title: "Edit Blog Post" };

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Edit Post</h1>
          <p className="text-sm text-muted-foreground truncate max-w-xs">{post.title}</p>
        </div>
      </div>

      <BlogForm post={post} />
    </div>
  );
}
