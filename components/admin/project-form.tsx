"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { slugify } from "@/lib/utils";
import { ProjectFormSchema, type ProjectFormValues } from "@/lib/validations/project";
import { createProject, updateProject } from "@/lib/actions/admin-projects";
import type { Project } from "@/types";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface ProjectFormProps {
  project?: Project;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = !!project;
  const [isPending, setIsPending] = React.useState(false);
  const [tagInput, setTagInput] = React.useState("");
  const [imageInput, setImageInput] = React.useState("");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      title: project?.title ?? "",
      slug: project?.slug ?? "",
      summary: project?.summary ?? "",
      description: project?.description ?? "",
      coverImage: project?.coverImage ?? "",
      images: project?.images ?? [],
      tags: project?.tags ?? [],
      client: project?.client ?? "",
      liveUrl: project?.liveUrl ?? "",
      githubUrl: project?.githubUrl ?? "",
      status: project?.status ?? "COMPLETED",
      isFeatured: project?.isFeatured ?? false,
      order: project?.order ?? 0,
      isPublished: project?.isPublished ?? true,
      completedAt: project?.completedAt ?? null,
      seoTitle: project?.seoTitle ?? "",
      seoDesc: project?.seoDesc ?? "",
    },
  });

  const title = form.watch("title");
  React.useEffect(() => {
    if (!isEdit) {
      form.setValue("slug", slugify(title), { shouldValidate: false });
    }
  }, [title, isEdit, form]);

  const tags = form.watch("tags");
  const images = form.watch("images");

  const addTag = () => {
    const t = tagInput.trim();
    if (!t || tags.includes(t)) return;
    form.setValue("tags", [...tags, t]);
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    form.setValue("tags", tags.filter((t) => t !== tag));
  };

  const addImage = () => {
    const url = imageInput.trim();
    if (!url || images.includes(url)) return;
    form.setValue("images", [...images, url]);
    setImageInput("");
  };

  const removeImage = (url: string) => {
    form.setValue("images", images.filter((i) => i !== url));
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setIsPending(true);
    try {
      const result = isEdit
        ? await updateProject(project.id, data)
        : await createProject(data);

      if (result.success) {
        toast({ title: result.message });
        router.push("/admin/projects");
        router.refresh();
      } else {
        toast({ title: result.message, variant: "destructive" });
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, msgs]) => {
            form.setError(field as keyof ProjectFormValues, {
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
                <CardTitle className="text-base">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nexus AI Platform" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug *</FormLabel>
                        <FormControl>
                          <Input placeholder="nexus-ai-platform" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs">
                          /portfolio/{field.value || "slug"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Client</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Corp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Summary *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="One-paragraph summary for listing pages…"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        {field.value.length}/300
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description *</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Full case study content…"
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
                <CardTitle className="text-base">Tags / Tech Stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="React, TypeScript, AWS…"
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
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="gap-1 pr-1"
                      >
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

            {/* Gallery */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Image Gallery</CardTitle>
                <CardDescription className="text-xs">
                  Additional screenshots / images shown in the project gallery.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="https://…"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addImage();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={addImage}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {images.length > 0 && (
                  <ul className="space-y-1.5">
                    {images.map((url, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-xs"
                      >
                        <span className="truncate">{url}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeImage(url)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="liveUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Live URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://…" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/…" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                        <Input placeholder="Leave blank to use project title" {...field} />
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
                        <Textarea rows={2} placeholder="Leave blank to use summary" {...field} />
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
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between gap-2">
                      <div>
                        <FormLabel className="text-sm">Published</FormLabel>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
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
                          Shown on homepage
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
                          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                          <SelectItem value="ARCHIVED">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
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
                {isEdit ? "Save Changes" : "Create Project"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push("/admin/projects")}
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
