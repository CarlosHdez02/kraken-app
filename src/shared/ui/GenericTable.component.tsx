"use client";

import {
  type ColumnDef,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  OnChangeFn,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

type GenericTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;
  isLoading?: boolean;
  /** Max height for the scrollable body. Defaults to "400px". */
  maxBodyHeight?: string;
};

function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [];
  if (currentPage <= 3) {
    pages.push(1, 2, 3, 4, "ellipsis", totalPages);
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(1, "ellipsis", currentPage, "ellipsis", totalPages);
  }
  return pages;
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 rounded-full bg-muted/60" style={{ width: `${60 + (i * 17) % 30}%` }} />
        </td>
      ))}
    </tr>
  );
}

export function GenericTable<T>({
  data,
  columns,
  pagination,
  onPaginationChange,
  pageCount = -1,
  isLoading = false,
  maxBodyHeight = "420px",
}: GenericTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: pageCount >= 0,
    pageCount: pageCount >= 0 ? pageCount : undefined,
    state: {
      ...(pagination && { pagination }),
    },
    onPaginationChange: onPaginationChange ?? (() => {}),
  });

  const totalPages = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const showPagination = pageCount >= 0 && totalPages > 0;
  const rows = table.getRowModel().rows;

  return (
    <div className="w-full space-y-3 font-sans">
      {/* ── Table shell ── */}
      <div
        className={cn(
          "relative w-full overflow-hidden",
          "rounded-2xl border border-border/60",
          "bg-card shadow-sm",
          "ring-1 ring-inset ring-white/5"
        )}
      >
        {/* Shimmer line at the very top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/*
          Single-table approach — the only reliable way to keep columns aligned.
          One div handles BOTH overflow-x and overflow-y. `thead th` gets
          `sticky top-0` so it pins inside this same scrollport: horizontal
          scroll moves everything together, vertical scroll leaves the header fixed.
        */}
        <div
          className="overflow-x-auto overflow-y-auto"
          style={{ maxHeight: maxBodyHeight }}
        >
          <table className="w-full min-w-max border-collapse text-left text-sm">
            {/* ── Sticky header ── */}
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        "sticky top-0 z-10",
                        "whitespace-nowrap px-4 py-3",
                        "text-[11px] font-semibold uppercase tracking-widest",
                        "text-muted-foreground/70",
                        "bg-card/95 backdrop-blur-sm",
                        // separator rendered via box-shadow — travels with the sticky cell
                        "shadow-[0_1px_0_0_hsl(var(--border)/0.5)]"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* ── Body ── */}
            <tbody className="divide-y divide-border/30">
              {isLoading ? (
                Array.from({ length: pageSize ?? 5 }).map((_, i) => (
                  <SkeletonRow key={i} cols={columns.length} />
                ))
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-sm text-muted-foreground/50"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl opacity-20">◌</span>
                      <span>Sin resultados</span>
                    </div>
                  </td>
                </tr>
              ) : (
                rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={cn(
                      "group relative transition-colors duration-150",
                      "hover:bg-primary/[0.04]",
                      idx % 2 === 0 ? "bg-transparent" : "bg-muted/[0.02]"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 align-middle text-sm text-foreground/80 tabular-nums"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                    {/* row hover left-accent */}
                    <td
                      aria-hidden
                      className="pointer-events-none absolute inset-y-0 left-0 w-0.5 scale-y-0 bg-primary transition-transform duration-150 group-hover:scale-y-100"
                    />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ── */}
      {showPagination && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          {/* rows-per-page + record count */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground/60">
              Filas por página
            </span>
            <select
              value={pageSize}
              onChange={(e) =>
                onPaginationChange?.((prev) => ({
                  ...prev,
                  pageSize: Number(e.target.value),
                  pageIndex: 0,
                }))
              }
              className={cn(
                "h-8 rounded-lg border border-border/60 bg-muted/30",
                "px-2 py-0 text-xs text-foreground",
                "focus:outline-none focus:ring-1 focus:ring-primary/50",
                "transition-colors hover:bg-muted/60"
              )}
            >
              {PAGE_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <span className="hidden text-xs tabular-nums text-muted-foreground/50 sm:block">
              Página{" "}
              <span className="font-medium text-foreground/70">{pageIndex + 1}</span>{" "}
              de{" "}
              <span className="font-medium text-foreground/70">{totalPages}</span>
            </span>
          </div>

          {/* page buttons */}
          <Pagination className="m-0 w-auto">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "size-8 rounded-lg border border-border/40 text-muted-foreground",
                    "hover:border-primary/40 hover:text-primary",
                    "disabled:opacity-30"
                  )}
                  disabled={pageIndex <= 0}
                  onClick={() =>
                    pageIndex > 0 &&
                    onPaginationChange?.((p) => ({ ...p, pageIndex: p.pageIndex - 1 }))
                  }
                >
                  <ChevronLeft className="size-3.5" />
                  <span className="sr-only">Anterior</span>
                </Button>
              </PaginationItem>

              {getVisiblePageNumbers(pageIndex + 1, totalPages).map((page, i) =>
                page === "ellipsis" ? (
                  <PaginationItem key={`ell-${i}`}>
                    <span className="flex size-8 items-center justify-center text-xs text-muted-foreground/40">
                      ···
                    </span>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <Button
                      variant={pageIndex + 1 === page ? "default" : "ghost"}
                      size="icon"
                      className={cn(
                        "size-8 rounded-lg text-xs tabular-nums",
                        pageIndex + 1 === page
                          ? "shadow-sm"
                          : "border border-transparent text-muted-foreground hover:border-border/40 hover:text-foreground"
                      )}
                      onClick={() =>
                        onPaginationChange?.((p) => ({ ...p, pageIndex: (page as number) - 1 }))
                      }
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "size-8 rounded-lg border border-border/40 text-muted-foreground",
                    "hover:border-primary/40 hover:text-primary",
                    "disabled:opacity-30"
                  )}
                  disabled={pageIndex >= totalPages - 1}
                  onClick={() =>
                    pageIndex < totalPages - 1 &&
                    onPaginationChange?.((p) => ({ ...p, pageIndex: p.pageIndex + 1 }))
                  }
                >
                  <ChevronRight className="size-3.5" />
                  <span className="sr-only">Siguiente</span>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}