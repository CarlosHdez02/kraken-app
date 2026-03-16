"use client";

import { useMemo } from "react";
import { useTrainee } from "@/hooks/useTrainee";
import { GenericTable } from "@/shared/ui/GenericTable.component";
import { getTraineeColumns } from "./trainee-columns";
import type { traineeType } from "@/models/trainee/trainee.type";

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