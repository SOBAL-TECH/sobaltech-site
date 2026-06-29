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
import { Button } from "@/components/ui/button";
import {
  JobApplicationSchema,
  type JobApplicationValues,
} from "@/lib/validations/careers";
import { submitJobApplication } from "@/lib/actions/careers";

function SuccessMessage({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center gap-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-12 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/15">
        <CheckCircle2 className="h-7 w-7 text-emerald-500" />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Application Submitted!</h3>
        <p className="text-sm text-muted-foreground">
          Thanks, {name}. We will review your application and be in touch within
          5–7 business days.
        </p>
      </div>
    </motion.div>
  );
}

export function JobApplicationForm({ jobId }: { jobId: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<JobApplicationValues>({
    resolver: zodResolver(JobApplicationSchema),
    defaultValues: {
      jobId,
      name: "",
      email: "",
      phone: "",
      linkedIn: "",
      portfolioUrl: "",
      coverLetter: "",
    },
  });

  const { formState: { isSubmitting } } = form;

  const onSubmit = async (data: JobApplicationValues) => {
    setServerError(null);
    const result = await submitJobApplication(data);
    if (result.success) {
      setSubmittedName(data.name);
      setSubmitted(true);
    } else {
      setServerError(result.message);
    }
  };

  if (submitted) return <SuccessMessage name={submittedName} />;

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-bold tracking-tight">Apply for this role</h2>
        <p className="text-sm text-muted-foreground">
          Fill in the form below and we will get back to you within 5–7 business days.
        </p>
      </div>

      {serverError && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                    <Input type="email" placeholder="alex@example.com" {...field} />
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
                    <Input type="tel" placeholder="+233 ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="portfolioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio / GitHub / Website</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us why you are a great fit for this role, relevant experience, and what you are most excited to work on..."
                    rows={8}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="bg-brand-gradient w-full gap-2 text-white hover:opacity-90 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Application
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            By submitting you agree to our{" "}
            <a href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </a>
            . We will never share your details with third parties.
          </p>
        </form>
      </Form>
    </div>
  );
}
