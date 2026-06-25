import {
  Activity,
  BarChart3,
  Bot,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  GitBranch,
  MessageSquare,
  Palette,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceVisualProps = {
  slug?: string | null;
  className?: string;
  size?: "card" | "hero" | "wide";
};

function MacbookDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1deg]">
      <div className="rounded-t-[1.5rem] border border-white/15 bg-slate-900 p-2 shadow-2xl shadow-indigo-500/20">
        <div className="overflow-hidden rounded-[1rem] border border-white/10 bg-slate-950">
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-3 rounded-full bg-white/8 px-3 py-1 text-[10px] text-slate-400">
              app.sobaltech.dev
            </span>
          </div>
          <div className="grid grid-cols-[0.28fr_1fr] gap-0">
            <div className="border-r border-white/10 bg-white/[0.03] p-3">
              <div className="mb-5 h-7 w-20 rounded-lg bg-white/10" />
              <div className="space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-7 rounded-lg",
                      i === 1 ? "bg-indigo-400/25" : "bg-white/[0.06]"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="h-3 w-24 rounded-full bg-white/20" />
                  <div className="mt-2 h-2 w-36 rounded-full bg-white/10" />
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-semibold text-emerald-300">
                  Live
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["$84k", "Revenue"],
                  ["12.8k", "Users"],
                  ["99.9%", "Uptime"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
                    <p className="text-lg font-bold text-white">{value}</p>
                    <p className="mt-1 text-[10px] text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="flex h-24 items-end gap-2">
                  {[40, 58, 46, 72, 64, 88, 76, 96].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-500 to-cyan-300 transition-all duration-500 group-hover:from-cyan-400 group-hover:to-fuchsia-400"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto h-3 w-[72%] rounded-b-[2rem] bg-gradient-to-r from-slate-700 via-slate-300 to-slate-700" />
    </div>
  );
}

function MobileScreens() {
  return (
    <div className="relative flex justify-center py-2">
      <div className="absolute top-10 h-40 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
      {[0, 1].map((phone) => (
        <div
          key={phone}
          className={cn(
            "relative w-32 rounded-[2rem] border border-white/15 bg-slate-900 p-2 shadow-2xl shadow-cyan-500/15 transition-transform duration-500",
            phone === 0
              ? "z-10 rotate-[-7deg] group-hover:-translate-x-2 group-hover:rotate-[-11deg]"
              : "-ml-8 mt-8 rotate-[8deg] group-hover:translate-x-2 group-hover:rotate-[12deg]"
          )}
        >
          <div className="overflow-hidden rounded-[1.55rem] bg-slate-950">
            <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/20" />
            <div className="p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-300 to-indigo-500" />
                <Smartphone className="h-4 w-4 text-slate-400" />
              </div>
              <div className="h-3 w-20 rounded-full bg-white/20" />
              <div className="mt-2 h-2 w-16 rounded-full bg-white/10" />
              <div className="mt-5 space-y-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-xl bg-white/[0.06] p-2">
                    <div className="h-2 w-16 rounded-full bg-white/20" />
                    <div className="mt-2 h-1.5 w-20 rounded-full bg-white/10" />
                  </div>
                ))}
              </div>
              <div className="mt-4 h-8 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CloudPipeline() {
  return (
    <div className="relative mx-auto max-w-md rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-violet-500/15 transition-transform duration-500 group-hover:-translate-y-2">
      <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: GitBranch, label: "Commit" },
          { icon: Server, label: "Build" },
          { icon: Cloud, label: "Deploy" },
        ].map((item) => (
          <div key={item.label} className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400">
              <item.icon className="h-5 w-5 text-white" />
            </div>
            <p className="mt-3 text-xs font-semibold text-white">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
          <CheckCircle2 className="h-4 w-4" />
          Production healthy
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {["99.99%", "82ms", "0 errors"].map((item) => (
            <div key={item} className="rounded-lg bg-black/20 px-2 py-1 text-center text-[11px] text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesignCanvas() {
  return (
    <div className="relative mx-auto max-w-md rounded-[1.75rem] border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-rose-500/15 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-rose-300" />
          <span className="text-xs font-semibold text-white">Design system</span>
        </div>
        <div className="h-6 w-16 rounded-full bg-white/10" />
      </div>
      <div className="grid grid-cols-[0.7fr_1fr] gap-3">
        <div className="space-y-3">
          {["Brand", "Buttons", "Cards", "Forms"].map((item, i) => (
            <div key={item} className={cn("rounded-xl p-3 text-[11px]", i === 1 ? "bg-rose-400/20 text-rose-200" : "bg-white/[0.06] text-slate-400")}>
              {item}
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="h-20 rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 transition-transform duration-500 group-hover:scale-[1.03]" />
          <div className="mt-4 h-3 w-32 rounded-full bg-white/20" />
          <div className="mt-2 h-2 w-40 rounded-full bg-white/10" />
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["#6366F1", "#EC4899", "#06B6D4"].map((color) => (
              <div key={color} className="h-9 rounded-xl bg-white/[0.07]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApiConsole() {
  return (
    <div className="relative mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 shadow-2xl shadow-emerald-500/15 transition-transform duration-500 group-hover:-translate-y-2">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <Terminal className="ml-auto h-4 w-4 text-slate-400" />
      </div>
      <div className="p-5 font-mono text-xs">
        <p className="text-emerald-300">POST /v1/workflows</p>
        <div className="mt-4 space-y-2 text-slate-400">
          <p>{"{"}</p>
          <p className="pl-4"><span className="text-cyan-300">"status"</span>: <span className="text-amber-200">"queued"</span>,</p>
          <p className="pl-4"><span className="text-cyan-300">"webhook"</span>: <span className="text-amber-200">"verified"</span>,</p>
          <p className="pl-4"><span className="text-cyan-300">"latency"</span>: <span className="text-amber-200">"42ms"</span></p>
          <p>{"}"}</p>
        </div>
        <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-200">
          <Activity className="mr-2 inline h-4 w-4" />
          Integration test passed
        </div>
      </div>
    </div>
  );
}

function AiWorkspace() {
  return (
    <div className="relative mx-auto max-w-md rounded-[1.75rem] border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-fuchsia-500/15 transition-transform duration-500 group-hover:-translate-y-2">
      <div className="mb-4 flex items-center gap-2">
        <Bot className="h-5 w-5 text-fuchsia-300" />
        <p className="text-sm font-semibold text-white">AI workflow</p>
      </div>
      <div className="space-y-3">
        <div className="mr-10 rounded-2xl rounded-tl-sm bg-white/[0.07] p-3 text-xs leading-5 text-slate-300">
          Summarize the latest support tickets and flag urgent accounts.
        </div>
        <div className="ml-10 rounded-2xl rounded-tr-sm bg-gradient-to-br from-fuchsia-500/25 to-cyan-500/20 p-3 text-xs leading-5 text-white">
          Found 8 urgent accounts. Drafted response paths and routed 3 billing issues.
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2">
        {[Database, MessageSquare, BarChart3].map((Icon, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
            <Icon className="h-4 w-4 text-cyan-300" />
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServiceVisual({ slug, className, size = "hero" }: ServiceVisualProps) {
  const visual = (() => {
    switch (slug) {
      case "mobile-apps":
        return <MobileScreens />;
      case "cloud-devops":
        return <CloudPipeline />;
      case "ui-ux-design":
        return <DesignCanvas />;
      case "api-development":
        return <ApiConsole />;
      case "ai-integration":
        return <AiWorkspace />;
      case "web-development":
      default:
        return <MacbookDashboard />;
    }
  })();

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.18),transparent_35%)]",
        size === "card" && "rounded-[1.35rem] p-3",
        size === "wide" && "border-slate-200 bg-slate-950 p-6 dark:border-white/10",
        className
      )}
    >
      {visual}
    </div>
  );
}
