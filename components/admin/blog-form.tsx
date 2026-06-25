"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { slugify } from "@/lib/utils";
import { BlogPostFormSchema, type BlogPostFormValues } from "@/lib/validations/blog";
import { createBlogPost, updateBlogPost } from "@/lib/actions/admin-blog";
import type { BlogPost } from "@/types";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface BlogFormProps {
  post?: BlogPost;
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = !!post;
  const [isPending, setIsPending] = React.useState(false);
  const [tagInput, setTagInput] = React.useState("");

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(BlogPostFormSchema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      coverImage: post?.coverImage ?? "",
      tags: post?.tags ?? [],
      author: post?.author ?? "SobalTech Team",
      authorImage: post?.authorImage ?? "",
      status: post?.status ?? "DRAFT",
      isFeatured: post?.isFeatured ?? false,
      readTime: post?.readTime ?? 5,
      publishedAt: post?.publishedAt ?? null,
      seoTitle: post?.seoTitle ?? "",
      seoDesc: post?.seoDesc ?? "",
    },
  });

  const title = form.watch("title");
  React.useEffect(() => {
    if (!isEdit) {
      form.setValue("slug", slugify(title), { shouldValidate: false });
    }
  }, [title, isEdit, form]);

  const tags = form.watch("tags");

  const addTag = () => {
    const t = tagInput.trim();
    if (!t || tags.includes(t)) return;
    form.setValue("tags", [...tags, t]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    form.setValue("tags", tags.filter((t) => t !== tag));
  };

  const onSubmit = async (data: BlogPostFormValues) => {
    setIsPending(true);
    try {
      const result = isEdit
        ? await updateBlogPost(post.id, data)
        : await createBlogPost(data);

      if (result.success) {
        toast({ title: result.message });
        router.push("/admin/blog");
        router.refresh();
      } else {
        toast({ title: result.message, variant: "destructive" });
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, msgs]) => {
            form.setError(field as keyof BlogPostFormValues, {
              message: (msgs as string[])[0],
            });
          });
        }
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* ── Main ───────────────────────────────────────────────────── */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="How We Built a Real-time Analytics Dashboard" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug *</FormLabel>
                      <FormControl>
                        <Input placeholder="how-we-built-realtime-dashboard" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        /blog/{field.value || "slug"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A compelling 1–2 sentence summary…"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        {field.value.length}/400
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content *</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Write your blog post…"
                          minHeight={400}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Next.js, TypeScript, Performance…"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-0.5 rounded-full hover:text-destructive"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Leave blank to use post title" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        {(field.value ?? "").length}/70
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seoDesc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea rows={2} placeholder="Leave blank to use excerpt" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        {(field.value ?? "").length}/160
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* ── Sidebar ──────────────────────────────────────────────── */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Publishing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="PUBLISHED">Published</SelectItem>
                          <SelectItem value="ARCHIVED">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-2">
                      <div>
                        <FormLabel className="text-sm">Featured</FormLabel>
                        <FormDescription className="text-xs">
                          Shown as hero post on blog listing
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator />

                <FormField
                  control={form.control}
                  name="readTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Read Time (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={120} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Author</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="SobalTech Team" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="authorImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEdit ? "Save Changes" : "Create Post"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push("/admin/blog")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
