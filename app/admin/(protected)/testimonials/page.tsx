"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Star, Loader2 } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialPublish,
} from "@/lib/actions/admin-testimonials";
import {
  TestimonialFormSchema,
  type TestimonialFormValues,
} from "@/lib/validations/testimonial";
import { formatDate } from "@/lib/utils";
import type { Testimonial } from "@/types";

// ─── Columns ─────────────────────────────────────────────────────────────────

const COLUMNS: DataTableColumn<Testimonial>[] = [
  {
    key: "name",
    label: "Person",
    render: (row) => (
      <div>
        <p className="font-medium">{row.name}</p>
        <p className="text-xs text-muted-foreground">
          {row.role} @ {row.company}
        </p>
      </div>
    ),
  },
  {
    key: "rating",
    label: "Rating",
    render: (row) => (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < row.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
          />
        ))}
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
          Hidden
        </Badge>
      ),
  },
  {
    key: "createdAt",
    label: "Added",
    render: (row) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.createdAt)}
      </span>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminTestimonialsPage() {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Testimonial | null>(null);
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(TestimonialFormSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      avatar: "",
      content: "",
      rating: 5,
      isFeatured: false,
      isPublished: true,
      order: 0,
    },
  });

  React.useEffect(() => {
    getAllTestimonialsAdmin()
      .then(setTestimonials)
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    form.reset({
      name: "",
      role: "",
      company: "",
      avatar: "",
      content: "",
      rating: 5,
      isFeatured: false,
      isPublished: true,
      order: 0,
    });
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (t: Testimonial) => {
    form.reset({
      name: t.name,
      role: t.role,
      company: t.company,
      avatar: t.avatar ?? "",
      content: t.content,
      rating: t.rating,
      isFeatured: t.isFeatured,
      isPublished: t.isPublished,
      order: t.order,
    });
    setEditing(t);
    setDialogOpen(true);
  };

  const onSubmit = async (data: TestimonialFormValues) => {
    setIsPending(true);
    try {
      const result = editing
        ? await updateTestimonial(editing.id, data)
        : await createTestimonial(data);

      toast({
        title: result.message,
        variant: result.success ? "default" : "destructive",
      });

      if (result.success) {
        setDialogOpen(false);
        const fresh = await getAllTestimonialsAdmin();
        setTestimonials(fresh);
      }
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (t: Testimonial) => {
    if (!confirm(`Delete testimonial from "${t.name}"?`)) return;
    const result = await deleteTestimonial(t.id);
    toast({
      title: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success)
      setTestimonials((prev) => prev.filter((x) => x.id !== t.id));
  };

  const handleTogglePublish = async (t: Testimonial) => {
    const result = await toggleTestimonialPublish(t.id);
    toast({
      title: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
      setTestimonials((prev) =>
        prev.map((x) =>
          x.id === t.id ? { ...x, isPublished: !x.isPublished } : x,
        ),
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-sm text-muted-foreground">
            Manage client testimonials.
          </p>
        </div>
        <Button className="gap-2" onClick={openNew}>
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <DataTable
        columns={COLUMNS}
        data={testimonials}
        isLoading={loading}
        emptyMessage="No testimonials yet."
        actions={{
          onEdit: openEdit,
          onDelete: handleDelete,
          onTogglePublish: handleTogglePublish,
          isPublished: (row) => row.isPublished,
        }}
      />

      {/* Add / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (1-5)</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role *</FormLabel>
                      <FormControl>
                        <Input placeholder="CEO" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company *</FormLabel>
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
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Testimonial *</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="What they said…"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatar"
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

              <div className="flex items-center gap-6">
                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Published</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="!mt-0">Featured</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editing ? "Save Changes" : "Add Testimonial"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
