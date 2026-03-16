import { Button } from "@/components/ui/button";
import TraineeTable from "@/features/trainee-table/trainee-table.component";
import { PlusIcon } from "lucide-react";

export default function TraineeTablePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-semibold">Alumnos</h1>
      <div className="flex items-center justify-end mb-4" 
      >
        <Button variant="outline" className="cursor-pointer">
          <PlusIcon className="w-4 h-4" />
          Agregar Alumno
        </Button>
      </div>
      <TraineeTable />
    </div>
  );
}