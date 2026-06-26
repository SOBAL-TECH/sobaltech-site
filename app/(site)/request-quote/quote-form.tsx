"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  Send,
  Sparkles,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  QuoteFormSchema,
  type QuoteFormValues,
} from "@/lib/validations/contact";
import { submitQuoteRequest } from "@/lib/actions/quote";

// ─── Form options ─────────────────────────────────────────────────────────────

const PROJECT_TYPES = [
  "New Web Application",
  "Mobile App (iOS/Android)",
  "E-Commerce Platform",
  "SaaS Product",
  "API / Backend Service",
  "Cloud Infrastructure",
  "AI / ML Integration",
  "UI/UX Design",
  "Website Redesign",
  "Other",
] as const;

const SERVICES = [
  "Web Development",
  "Mobile App Development",
  "Cloud & DevOps",
  "UI/UX Design",
  "API Development",
  "AI Integration",
  "Cybersecurity",
  "Penetration Testing",
  "Network Engineering",
  "Data Analytics",
  "Technical Consulting",
  "IT Training",
  "Code Audit",
] as const;

const BUDGET_RANGES = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k – $250k",
  "$250k+",
  "Not sure yet",
] as const;

const TIMELINES = [
  "ASAP (under 4 weeks)",
  "1 – 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "12+ months",
  "Flexible",
] as const;

// ─── Success message ──────────────────────────────────────────────────────────

function SuccessState({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="flex flex-col items-center gap-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] py-16 px-8 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10">
        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold text-foreground">
          Request Received!
        </h2>
        <p className="text-muted-foreground">
          Thanks, {name}! Our team is already reviewing your project details.
          We&apos;ll have a tailored proposal in your inbox within 2–3 business
          days.
        </p>
      </div>
      <div className="rounded-xl border bg-card p-5 text-left w-full max-w-sm space-y-3">
        <p className="text-sm font-semibold text-foreground">
          What happens next?
        </p>
        <ol className="space-y-2 text-sm text-muted-foreground list-none">
          {[
            "Our team reviews your requirements",
            "We prepare a tailored proposal & timeline",
            "We schedule a 30-min discovery call",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(QuoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
      services: [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: QuoteFormValues) => {
    setServerError(null);
    const result = await submitQuoteRequest(data);
    if (result.success) {
      setSubmittedName(data.name);
      setSubmitted(true);
    } else {
      setServerError(result.message);
    }
  };

  if (submitted) {
    return <SuccessState name={submittedName} />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="h-3 w-3" />
          Free, no-obligation quote
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Tell us about your project
        </h2>
        <p className="text-muted-foreground text-sm">
          The more detail you provide, the more accurate our proposal will be.
          All fields marked * are required.
        </p>
      </div>

      {/* Server error */}
      {serverError && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* ── Section 1: Contact details ── */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold text-foreground border-b pb-2 w-full">
              Contact Details
            </legend>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Alex Johnson" {...field} />
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
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="alex@company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+233 ..."
                        {...field}
                      />
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
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>

          {/* ── Section 2: Project details ── */}
          <fieldset className="space-y-5">
            <legend className="text-sm font-semibold text-foreground border-b pb-2 w-full">
              Project Details
            </legend>

            {/* Project type */}
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type *</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="What are you building?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROJECT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Services needed */}
            <FormField
              control={form.control}
              name="services"
              render={() => (
                <FormItem>
                  <FormLabel>Services Needed *</FormLabel>
                  <FormDescription>
                    Select all the services you require for this project.
                  </FormDescription>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {SERVICES.map((service) => (
                      <FormField
                        key={service}
                        control={form.control}
                        name="services"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-2.5 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(service)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([
                                      ...(field.value ?? []),
                                      service,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value?.filter(
                                        (v) => v !== service,
                                      ) ?? [],
                                    );
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {service}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget + Timeline */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range</FormLabel>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BUDGET_RANGES.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Timeline</FormLabel>
                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="When do you need it?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TIMELINES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description *</FormLabel>
                  <FormDescription>
                    Describe your project goals, target audience, key features,
                    and any specific technical requirements.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="We're building a SaaS dashboard for e-commerce merchants that tracks inventory in real time. The main features are..."
                      rows={7}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          {/* Submit */}
          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full bg-brand-gradient hover:opacity-90 transition-opacity text-white font-semibold shadow-glow gap-2 h-12 text-base"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Quote Request
                </>
              )}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Free of charge · No commitment · Proposal within 2–3 business days
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
