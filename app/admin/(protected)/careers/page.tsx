"use client";

import * as React from "react";
import { Briefcase, Eye, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import { useToast } from "@/components/ui/use-toast";
import {
  getAllJobPostingsAdmin,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  toggleJobPostingPublish,
  getAllApplicationsAdmin,
  updateApplicationStatus,
  updateApplicationNotes,
} from "@/lib/actions/admin-careers";
import {
  JobPostingFormSchema,
  type JobPostingFormValues,
} from "@/lib/validations/careers";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import type { ApplicationStatus, JobApplication, JobPosting } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type JobWithCount = JobPosting & { _count: { applications: number } };
type ApplicationWithJob = JobApplication & { job: { title: string; slug: string } };

// ─── Status helpers ───────────────────────────────────────────────────────────

const APP_STATUS_LABELS: Record<ApplicationStatus, string> = {
  NEW: "New",
  REVIEWING: "Reviewing",
  SHORTLISTED: "Shortlisted",
  INTERVIEWED: "Interviewed",
  OFFERED: "Offered",
  REJECTED: "Rejected",
};

const APP_STATUS_STYLES: Record<ApplicationStatus, string> = {
  NEW: "bg-brand-500/10 text-brand-600 border-brand-500/20",
  REVIEWING: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  SHORTLISTED: "bg-violet-500/10 text-violet-600 border-violet-500/20",
  INTERVIEWED: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  OFFERED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  REJECTED: "bg-muted text-muted-foreground border-border",
};

function AppStatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${APP_STATUS_STYLES[status]}`}
    >
      {APP_STATUS_LABELS[status]}
    </span>
  );
}

// ─── Lines textarea helper ────────────────────────────────────────────────────

function LinesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function ArrayToLines(arr: string[]): string {
  return arr.join("\n");
}

// ─── Job Posting Form ─────────────────────────────────────────────────────────

function JobPostingForm({
  job,
  onSuccess,
}: {
  job?: JobPosting;
  onSuccess: (job: JobPosting) => void;
}) {
  const { toast } = useToast();
  const isEdit = !!job;

  const form = useForm<JobPostingFormValues>({
    resolver: zodResolver(JobPostingFormSchema),
    defaultValues: {
      title: job?.title ?? "",
      slug: job?.slug ?? "",
      department: job?.department ?? "",
      type: job?.type ?? "Full-time",
      location: job?.location ?? "Remote",
      summary: job?.summary ?? "",
      description: job?.description ?? "",
      requirements: job?.requirements ?? [],
      responsibilities: job?.responsibilities ?? [],
      isPublished: job?.isPublished ?? true,
      closingDate: job?.closingDate
        ? new Date(job.closingDate).toISOString().split("T")[0]
        : "",
      order: job?.order ?? 0,
      seoTitle: job?.seoTitle ?? "",
      seoDesc: job?.seoDesc ?? "",
    },
  });

  const [requirementsText, setRequirementsText] = React.useState(
    ArrayToLines(job?.requirements ?? [])
  );
  const [responsibilitiesText, setResponsibilitiesText] = React.useState(
    ArrayToLines(job?.responsibilities ?? [])
  );

  const titleValue = form.watch("title");
  React.useEffect(() => {
    if (!isEdit && titleValue) {
      form.setValue(
        "slug",
        titleValue
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .slice(0, 100)
      );
    }
  }, [titleValue, isEdit, form]);

  const onSubmit = async (data: JobPostingFormValues) => {
    const payload = {
      ...data,
      requirements: LinesToArray(requirementsText),
      responsibilities: LinesToArray(responsibilitiesText),
    };

    const result = isEdit
      ? await updateJobPosting(job.id, payload)
      : await createJobPosting(payload);

    toast({ title: result.message, variant: result.success ? "default" : "destructive" });

    if (result.success) {
      onSuccess({ ...job, ...payload } as JobPosting);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Senior Full-Stack Engineer" {...field} />
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
                  <Input placeholder="senior-full-stack-engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department *</FormLabel>
                <FormControl>
                  <Input placeholder="Engineering" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type *</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Full-time", "Part-time", "Contract", "Project-based"].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location *</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Remote", "On-site", "Hybrid"].map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  placeholder="One or two sentences describing the role..."
                  rows={2}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Full role description. HTML supported."
                  rows={6}
                  className="resize-none font-mono text-xs"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Requirements (one per line)</label>
            <Textarea
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              placeholder="Strong TypeScript and React experience&#10;Comfortable owning backend and frontend work"
              rows={5}
              className="resize-none text-xs"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Responsibilities (one per line)</label>
            <Textarea
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              placeholder="Build and maintain production web applications&#10;Collaborate with design on implementation"
              rows={5}
              className="resize-none text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="closingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Closing Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Published</FormLabel>
                <FormControl>
                  <div className="flex items-center pt-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="seoTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Title</FormLabel>
                <FormControl>
                  <Input placeholder="Optional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seoDesc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SEO Description</FormLabel>
                <FormControl>
                  <Input placeholder="Optional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting
            ? "Saving..."
            : isEdit
            ? "Update Job Posting"
            : "Create Job Posting"}
        </Button>
      </form>
    </Form>
  );
}

// ─── Application Detail ───────────────────────────────────────────────────────

function ApplicationDetail({
  item,
  onStatusChange,
}: {
  item: ApplicationWithJob;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}) {
  const { toast } = useToast();
  const [status, setStatus] = React.useState<ApplicationStatus>(item.status);
  const [notes, setNotes] = React.useState(item.notes ?? "");
  const [saving, setSaving] = React.useState(false);
  const [savingNotes, setSavingNotes] = React.useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setSaving(true);
    const result = await updateApplicationStatus(item.id, newStatus as ApplicationStatus);
    toast({ title: result.message, variant: result.success ? "default" : "destructive" });
    if (result.success) {
      setStatus(newStatus as ApplicationStatus);
      onStatusChange(item.id, newStatus as ApplicationStatus);
    }
    setSaving(false);
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    const result = await updateApplicationNotes(item.id, notes);
    toast({ title: result.message, variant: result.success ? "default" : "destructive" });
    setSavingNotes(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <AppStatusBadge status={status} />
        <Select value={status} onValueChange={handleStatusChange} disabled={saving}>
          <SelectTrigger className="h-8 w-40 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(APP_STATUS_LABELS) as ApplicationStatus[]).map((s) => (
              <SelectItem key={s} value={s}>{APP_STATUS_LABELS[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <dl className="space-y-3 text-sm">
        {[
          { label: "Name", value: item.name },
          { label: "Email", value: item.email },
          { label: "Phone", value: item.phone },
          { label: "Role", value: item.job.title },
          { label: "Applied", value: formatDate(item.createdAt) },
        ].map(({ label, value }) =>
          value ? (
            <div key={label} className="grid grid-cols-3 gap-2">
              <dt className="font-medium text-muted-foreground">{label}</dt>
              <dd className="col-span-2 break-words">{value}</dd>
            </div>
          ) : null
        )}
        {item.linkedIn && (
          <div className="grid grid-cols-3 gap-2">
            <dt className="font-medium text-muted-foreground">LinkedIn</dt>
            <dd className="col-span-2">
              <a href={item.linkedIn} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline break-all">
                {item.linkedIn}
              </a>
            </dd>
          </div>
        )}
        {item.portfolioUrl && (
          <div className="grid grid-cols-3 gap-2">
            <dt className="font-medium text-muted-foreground">Portfolio</dt>
            <dd className="col-span-2">
              <a href={item.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:underline break-all">
                {item.portfolioUrl}
              </a>
            </dd>
          </div>
        )}
      </dl>

      <Separator />

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Cover Letter
        </p>
        <p className="whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
          {item.coverLetter}
        </p>
      </div>

      <Separator />

      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Internal Notes
        </p>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="resize-none text-sm"
          placeholder="Add internal notes about this candidate..."
        />
        <Button
          size="sm"
          variant="outline"
          onClick={handleSaveNotes}
          disabled={savingNotes}
        >
          {savingNotes ? "Saving..." : "Save Notes"}
        </Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminCareersPage() {
  const { toast } = useToast();

  const [jobs, setJobs] = React.useState<JobWithCount[]>([]);
  const [applications, setApplications] = React.useState<ApplicationWithJob[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [jobSheet, setJobSheet] = React.useState<{
    open: boolean;
    job?: JobPosting;
  }>({ open: false });
  const [selectedApp, setSelectedApp] = React.useState<ApplicationWithJob | null>(null);

  React.useEffect(() => {
    const load = async () => {
      try {
        const [j, a] = await Promise.all([
          getAllJobPostingsAdmin(),
          getAllApplicationsAdmin(),
        ]);
        setJobs(j as JobWithCount[]);
        setApplications(a as ApplicationWithJob[]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (job: JobWithCount) => {
    if (!confirm(`Delete "${job.title}"? All applications will also be deleted.`)) return;
    const result = await deleteJobPosting(job.id);
    toast({ title: result.message, variant: result.success ? "default" : "destructive" });
    if (result.success) {
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    }
  };

  const handleTogglePublish = async (job: JobWithCount) => {
    const result = await toggleJobPostingPublish(job.id);
    toast({ title: result.message, variant: result.success ? "default" : "destructive" });
    if (result.success) {
      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, isPublished: !j.isPublished } : j))
      );
    }
  };

  const jobColumns: DataTableColumn<JobWithCount>[] = [
    {
      key: "title",
      label: "Role",
      render: (row) => (
        <div>
          <p className="font-medium">{row.title}</p>
          <p className="text-xs text-muted-foreground">{row.department} · {row.type}</p>
        </div>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (row) => <span className="text-muted-foreground">{row.location}</span>,
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
      key: "_count",
      label: "Applications",
      render: (row) => (
        <span className="text-muted-foreground">{row._count.applications}</span>
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

  const appColumns: DataTableColumn<ApplicationWithJob>[] = [
    {
      key: "name",
      label: "Applicant",
      render: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      key: "job",
      label: "Role",
      render: (row) => (
        <span className="text-sm text-muted-foreground">{row.job.title}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <AppStatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      label: "Applied",
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {formatRelativeDate(row.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Careers</h1>
          <p className="text-sm text-muted-foreground">
            Manage job postings and review applications.
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => setJobSheet({ open: true, job: undefined })}
        >
          <Plus className="h-4 w-4" />
          Add Role
        </Button>
      </div>

      <Tabs defaultValue="postings">
        <TabsList>
          <TabsTrigger value="postings" className="gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            Job Postings
            {jobs.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-4 rounded-full px-1.5 text-[10px]">
                {jobs.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="applications" className="gap-1.5">
            Applications
            {applications.filter((a) => a.status === "NEW").length > 0 && (
              <Badge className="ml-1 h-4 rounded-full bg-brand-500 px-1.5 text-[10px] text-white">
                {applications.filter((a) => a.status === "NEW").length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="postings" className="mt-4">
          <DataTable
            columns={jobColumns}
            data={jobs}
            isLoading={loading}
            emptyMessage="No job postings yet. Add your first open role."
            actions={{
              onEdit: (row) => setJobSheet({ open: true, job: row }),
              onDelete: handleDelete,
              onTogglePublish: handleTogglePublish,
              isPublished: (row) => row.isPublished,
            }}
          />
        </TabsContent>

        <TabsContent value="applications" className="mt-4">
          <DataTable
            columns={appColumns}
            data={applications}
            isLoading={loading}
            emptyMessage="No applications yet."
            actions={{
              extraActions: [
                {
                  label: "View Details",
                  icon: Eye,
                  onClick: (row) => setSelectedApp(row),
                },
              ],
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Job posting create/edit sheet */}
      <Sheet
        open={jobSheet.open}
        onOpenChange={(o) => !o && setJobSheet({ open: false })}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle>
              {jobSheet.job ? "Edit Job Posting" : "New Job Posting"}
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="mt-6">
            <JobPostingForm
              key={jobSheet.job?.id ?? "new"}
              job={jobSheet.job}
              onSuccess={(updated) => {
                if (jobSheet.job) {
                  setJobs((prev) =>
                    prev.map((j) =>
                      j.id === updated.id
                        ? { ...j, ...updated }
                        : j
                    )
                  );
                } else {
                  getAllJobPostingsAdmin().then((j) =>
                    setJobs(j as JobWithCount[])
                  );
                }
                setJobSheet({ open: false });
              }}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Application detail sheet */}
      <Sheet
        open={!!selectedApp}
        onOpenChange={(o) => !o && setSelectedApp(null)}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle>Application</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="mt-6">
            {selectedApp && (
              <ApplicationDetail
                item={selectedApp}
                onStatusChange={(id, status) => {
                  setApplications((prev) =>
                    prev.map((a) => (a.id === id ? { ...a, status } : a))
                  );
                  if (selectedApp?.id === id) {
                    setSelectedApp((prev) => (prev ? { ...prev, status } : null));
                  }
                }}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
