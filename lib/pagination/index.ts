// src/lib/pagination/index.ts

export {
    getPaginationOffset,
    buildPaginationMetaData,
    clampLimit,
    type PaginationInputType,
  } from "./pagination.utils";
  
  export {
    runPaginatedQuery,
    type PaginatedQueryConfig,
    type PaginatedResult,
  } from "./run-paginated-query";