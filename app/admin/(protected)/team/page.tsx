"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2 } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  getAllTeamMembersAdmin,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleTeamMemberPublish,
} from "@/lib/actions/admin-team";
import {
  TeamMemberFormSchema,
  type TeamMemberFormValues,
} from "@/lib/validations/team";
import type { TeamMember } from "@/types";

const COLUMNS: DataTableColumn<TeamMember>[] = [
  {
    key: "name",
    label: "Member",
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={row.avatar ?? undefined} alt={row.name} />
          <AvatarFallback className="text-xs">{row.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.role}</p>
        </div>
      </div>
    ),
  },
  {
    key: "email",
    label: "Email",
    render: (row) => (
      <span className="text-sm text-muted-foreground">{row.email ?? "—"}</span>
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
    key: "order",
    label: "Order",
    className: "w-20",
  },
];

export default function AdminTeamPage() {
  const { toast } = useToast();
  const [members, setMembers] = React.useState<TeamMember[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<TeamMember | null>(null);
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(TeamMemberFormSchema),
    defaultValues: {
      name: "",
      role: "",
      bio: "",
      avatar: "",
      email: "",
      linkedIn: "",
      twitter: "",
      github: "",
      order: 0,
      isPublished: true,
    },
  });

  React.useEffect(() => {
    getAllTeamMembersAdmin()
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    form.reset({
      name: "",
      role: "",
      bio: "",
      avatar: "",
      email: "",
      linkedIn: "",
      twitter: "",
      github: "",
      order: 0,
      isPublished: true,
    });
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (m: TeamMember) => {
    form.reset({
      name: m.name,
      role: m.role,
      bio: m.bio ?? "",
      avatar: m.avatar ?? "",
      email: m.email ?? "",
      linkedIn: m.linkedIn ?? "",
      twitter: m.twitter ?? "",
      github: m.github ?? "",
      order: m.order,
      isPublished: m.isPublished,
    });
    setEditing(m);
    setDialogOpen(true);
  };

  const onSubmit = async (data: TeamMemberFormValues) => {
    setIsPending(true);
    try {
      const result = editing
        ? await updateTeamMember(editing.id, data)
        : await createTeamMember(data);

      toast({ title: result.message, variant: result.success ? "default" : "destructive" });

      if (result.success) {
        setDialogOpen(false);
        const fresh = await getAllTeamMembersAdmin();
        setMembers(fresh);
      }
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (m: TeamMember) => {
    if (!confirm(`Remove "${m.name}" from the team?`)) return;
    const result = await deleteTeamMember(m.id);
    toast({ title: result.message, variant: result.success ? "default" : "destructive" });
    if (result.success) setMembers((prev) => prev.filter((x) => x.id !== m.id));
  };

  const handleToggle = async (m: TeamMember) => {
    const result = await toggleTeamMemberPublish(m.id);
    toast({ title: result.message, variant: result.success ? "default" : "destructive" });
    if (result.success) {
      setMembers((prev) =>
        prev.map((x) => (x.id === m.id ? { ...x, isPublished: !x.isPublished } : x))
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team</h1>
          <p className="text-sm text-muted-foreground">Manage team member profiles.</p>
        </div>
        <Button className="gap-2" onClick={openNew}>
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
      </div>

      <DataTable
        columns={COLUMNS}
        data={members}
        isLoading={loading}
        emptyMessage="No team members yet."
        actions={{
          onEdit: openEdit,
          onDelete: handleDelete,
          onTogglePublish: handleToggle,
          isPublished: (row) => row.isPublished,
        }}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
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
                        <Input placeholder="Alex Johnson" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role *</FormLabel>
                      <FormControl>
                        <Input placeholder="Lead Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Short bio…" {...field} />
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

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="alex@sobaltech.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-3">
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="https://…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input placeholder="https://…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input placeholder="https://…" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-6">
                <FormField
                  control={form.control}
                  name="isPublished"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="!mt-0">Published</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Order</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editing ? "Save Changes" : "Add Member"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
