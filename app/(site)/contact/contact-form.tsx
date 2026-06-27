"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ContactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { submitContactForm } from "@/lib/actions/contact";

// ─── Subject options ──────────────────────────────────────────────────────────

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Project Request",
  "Partnership Opportunity",
  "Technical Support",
  "Pricing Question",
  "Press & Media",
  "Other",
] as const;

// ─── Success state ────────────────────────────────────────────────────────────

function SuccessMessage({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-12 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/20">
        <CheckCircle2 className="h-7 w-7 text-emerald-500" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-foreground">
          Message Received!
        </h3>
        <p className="text-muted-foreground text-sm">
          Thanks, {name}! We&apos;ll get back to you within 1 to 2 business days.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    const result = await submitContactForm(data);
    if (result.success) {
      setSubmittedName(data.name);
      setSubmitted(true);
    } else {
      setServerError(result.message);
    }
  };

  if (submitted) {
    return <SuccessMessage name={submittedName} />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Send us a message
        </h2>
        <p className="text-muted-foreground text-sm">
          Fill in the form and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      {serverError && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Name + Email */}
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

          {/* Phone + Company */}
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

          {/* Subject (Select) */}
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject *</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {SUBJECT_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project, question, or idea..."
                    rows={6}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="bg-brand-gradient hover:opacity-90 transition-opacity text-white font-semibold shadow-glow gap-2 w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            By submitting this form you agree to our{" "}
            <a href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </a>
            . We&apos;ll never share your details with third parties.
          </p>
        </form>
      </Form>
    </div>
  );
}
