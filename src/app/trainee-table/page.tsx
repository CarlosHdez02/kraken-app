import TraineeTable from "@/features/trainee-table/trainee-table.component";
import dynamic from "next/dynamic";



export default function TraineeTablePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-semibold">Trainees</h1>
      <TraineeTable />
    </div>
  );
}