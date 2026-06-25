"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, X } from "lucide-react";
import { slugify } from "@/lib/utils";
import { ServiceFormSchema, type ServiceFormValues } from "@/lib/validations/service";
import { createService, updateService } from "@/lib/actions/admin-services";
import type { Service } from "@/types";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

// ─── Props ────────────────────────────────────────────────────────────────────

interface ServiceFormProps {
  service?: Service;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEdit = !!service;
  const [isPending, setIsPending] = React.useState(false);
  const [featureInput, setFeatureInput] = React.useState("");

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(ServiceFormSchema),
    defaultValues: {
      title: service?.title ?? "",
      slug: service?.slug ?? "",
      description: service?.description ?? "",
      content: service?.content ?? "",
      icon: service?.icon ?? "",
      image: service?.image ?? "",
      features: service?.features ?? [],
      order: service?.order ?? 0,
      isPublished: service?.isPublished ?? true,
      seoTitle: service?.seoTitle ?? "",
      seoDesc: service?.seoDesc ?? "",
    },
  });

  // Auto-generate slug from title (only for new services)
  const title = form.watch("title");
  React.useEffect(() => {
    if (!isEdit) {
      form.setValue("slug", slugify(title), { shouldValidate: false });
    }
  }, [title, isEdit, form]);

  const features = form.watch("features");

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (!trimmed) return;
    form.setValue("features", [...features, trimmed]);
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    form.setValue(
      "features",
      features.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data: ServiceFormValues) => {
    setIsPending(true);
    try {
      const result = isEdit ? await updateService(service.id, data) : await createService(data);

      if (result.success) {
        toast({ title: result.message });
        router.push("/admin/services");
        router.refresh();
      } else {
        toast({
          title: result.message,
          variant: "destructive",
        });
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, msgs]) => {
            form.setError(field as keyof ServiceFormValues, {
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
          {/* ── Main content ─────────────────────────────────────────── */}
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Service Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Web Development" {...field} />
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
                          <Input placeholder="web-development" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs">
                          URL: /services/{field.value || "slug"}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <Input placeholder="Globe (lucide name)" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs">Lucide icon name</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief summary shown on listing pages…"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        {field.value.length}/500
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
                      <FormLabel>Full Content *</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Describe the service in detail…"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Features</CardTitle>
                <CardDescription className="text-xs">
                  Key capabilities or highlights shown on the service page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a feature…"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={addFeature}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {features.length > 0 && (
                  <ul className="space-y-1.5">
                    {features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-sm"
                      >
                        <span>{feature}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 shrink-0 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFeature(i)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
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
                        <Input placeholder="Leave blank to use service title" {...field} />
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
                        <Textarea
                          placeholder="Leave blank to use short description"
                          rows={2}
                          {...field}
                        />
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
                        <FormDescription className="text-xs">
                          Visible on the public site
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
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">Lower = shown first</FormDescription>
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
                  name="image"
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
                {isEdit ? "Save Changes" : "Create Service"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push("/admin/services")}
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
