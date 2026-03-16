import { paginationType } from "@/models/pagination/pagination.type";
import {
  PaginationInputType,
  buildPaginationMetaData,
  getPaginationOffset,
} from "./pagination.utils";

export type PaginatedQueryConfig<T> = {
  page: number;
  limit: number;
  maxLimit?: number;
  count: () => Promise<number>;
  findMany: (args: { skip: number; take: number }) => Promise<T[]>;
};
export type PaginatedResult<T> = {
  items: T[];
  pagination: paginationType;
};

export async function runPaginatedQuery<T>(
  config: PaginatedQueryConfig<T>,
): Promise<PaginatedResult<T>> {
  const { page, limit, maxLimit, count, findMany } = config;
  const input: PaginationInputType = { page, limit, maxLimit };
  const { skip, take } = getPaginationOffset(input);

  const [totalItems, items] = await Promise.all([
    count(),
    findMany({ skip, take }),
  ]);
  const pagination = buildPaginationMetaData(page, limit, totalItems, maxLimit);
  return {
    items,
    pagination,
  };
}
