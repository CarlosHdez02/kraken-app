import type { paginationType } from "@/models/pagination/pagination.type";

const DEFAULT_MAX_LIMIT = 100;
export type PaginationInputType = {
    page:number;
    limit:number;
    maxLimit?:number;
}

export function clampLimit(limit:number,max:number=DEFAULT_MAX_LIMIT):number{
    return Math.min(Math.max(1,limit),max);
}

export function getPaginationOffset(input:PaginationInputType):{skip:number;take:number}{
    const {page,limit,maxLimit} = input
    const take = clampLimit(limit,maxLimit);
    const skip = (Math.max(1,page)-1)*take;
    return {skip,take}
}
export function buildPaginationMetaData(page:number,limit:number,totalItems:number,maxLimit?:number):paginationType{
    const take = clampLimit(limit,maxLimit);
    const totalPages = Math.ceil(totalItems/take) ?? 1;
    return{
        page:Math.max(1,page),
        totalItems,
        totalPages
    }

}