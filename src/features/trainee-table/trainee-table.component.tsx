
import { useTrainee } from "@/hooks/useTrainee";
import { GenericTable } from "@/shared/ui/GenericTable.component";
import { traineeColumns } from "./trainee-columns";

const TraineeTable = ()=>{
    const {data,pagination,pageCount,status,handlePaginationChange} = useTrainee();
      return(
        <>
        <GenericTable
        data={data}
        columns={traineeColumns}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        pageCount={pageCount}
        isLoading={status === "loading"}
        />
        </>
      )
}
export default TraineeTable