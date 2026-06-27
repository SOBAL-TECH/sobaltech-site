"use client";

import * as React from "react";
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Hi, I’m SobalTech’s assistant. I can help you choose a service, understand our process, or prepare a project brief.",
  },
];

const SUGGESTIONS = [
  "What service should I choose?",
  "How do I request a quote?",
  "Can you help me plan a web app?",
];

export function ChatbotWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>(STARTER_MESSAGES);
  const [input, setInput] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  const sendMessage = async (value?: string) => {
    const content = (value ?? input).trim();
    if (!content || isPending) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { message?: string; error?: string };
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            data.message ??
            data.error ??
            "I could not answer that right now. Please try again.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "The chatbot could not connect. Please try again or email hello@sobaltech.com.",
        },
      ]);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[calc(100vw-2.5rem)] max-w-[380px] overflow-hidden rounded-3xl border border-slate-200/80 bg-white/88 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/88 dark:shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          <div className="border-b border-border bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">SobalTech AI</p>
                  <p className="text-xs text-white/75">Project guidance assistant</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="max-h-[390px] min-h-[320px] overflow-y-auto p-4">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-6",
                      message.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "border border-border bg-muted/60 text-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isPending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/60 px-3.5 py-2.5 text-sm text-muted-foreground">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Thinking…
                  </div>
                </div>
              )}
            </div>
          </div>

          {messages.length === STARTER_MESSAGES.length && (
            <div className="border-t border-border px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:hover:border-indigo-400/30 dark:hover:text-indigo-300"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about your project…"
              className="h-10 min-w-0 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-indigo-400"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isPending || !input.trim()}
              className="h-10 w-10 shrink-0 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
              aria-label="Send message"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((value) => !value)}
        className="group flex h-14 items-center gap-3 rounded-full bg-slate-950 px-4 text-white shadow-[0_18px_50px_rgba(15,23,42,0.28)] transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
          {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
          {!open && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>
          )}
        </span>
        <span className="hidden text-sm font-semibold sm:inline-flex">
          Ask AI
        </span>
        <Sparkles className="hidden h-3.5 w-3.5 opacity-60 sm:block" />
      </button>
    </div>
  );
}
