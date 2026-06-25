import * as React from "react";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

// ─── Props ────────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  /** Percentage change. Positive = up, negative = down, 0/undefined = neutral */
  trend?: number;
  trendLabel?: string;
  iconClassName?: string;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendLabel,
  iconClassName,
  className,
}: StatCardProps) {
  const hasTrend = trend !== undefined && trend !== null;
  const isUp = hasTrend && trend > 0;
  const isDown = hasTrend && trend < 0;
  const isNeutral = hasTrend && trend === 0;

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>

            {hasTrend && (
              <div className="mt-2 flex items-center gap-1">
                {isUp && (
                  <>
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      +{trend}%
                    </span>
                  </>
                )}
                {isDown && (
                  <>
                    <TrendingDown className="h-3 w-3 text-red-500" />
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                      {trend}%
                    </span>
                  </>
                )}
                {isNeutral && (
                  <>
                    <Minus className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground">0%</span>
                  </>
                )}
                {trendLabel && (
                  <span className="text-xs text-muted-foreground">{trendLabel}</span>
                )}
              </div>
            )}
          </div>

          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              iconClassName ?? "bg-brand-500/10"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                iconClassName ? "text-current" : "text-brand-500"
              )}
            />
          </div>
        </div>
      </CardContent>

      {/* Subtle accent line at bottom */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-0.5",
          isUp
            ? "bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
            : isDown
              ? "bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
              : "bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"
        )}
      />
    </Card>
  );
}
