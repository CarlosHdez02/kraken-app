"use client";

import {
  type ColumnDef,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  OnChangeFn,
} from "@tanstack/react-table";

type GenericTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number; // for server-side pagination (-1 or number)
  isLoading?: boolean;
};

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

  return (
    <div className="w-full overflow-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b p-2 font-medium"
                >
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
  );
}