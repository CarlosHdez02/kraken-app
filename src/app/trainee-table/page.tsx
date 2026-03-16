"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import TraineeForm from "@/features/trainee-table/trainee-form.component";
import TraineeTable from "@/features/trainee-table/trainee-table.component";
import GenericModal from "@/shared/ui/GenericModal.component";
import { PlusIcon } from "lucide-react";
import { createTraineeAction } from "@/actions/Trainee.action";

export default function TraineeTablePage() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight text-primary">
        Alumnos
      </h1>
      <div className="mb-4 flex items-center justify-end">
        <GenericModal
          open={open}
          onOpenChange={setOpen}
          title="Agregar Alumno"
          trigger={
            <Button variant="default" className="cursor-pointer gap-2">
              <PlusIcon className="w-4 h-4" />
              Agregar Alumno
            </Button>
          }
        >
          <TraineeForm onAddTrainee={createTraineeAction} />
        </GenericModal>
      </div>

      <TraineeTable />
    </div>
  );
}
