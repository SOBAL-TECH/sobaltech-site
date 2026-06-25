import { cn } from "@/lib/utils";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  xs: "h-3 w-3 border-[1.5px]",
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
  xl: "h-12 w-12 border-4",
};

export function LoadingSpinner({
  size = "md",
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      className={cn("inline-flex flex-col items-center gap-2", className)}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-primary/20 border-t-primary",
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      {label && (
        <span className="text-sm text-muted-foreground">{label}</span>
      )}
      <span className="sr-only">{label ?? "Loading..."}</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <LoadingSpinner size="lg" label="Loading..." />
    </div>
  );
}
