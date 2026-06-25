"use client";

import * as React from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  /** The current image URL (controlled) */
  value?: string;
  onChange: (url: string | undefined) => void;
  /**
   * Called when the user selects a file. The parent is responsible for
   * uploading via useUploadThing and passing back the resulting URL.
   */
  onFileSelect?: (file: File) => void;
  /** Whether an upload is in progress (controlled externally) */
  isUploading?: boolean;
  /** Max file size label shown in the UI, e.g. "4MB" */
  maxSizeLabel?: string;
  disabled?: boolean;
  className?: string;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"];

export function ImageUpload({
  value,
  onChange,
  onFileSelect,
  isUploading = false,
  maxSizeLabel = "4MB",
  disabled = false,
  className,
}: ImageUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const validateAndSelect = (file: File) => {
    setError(null);
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a PNG, JPG, GIF, or WebP image.");
      return;
    }
    onFileSelect?.(file);
  };

  // --- Drag & drop handlers ---
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading && !value) setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (disabled || isUploading || value) return;

    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSelect(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSelect(file);
    // Reset so the same file can be re-selected if removed
    e.target.value = "";
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
    setError(null);
  };

  // --- Preview ---
  if (value) {
    return (
      <div className={cn("relative", className)}>
        <div className="group relative h-48 w-full overflow-hidden rounded-lg border bg-muted">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/40">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={disabled}
              className="opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="mr-1.5 h-4 w-4" />
              Remove
            </Button>
          </div>
        </div>
        {/* Always-visible remove button for keyboard/screen reader accessibility */}
        <button
          type="button"
          onClick={handleRemove}
          disabled={disabled}
          aria-label="Remove image"
          className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow-md transition-transform hover:scale-110 disabled:opacity-50"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  // --- Dropzone ---
  const isInteractive = !disabled && !isUploading;

  return (
    <div className={cn("space-y-2", className)}>
      <div
        role="button"
        tabIndex={isInteractive ? 0 : -1}
        aria-label="Upload image"
        onClick={() => isInteractive && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === "Enter" || e.key === " ")) {
            inputRef.current?.click();
          }
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "relative flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isDragActive
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/60",
          !isInteractive && "cursor-not-allowed opacity-60",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="sr-only"
          onChange={handleFileChange}
          disabled={!isInteractive}
          tabIndex={-1}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Uploading…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
                isDragActive ? "bg-primary/15" : "bg-muted",
              )}
            >
              <ImagePlus
                className={cn(
                  "h-6 w-6 transition-colors",
                  isDragActive ? "text-primary" : "text-muted-foreground",
                )}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragActive ? "Drop to upload" : "Click or drag & drop"}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF, WebP up to {maxSizeLabel}
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
