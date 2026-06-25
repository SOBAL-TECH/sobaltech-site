"use client";

import { useState } from "react";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewsletterSignup({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");

    // Simulate subscribe — replace with your actual newsletter API (e.g. Resend Audiences)
    await new Promise<void>((res) => setTimeout(res, 900));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 py-2 text-sm text-brand-300",
          className,
        )}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        <span>You&apos;re in! Check your inbox for a confirmation.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <Input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email address"
        className="h-9 flex-1 min-w-0 bg-white/[0.05] border-white/10 text-white placeholder:text-white/25 focus-visible:border-brand-500/50 focus-visible:ring-brand-500/20 text-sm"
      />
      <Button
        type="submit"
        size="sm"
        disabled={status === "loading"}
        aria-label="Subscribe"
        className="h-9 shrink-0 bg-brand-500 hover:bg-brand-600 text-white px-3"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
