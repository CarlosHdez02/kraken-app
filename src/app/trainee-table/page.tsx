"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import TraineeForm from "@/features/trainee-table/trainee-form.component";
import TraineeTable from "@/features/trainee-table/trainee-table.component";
import GenericModal from "@/shared/ui/GenericModal.component";
import { PlusIcon } from "lucide-react";
import { createTraineeAction } from "@/actions/Trainee.action";
import TraineeCards from "@/features/trainee-table/trainee-cards/trainee-cards";

export default function TraineeTablePage() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="ml-3 mr-4 py-6 flex min-h-screen flex-col gap-4 overflow-hidden">
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-primary">
          Alumnos
        </h1>
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
      </header>

      {/* Main content locked to viewport: cards + internally scrollable table */}
      <main className="flex flex-1 flex-col gap-4 overflow-hidden">
        <TraineeCards />
        <div className="flex-1 overflow-hidden">
          <TraineeTable />
        </div>
      </main>
    </div>
  );
}
