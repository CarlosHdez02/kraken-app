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

const PAGE_SIZE_OPTIONS = [5,10, 20, 50];

type GenericTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number; // for server-side pagination (-1 or number)
  isLoading?: boolean;
};

function getVisiblePageNumbers(currentPage: number, totalPages: number): (number | "ellipsis")[] {
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

export function GenericTable<T>({
  data,
  columns,
  pagination,
  onPaginationChange,
  pageCount = -1,
  isLoading = false,
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

  return (
    <div className="w-full space-y-4">
      <div className="w-full overflow-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border-b p-2 font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filas por página</span>
            <select
              value={pageSize}
              onChange={(e) => {
                onPaginationChange?.((prev) => ({
                  ...prev,
                  pageSize: Number(e.target.value),
                  pageIndex: 0,
                }));
              }}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <Pagination className="justify-end">
            <PaginationContent className="gap-1">
              <PaginationItem>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  disabled={pageIndex <= 0}
                  onClick={() => {
                    if (pageIndex > 0) {
                      onPaginationChange?.((prev) => ({
                        ...prev,
                        pageIndex: prev.pageIndex - 1,
                      }));
                    }
                  }}
                >
                  <ChevronLeft className="size-4" />
                  <span className="sr-only">Anterior</span>
                </Button>
              </PaginationItem>
              {getVisiblePageNumbers(pageIndex + 1, totalPages).map((page, i) =>
                page === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <span className="flex size-9 items-center justify-center">…</span>
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <Button
                      variant={pageIndex + 1 === page ? "outline" : "ghost"}
                      size="icon"
                      className="size-9"
                      onClick={(e) => {
                        e.preventDefault();
                        onPaginationChange?.((prev) => ({
                          ...prev,
                          pageIndex: page - 1,
                        }));
                      }}
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
                  className="size-9"
                  disabled={pageIndex >= totalPages - 1}
                  onClick={() => {
                    if (pageIndex < totalPages - 1) {
                      onPaginationChange?.((prev) => ({
                        ...prev,
                        pageIndex: prev.pageIndex + 1,
                      }));
                    }
                  }}
                >
                  <ChevronRight className="size-4" />
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