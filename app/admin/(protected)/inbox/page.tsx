"use client";

import * as React from "react";
import { Mail, FileText, Eye, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable, type DataTableColumn } from "@/components/admin/data-table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  getContactSubmissions,
  getQuoteRequests,
  updateContactStatus,
  updateQuoteStatus,
} from "@/lib/actions/admin-settings";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import type {
  ContactSubmission,
  QuoteRequest,
  SubmissionStatus,
} from "@/types";

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: SubmissionStatus }) {
  const map: Record<SubmissionStatus, string> = {
    NEW: "bg-brand-500/10 text-brand-600 border-brand-500/20",
    IN_REVIEW: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    RESPONDED: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    CLOSED: "bg-muted text-muted-foreground border-border",
  };
  const labels: Record<SubmissionStatus, string> = {
    NEW: "New",
    IN_REVIEW: "In Review",
    RESPONDED: "Responded",
    CLOSED: "Closed",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${map[status]}`}
    >
      {labels[status]}
    </span>
  );
}

// ─── Detail sheet ─────────────────────────────────────────────────────────────

function ContactDetail({
  item,
  onClose: _onClose,
  onStatusChange,
}: {
  item: ContactSubmission;
  onClose: () => void;
  onStatusChange: (id: string, status: SubmissionStatus) => void;
}) {
  const { toast } = useToast();
  const [status, setStatus] = React.useState<SubmissionStatus>(item.status);
  const [saving, setSaving] = React.useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setSaving(true);
    const result = await updateContactStatus(
      item.id,
      newStatus as SubmissionStatus,
    );
    toast({
      title: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
      setStatus(newStatus as SubmissionStatus);
      onStatusChange(item.id, newStatus as SubmissionStatus);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <StatusBadge status={status} />
        <Select
          value={status}
          onValueChange={handleStatusChange}
          disabled={saving}
        >
          <SelectTrigger className="h-8 w-36 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="IN_REVIEW">In Review</SelectItem>
            <SelectItem value="RESPONDED">Responded</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <dl className="space-y-3 text-sm">
        {[
          { label: "Name", value: item.name },
          { label: "Email", value: item.email },
          { label: "Phone", value: item.phone },
          { label: "Company", value: item.company },
          { label: "Subject", value: item.subject },
          { label: "Submitted", value: formatDate(item.createdAt) },
        ].map(({ label, value }) =>
          value ? (
            <div key={label} className="grid grid-cols-3 gap-2">
              <dt className="font-medium text-muted-foreground">{label}</dt>
              <dd className="col-span-2 break-words">{value}</dd>
            </div>
          ) : null,
        )}
      </dl>

      <Separator />

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Message
        </p>
        <p className="whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
          {item.message}
        </p>
      </div>
    </div>
  );
}

function QuoteDetail({
  item,
  onClose: _onClose,
  onStatusChange,
}: {
  item: QuoteRequest;
  onClose: () => void;
  onStatusChange: (id: string, status: SubmissionStatus) => void;
}) {
  const { toast } = useToast();
  const [status, setStatus] = React.useState<SubmissionStatus>(item.status);
  const [saving, setSaving] = React.useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setSaving(true);
    const result = await updateQuoteStatus(
      item.id,
      newStatus as SubmissionStatus,
    );
    toast({
      title: result.message,
      variant: result.success ? "default" : "destructive",
    });
    if (result.success) {
      setStatus(newStatus as SubmissionStatus);
      onStatusChange(item.id, newStatus as SubmissionStatus);
    }
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <StatusBadge status={status} />
        <Select
          value={status}
          onValueChange={handleStatusChange}
          disabled={saving}
        >
          <SelectTrigger className="h-8 w-36 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NEW">New</SelectItem>
            <SelectItem value="IN_REVIEW">In Review</SelectItem>
            <SelectItem value="RESPONDED">Responded</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <dl className="space-y-3 text-sm">
        {[
          { label: "Name", value: item.name },
          { label: "Email", value: item.email },
          { label: "Phone", value: item.phone },
          { label: "Company", value: item.company },
          { label: "Project Type", value: item.projectType },
          { label: "Budget", value: item.budget },
          { label: "Timeline", value: item.timeline },
          { label: "Submitted", value: formatDate(item.createdAt) },
        ].map(({ label, value }) =>
          value ? (
            <div key={label} className="grid grid-cols-3 gap-2">
              <dt className="font-medium text-muted-foreground">{label}</dt>
              <dd className="col-span-2 break-words">{value}</dd>
            </div>
          ) : null,
        )}
      </dl>

      {item.services.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Services
          </p>
          <div className="flex flex-wrap gap-1.5">
            {item.services.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="rounded-full text-xs"
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator />

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Description
        </p>
        <p className="whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InboxPage() {
  const [contacts, setContacts] = React.useState<ContactSubmission[]>([]);
  const [quotes, setQuotes] = React.useState<QuoteRequest[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedContact, setSelectedContact] =
    React.useState<ContactSubmission | null>(null);
  const [selectedQuote, setSelectedQuote] = React.useState<QuoteRequest | null>(
    null,
  );

  React.useEffect(() => {
    const load = async () => {
      try {
        const [c, q] = await Promise.all([
          getContactSubmissions(),
          getQuoteRequests(),
        ]);
        setContacts(c);
        setQuotes(q);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const contactColumns: DataTableColumn<ContactSubmission>[] = [
    {
      key: "name",
      label: "From",
      render: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    { key: "subject", label: "Subject" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {formatRelativeDate(row.createdAt)}
        </span>
      ),
    },
  ];

  const quoteColumns: DataTableColumn<QuoteRequest>[] = [
    {
      key: "name",
      label: "From",
      render: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    { key: "projectType", label: "Project Type" },
    {
      key: "budget",
      label: "Budget",
      render: (row) => (
        <span className="text-muted-foreground">{row.budget ?? "—"}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) => (
        <span className="text-sm text-muted-foreground">
          {formatRelativeDate(row.createdAt)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inbox</h1>
        <p className="text-sm text-muted-foreground">
          Contact submissions and quote requests.
        </p>
      </div>

      <Tabs defaultValue="contacts">
        <TabsList>
          <TabsTrigger value="contacts" className="gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            Contact
            {contacts.filter((c) => c.status === "NEW").length > 0 && (
              <Badge className="ml-1 h-4 rounded-full bg-brand-500 px-1.5 text-[10px] text-white">
                {contacts.filter((c) => c.status === "NEW").length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="quotes" className="gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Quotes
            {quotes.filter((q) => q.status === "NEW").length > 0 && (
              <Badge className="ml-1 h-4 rounded-full bg-brand-500 px-1.5 text-[10px] text-white">
                {quotes.filter((q) => q.status === "NEW").length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="mt-4">
          <DataTable
            columns={contactColumns}
            data={contacts}
            isLoading={loading}
            emptyMessage="No contact submissions yet."
            actions={{
              extraActions: [
                {
                  label: "View Details",
                  icon: Eye,
                  onClick: (row) => setSelectedContact(row),
                },
              ],
            }}
          />
        </TabsContent>

        <TabsContent value="quotes" className="mt-4">
          <DataTable
            columns={quoteColumns}
            data={quotes}
            isLoading={loading}
            emptyMessage="No quote requests yet."
            actions={{
              extraActions: [
                {
                  label: "View Details",
                  icon: Eye,
                  onClick: (row) => setSelectedQuote(row),
                },
              ],
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Contact detail sheet */}
      <Sheet
        open={!!selectedContact}
        onOpenChange={(o) => !o && setSelectedContact(null)}
      >
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle>Contact Submission</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="mt-6">
            {selectedContact && (
              <ContactDetail
                item={selectedContact}
                onClose={() => setSelectedContact(null)}
                onStatusChange={(id, status) => {
                  setContacts((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, status } : c)),
                  );
                  if (selectedContact?.id === id) {
                    setSelectedContact((prev) =>
                      prev ? { ...prev, status } : null,
                    );
                  }
                }}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Quote detail sheet */}
      <Sheet
        open={!!selectedQuote}
        onOpenChange={(o) => !o && setSelectedQuote(null)}
      >
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader className="flex flex-row items-center justify-between">
            <SheetTitle>Quote Request</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </SheetHeader>
          <div className="mt-6">
            {selectedQuote && (
              <QuoteDetail
                item={selectedQuote}
                onClose={() => setSelectedQuote(null)}
                onStatusChange={(id, status) => {
                  setQuotes((prev) =>
                    prev.map((q) => (q.id === id ? { ...q, status } : q)),
                  );
                  if (selectedQuote?.id === id) {
                    setSelectedQuote((prev) =>
                      prev ? { ...prev, status } : null,
                    );
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
