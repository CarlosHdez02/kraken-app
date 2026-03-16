// src/services/trainee/trainee.service.ts

import type { queryParamsType } from "@/models/query-params/query-params.type";
import type { PaginatedResult } from "@/models/action-response/action-response.type";
import { createErrorResponse } from "@/models/action-response/action-response.type";
import { ErrorCode } from "@/constants/error-codes";
import { PrismaClient } from "@/generated/prisma/client";
import { runPaginatedQuery } from "../../../lib/pagination";
import type { traineeType } from "@/models/trainee/trainee.type";

export default class TraineeService {
  constructor(private readonly prisma: PrismaClient) {}

  async getTrainees(queryParams: queryParamsType): Promise<PaginatedResult<traineeType>> {
    try {
      const { page, limit } = queryParams;
      const { items, pagination } = await runPaginatedQuery({
        page,
        limit,
        count: () => this.prisma.trainee.count(),
        findMany: ({ skip, take }) =>
          this.prisma.trainee.findMany({ skip, take }),
      });

      return {
        success: true,
        data: items,
        pagination,
        message: "Trainees fetched successfully",
      };
    } catch (err) {
      console.error("[TraineeService.getTrainees]", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch trainees";
      return createErrorResponse(errorMessage, { code: ErrorCode.DB_ERROR });
    }
  }
}