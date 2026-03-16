"use client"
import { traineeType } from "@/models/trainee/trainee.type";
import React from "react";
import { PaginationState } from "@tanstack/react-table";
import { getTraineesAction } from "@/actions/Trainee.action";
export type status ="idle" | "loading" | "success" | "error";

const defaultPagination: PaginationState={
    pageIndex:0,
    pageSize:10,
}
export const useTrainee = ()=>{
    const [data,setData] = React.useState<traineeType[]>([]);
    const [pagination,setPagination] = React.useState<PaginationState>(defaultPagination);
    const [status,setStatus] = React.useState<status>("idle");
    const [pageCount,setPageCount] = React.useState(-1);

    React.useEffect(()=>{
        let cancelled = false;
        setStatus("loading");
        getTraineesAction({
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize,
            orderBy: "asc",
        })
        .then((response)=>{
            if(response.success){
                setData(response.data);
                setPageCount(response.pagination.totalPages);
            }else{
                throw new Error(response.errorMessage);
            }
        })
        .catch((err)=>{
            console.error("[useTrainee.handleGetTrainees]",err);
            setStatus("error");
        })
        .finally(()=>{
            if(!cancelled){
                setStatus("idle");
            }
        })
    },[pagination.pageIndex,pagination.pageSize])

    const handlePaginationChange = (updaterOrValue: PaginationState | ((prev: PaginationState) => PaginationState)) => {
        setPagination((prev) =>
          typeof updaterOrValue === "function" ? updaterOrValue(prev) : updaterOrValue
        );
      };
    return {data,pagination,pageCount,status,handlePaginationChange};
}