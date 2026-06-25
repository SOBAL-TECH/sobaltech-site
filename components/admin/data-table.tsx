"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ─── Column definition ────────────────────────────────────────────────────────

export interface DataTableColumn<T> {
  key: string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
}

// ─── Action config ────────────────────────────────────────────────────────────

export interface DataTableActions<T> {
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onTogglePublish?: (row: T) => void;
  isPublished?: (row: T) => boolean;
  editLabel?: string;
  deleteLabel?: string;
  extraActions?: Array<{
    label: string;
    icon?: React.ElementType;
    onClick: (row: T) => void;
    className?: string;
  }>;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface DataTableProps<T extends { id: string }> {
  columns: DataTableColumn<T>[];
  data: T[];
  actions?: DataTableActions<T>;
  isLoading?: boolean;
  pageSize?: number;
  className?: string;
  emptyMessage?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<T extends { id: string }>({
  columns,
  data,
  actions,
  isLoading = false,
  pageSize = 15,
  className,
  emptyMessage = "No records found.",
}: DataTableProps<T>) {
  const [page, setPage] = React.useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageData = data.slice(start, start + pageSize);

  const hasActions =
    actions?.onEdit ||
    actions?.onDelete ||
    actions?.onTogglePublish ||
    actions?.extraActions?.length;

  if (isLoading) {
    return (
      <div className={cn("rounded-lg border border-border", className)}>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              {hasActions && <TableHead className="w-16" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <Skeleton className="h-4 w-full max-w-[160px]" />
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        className={cn(
          "flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted/20 text-center",
          className,
        )}
      >
        <p className="text-sm font-medium text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              {columns.map((col) => (
                <TableHead key={col.key} className={cn("text-xs font-semibold", col.className)}>
                  {col.label}
                </TableHead>
              ))}
              {hasActions && <TableHead className="w-12" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((row) => (
              <TableRow key={row.id} className="group">
                {columns.map((col) => (
                  <TableCell key={col.key} className={cn("text-sm", col.className)}>
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </TableCell>
                ))}
                {hasActions && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-3.5 w-3.5" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        {actions?.onEdit && (
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => actions.onEdit!(row)}
                          >
                            <Pencil className="mr-2 h-3.5 w-3.5" />
                            {actions.editLabel ?? "Edit"}
                          </DropdownMenuItem>
                        )}
                        {actions?.onTogglePublish && (
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => actions.onTogglePublish!(row)}
                          >
                            {actions.isPublished?.(row) ? (
                              <>
                                <EyeOff className="mr-2 h-3.5 w-3.5" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-3.5 w-3.5" />
                                Publish
                              </>
                            )}
                          </DropdownMenuItem>
                        )}
                        {actions?.extraActions?.map((extra, i) => {
                          const Icon = extra.icon;
                          return (
                            <DropdownMenuItem
                              key={i}
                              className={cn("cursor-pointer", extra.className)}
                              onClick={() => extra.onClick(row)}
                            >
                              {Icon && <Icon className="mr-2 h-3.5 w-3.5" />}
                              {extra.label}
                            </DropdownMenuItem>
                          );
                        })}
                        {actions?.onDelete && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer text-destructive focus:text-destructive"
                              onClick={() => actions.onDelete!(row)}
                            >
                              <Trash2 className="mr-2 h-3.5 w-3.5" />
                              {actions.deleteLabel ?? "Delete"}
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {start + 1}–{Math.min(start + pageSize, data.length)} of {data.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-1">
                    …
                  </span>
                ) : (
                  <Button
                    key={p}
                    variant={page === p ? "default" : "outline"}
                    size="icon"
                    className="h-7 w-7 text-xs"
                    onClick={() => setPage(p as number)}
                  >
                    {p}
                  </Button>
                ),
              )}
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
