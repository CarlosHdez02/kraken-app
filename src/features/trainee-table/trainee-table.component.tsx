"use client";

import { useMemo } from "react";
import { useTrainee } from "@/hooks/useTrainee";
import { GenericTable } from "@/shared/ui/GenericTable.component";
import { getTraineeColumns } from "./trainee-columns";
import type { traineeType } from "@/models/trainee/trainee.type";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TraineeTable() {
  const { data, pagination, pageCount, status, handlePaginationChange } = useTrainee();

  const columns = useMemo(
    () =>
      getTraineeColumns({
        onEdit: (trainee: traineeType) => {
          // TODO: open edit dialog or navigate to edit page
          console.log("Edit trainee", trainee.id);
        },
        onDelete: (trainee: traineeType) => {
          // TODO: confirm and call delete action
          console.log("Delete trainee", trainee.id);
        },
      }),
    []
  );

  return (
    <div className="w-full">
     <div className="flex items-center justify-end">
  <div className="relative w-full max-w-xs my-2">
    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    <Input
      type="text"
      placeholder="Buscar alumno"
      className="pl-9" // add left padding so text starts after the icon
    />
  </div>
</div>
  <GenericTable
      maxBodyHeight="calc(100vh - 250px)"
      data={data}
      columns={columns}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      pageCount={pageCount}
      isLoading={status === "loading"}
    />
    </div>
  
  );
}